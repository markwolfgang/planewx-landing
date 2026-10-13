/**
 * PlaneWX connector demo videos shown on /mcp. Mirrors the app repo's
 * lib/mcp/demo-videos.ts. All three return 200 from YouTube oEmbed (public).
 * Embedded with the privacy-enhanced youtube-nocookie.com player.
 */
export interface McpDemoVideo {
  id: string
  title: string
}

export const MCP_CLAUDE_DEMO_VIDEOS: readonly McpDemoVideo[] = [
  { id: "ceqc-hAsQtE", title: "Ask Claude 'Can I Fly Tomorrow?' - PlaneWX's New MCP" },
  {
    id: "N2HkQ1ubu0I",
    title:
      "Claude Cross-Checked My PlaneWX Briefing Against ForeFlight - Here's What It Caught",
  },
]

export const MCP_CHATGPT_DEMO_VIDEO: McpDemoVideo = {
  id: "xqgcr0vAAVs",
  title: "PlaneWX in ChatGPT: Your Flight Weather, Scored Against Your Minimums",
}

export function mcpDemoEmbedUrl(id: string): string {
  return `https://www.youtube-nocookie.com/embed/${id}?rel=0`
}
