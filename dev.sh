#!/usr/bin/env bash
# ============================================================
#  dev.sh — hands-off local preview
#  ------------------------------------------------------------
#  Run this ONCE:   bash dev.sh
#  Then leave it running. It will:
#    1. auto-pull new commits every few seconds
#    2. serve the site with live-reload (browser refreshes itself
#       the moment any file changes)
#  Stop it any time with Ctrl + C.
# ============================================================
set -e
cd "$(dirname "$0")"

PORT="${1:-8000}"

# --- background: keep the local copy in sync with GitHub ---
(
  while true; do
    git pull --quiet 2>/dev/null || true
    sleep 3
  done
) &
PULL_PID=$!
trap 'kill "$PULL_PID" 2>/dev/null' EXIT

echo ""
echo "  ▶  Auto-pulling new commits every 3s (background)"
echo "  ▶  Starting live-reload server on http://localhost:$PORT"
echo "     Leave this window open. Press Ctrl+C to stop."
echo ""

# --- foreground: live-reloading server (auto-refreshes browser) ---
if command -v node >/dev/null 2>&1; then
  # live-server watches every file and reloads the browser on change
  exec npx --yes live-server --port="$PORT" --wait=250
else
  echo "  ⚠  Node.js not found — falling back to a plain server."
  echo "     Pages will still auto-pull, but you'll need to refresh"
  echo "     the browser yourself (Cmd+Shift+R). To get auto-refresh,"
  echo "     install Node from https://nodejs.org and re-run this."
  echo ""
  exec python3 -m http.server "$PORT"
fi
