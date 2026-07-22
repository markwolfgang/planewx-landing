import { NextResponse } from "next/server"
import { getOshSupabase } from "@/lib/osh-admin"
import { randomBytes } from "crypto"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

const ROOM_RE = /^[A-Z0-9]{4,8}$/
const TOKEN_RE = /^[a-zA-Z0-9_-]{8,64}$/

function allowedOrigin(origin: string): string {
  if (!origin) return "https://www.planewx.ai"
  try {
    const host = new URL(origin).hostname
    if (
      host === "localhost" ||
      host === "127.0.0.1" ||
      host === "planewx.ai" ||
      host === "www.planewx.ai" ||
      host.endsWith(".vercel.app")
    ) {
      return origin
    }
  } catch {
    /* ignore */
  }
  return "https://www.planewx.ai"
}

function corsHeaders(request: Request): HeadersInit {
  return {
    "Access-Control-Allow-Origin": allowedOrigin(request.headers.get("origin") || ""),
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Cache-Control": "no-store",
  }
}

function json(request: Request, body: unknown, status = 200) {
  return NextResponse.json(body, { status, headers: corsHeaders(request) })
}

function makeRoomCode(): string {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"
  const bytes = randomBytes(6)
  let out = ""
  for (let i = 0; i < 6; i++) out += alphabet[bytes[i]! % alphabet.length]
  return out
}

function makeToken(): string {
  return randomBytes(18).toString("base64url")
}

export async function OPTIONS(request: Request) {
  return new NextResponse(null, { status: 204, headers: corsHeaders(request) })
}

/** GET ?room=XXXX — public read of current slide (phone + display poll) */
export async function GET(request: Request) {
  try {
    const supabase = getOshSupabase()
    if (!supabase) return json(request, { error: "Server configuration error" }, 500)

    const { searchParams } = new URL(request.url)
    const room = (searchParams.get("room") || "").trim().toUpperCase()
    if (!ROOM_RE.test(room)) return json(request, { error: "Invalid room" }, 400)

    const { data, error } = await supabase
      .from("talk_remote_sessions")
      .select("room_code, slide_index, slide_count, section_label, notes, updated_at")
      .eq("room_code", room)
      .maybeSingle()

    if (error) return json(request, { error: error.message }, 500)
    if (!data) return json(request, { error: "Room not found" }, 404)

    return json(request, {
      room: data.room_code,
      slideIndex: data.slide_index,
      slideCount: data.slide_count,
      sectionLabel: data.section_label || "",
      notes: data.notes || "",
      updatedAt: data.updated_at,
    })
  } catch (e) {
    return json(request, { error: e instanceof Error ? e.message : "Unknown error" }, 500)
  }
}

/**
 * POST actions:
 * - create: { action: "create", slideCount }
 * - set:    { action: "set", room, token, slideIndex, slideCount?, sectionLabel?, notes? }
 * - step:   { action: "next" | "prev", room, token }
 */
export async function POST(request: Request) {
  try {
    const supabase = getOshSupabase()
    if (!supabase) return json(request, { error: "Server configuration error" }, 500)

    const body = await request.json()
    const action = typeof body.action === "string" ? body.action : ""

    if (action === "create") {
      const slideCount = Math.max(1, Math.min(200, Number(body.slideCount) || 1))

      // Drop stale rooms (talk sessions are ephemeral) and cap active set
      const cutoff = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
      await supabase.from("talk_remote_sessions").delete().lt("updated_at", cutoff)

      const { count } = await supabase
        .from("talk_remote_sessions")
        .select("*", { count: "exact", head: true })
      if ((count ?? 0) >= 40) {
        return json(request, { error: "Too many active remote sessions" }, 429)
      }

      let room = makeRoomCode()
      const token = makeToken()

      for (let attempt = 0; attempt < 5; attempt++) {
        const { error } = await supabase.from("talk_remote_sessions").insert({
          room_code: room,
          control_token: token,
          slide_index: 0,
          slide_count: slideCount,
          section_label: "",
          notes: "",
          updated_at: new Date().toISOString(),
        })
        if (!error) {
          return json(request, { room, token, slideIndex: 0, slideCount })
        }
        // collision — retry
        room = makeRoomCode()
      }
      return json(request, { error: "Could not create room" }, 500)
    }

    const room = String(body.room || "")
      .trim()
      .toUpperCase()
    const token = String(body.token || "").trim()
    if (!ROOM_RE.test(room) || !TOKEN_RE.test(token)) {
      return json(request, { error: "Invalid room or token" }, 400)
    }

    const { data: session, error: loadErr } = await supabase
      .from("talk_remote_sessions")
      .select("room_code, control_token, slide_index, slide_count")
      .eq("room_code", room)
      .maybeSingle()

    if (loadErr) return json(request, { error: loadErr.message }, 500)
    if (!session) return json(request, { error: "Room not found" }, 404)
    if (session.control_token !== token) return json(request, { error: "Unauthorized" }, 401)

    let nextIndex = session.slide_index
    const slideCount = Math.max(
      1,
      Number(body.slideCount) > 0 ? Number(body.slideCount) : session.slide_count,
    )

    if (action === "next") {
      nextIndex = Math.min(slideCount - 1, session.slide_index + 1)
    } else if (action === "prev") {
      nextIndex = Math.max(0, session.slide_index - 1)
    } else if (action === "set") {
      nextIndex = Math.max(0, Math.min(slideCount - 1, Number(body.slideIndex) || 0))
    } else {
      return json(request, { error: "Unknown action" }, 400)
    }

    const patch: Record<string, unknown> = {
      slide_index: nextIndex,
      slide_count: slideCount,
      updated_at: new Date().toISOString(),
    }
    if (typeof body.sectionLabel === "string") {
      patch.section_label = body.sectionLabel.slice(0, 120)
    }
    if (typeof body.notes === "string") {
      patch.notes = body.notes.slice(0, 4000)
    }

    const { error: updErr } = await supabase
      .from("talk_remote_sessions")
      .update(patch)
      .eq("room_code", room)
      .eq("control_token", token)

    if (updErr) return json(request, { error: updErr.message }, 500)

    return json(request, {
      room,
      slideIndex: nextIndex,
      slideCount,
      updatedAt: patch.updated_at,
    })
  } catch (e) {
    return json(request, { error: e instanceof Error ? e.message : "Unknown error" }, 500)
  }
}
