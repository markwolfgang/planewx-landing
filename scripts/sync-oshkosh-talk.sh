#!/usr/bin/env bash
# Sync the Oshkosh talk deck into planewx-landing/public/talk for deploy.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
SRC="$ROOT/eaa-ads/oshkosh-talk-slides.html"
DEST_DIR="$ROOT/planewx-landing/public/talk"
DEST="$DEST_DIR/index.html"
QR_SRC="$ROOT/eaa-ads/osh-signup-qr.png"

mkdir -p "$DEST_DIR/screenshots"
cp "$QR_SRC" "$DEST_DIR/osh-signup-qr.png"

# Talk-specific briefing screenshots (inbound story / What's New full-bleeds)
SHOT_SRC="$ROOT/eaa-ads/talk-screenshots"
if [[ -d "$SHOT_SRC" ]]; then
  cp "$SHOT_SRC"/0*.png "$DEST_DIR/screenshots/" 2>/dev/null || true
  cp "$SHOT_SRC"/1*.png "$DEST_DIR/screenshots/" 2>/dev/null || true
  cp "$SHOT_SRC"/1*.jpg "$DEST_DIR/screenshots/" 2>/dev/null || true
  cp "$SHOT_SRC"/mark-aircraft.* "$DEST_DIR/screenshots/" 2>/dev/null || true
  cp "$SHOT_SRC"/thanksgiving-2024.* "$DEST_DIR/screenshots/" 2>/dev/null || true
fi

# Rewrite asset paths for site hosting at /talk/
sed \
  -e 's|\.\./planewx-landing/public/brand/|/brand/|g' \
  -e 's|\.\./planewx-landing/public/screenshots/|/screenshots/|g' \
  -e 's|src="talk-screenshots/|src="/talk/screenshots/|g' \
  -e 's|src="osh-signup-qr.png"|src="/talk/osh-signup-qr.png"|g' \
  "$SRC" > "$DEST"

echo "Synced → $DEST"
echo "Remote → $DEST_DIR/remote.html"
echo "Open locally after landing dev server: http://localhost:3000/talk/"
