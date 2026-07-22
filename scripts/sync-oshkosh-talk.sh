#!/usr/bin/env bash
# Sync the Oshkosh talk deck into planewx-landing/public/talk for deploy.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
SRC="$ROOT/eaa-ads/oshkosh-talk-slides.html"
DEST_DIR="$ROOT/planewx-landing/public/talk"
DEST="$DEST_DIR/index.html"
QR_SRC="$ROOT/eaa-ads/osh-signup-qr.png"

mkdir -p "$DEST_DIR"
cp "$QR_SRC" "$DEST_DIR/osh-signup-qr.png"

# Rewrite asset paths for site hosting at /talk/
sed \
  -e 's|\.\./planewx-landing/public/brand/|/brand/|g' \
  -e 's|\.\./planewx-landing/public/screenshots/|/screenshots/|g' \
  -e 's|src="osh-signup-qr.png"|src="/talk/osh-signup-qr.png"|g' \
  "$SRC" > "$DEST"

echo "Synced → $DEST"
echo "Remote → $DEST_DIR/remote.html"
echo "Open locally after landing dev server: http://localhost:3000/talk/"
