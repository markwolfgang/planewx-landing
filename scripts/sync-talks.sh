#!/usr/bin/env bash
# Sync talk decks into planewx-landing/public/talks for deploy.
#
# Usage:
#   ./scripts/sync-talks.sh           # sync eaa983 (current source deck)
#   ./scripts/sync-talks.sh eaa983
#   ./scripts/sync-talks.sh all       # eaa983 only from source; osh is archived separately
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
TALKS="$ROOT/planewx-landing/public/talks"
SRC="$ROOT/eaa-ads/oshkosh-talk-slides.html"
SHOT_SRC="$ROOT/eaa-ads/talk-screenshots"
TARGET="${1:-eaa983}"

mkdir -p "$TALKS/screenshots" "$TALKS/eaa983" "$TALKS/osh"

if [[ -d "$SHOT_SRC" ]]; then
  cp "$SHOT_SRC"/*.png "$TALKS/screenshots/" 2>/dev/null || true
  cp "$SHOT_SRC"/*.jpg "$TALKS/screenshots/" 2>/dev/null || true
fi

[[ -f "$ROOT/eaa-ads/eaa983-signup-qr.png" ]] && cp "$ROOT/eaa-ads/eaa983-signup-qr.png" "$TALKS/"
[[ -f "$ROOT/eaa-ads/osh-signup-qr.png" ]] && cp "$ROOT/eaa-ads/osh-signup-qr.png" "$TALKS/"
[[ -f "$ROOT/planewx-landing/public/talk/remote.html" ]] && cp "$ROOT/planewx-landing/public/talk/remote.html" "$TALKS/remote.html"

sync_eaa983() {
  python3 - "$SRC" "$TALKS/eaa983/index.html" <<'PY'
import sys
from pathlib import Path
src, dest = Path(sys.argv[1]), Path(sys.argv[2])
text = src.read_text()
text = text.replace('../planewx-landing/public/brand/', '/brand/')
text = text.replace('../planewx-landing/public/screenshots/', '/screenshots/')
text = text.replace('src="talk-screenshots/', 'src="/talks/screenshots/')
text = text.replace('src="eaa983-signup-qr.png"', 'src="/talks/eaa983-signup-qr.png"')
text = text.replace('src="osh-signup-qr.png"', 'src="/talks/osh-signup-qr.png"')
text = text.replace('/talk/remote.html', '/talks/remote.html')
old = "location.pathname.startsWith('/talk')"
new = "location.pathname.startsWith('/talks') || location.pathname.startsWith('/talk')"
text = text.replace(old, new)
dest.write_text(text)
print(f"Synced → {dest}")
PY
}

case "$TARGET" in
  eaa983|all)
    sync_eaa983
    ;;
  *)
    echo "Unknown target: $TARGET (use eaa983|all)" >&2
    exit 1
    ;;
esac

echo "Index  → $TALKS/index.html"
echo "Open   → http://localhost:3000/talks/"
echo "Deck   → http://localhost:3000/talks/eaa983/"
