#!/usr/bin/env bash
# ============================================================
#  dev.sh — hands-off local preview
#  ------------------------------------------------------------
#  Run this ONCE:   bash dev.sh
#  Then leave it running. It will:
#    1. auto-pull new commits every few seconds
#    2. serve the site with live-reload when Node is available
#       (browser refreshes itself on change); otherwise a plain
#       server (you refresh with Cmd+Shift+R).
#  Stop it any time with Ctrl + C.
# ============================================================
cd "$(dirname "$0")" || exit 1

PORT="${1:-8000}"

# --- background: keep the local copy in sync with GitHub ---
(
  while true; do
    git pull --quiet 2>/dev/null || true
    sleep 3
  done
) &
PULL_PID=$!
trap 'kill "$PULL_PID" 2>/dev/null' EXIT INT TERM

echo ""
echo "  ▶  Auto-pulling new commits every 3s (background)"
echo "  ▶  Serving http://localhost:$PORT"
echo "     Leave this window open. Press Ctrl+C to stop."
echo ""

# --- foreground: prefer live-reload, but never die if it fails ---
if command -v npx >/dev/null 2>&1; then
  echo "  ▶  Trying live-reload (auto browser refresh)…"
  npx --yes live-server --port="$PORT" --wait=250
  echo ""
  echo "  ⚠  live-reload server exited — falling back to a plain server."
fi

echo "  ▶  Plain server on http://localhost:$PORT (refresh with Cmd+Shift+R)"
python3 -m http.server "$PORT"
