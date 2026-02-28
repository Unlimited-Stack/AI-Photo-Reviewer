#!/usr/bin/env sh
set -eu

# Kill common dev processes to avoid orphaned watchers
pkill -f "expo|next|turbo|node .*next|node .*expo" 2>/dev/null || true

# Free specific ports (3000 for Web, 8080 for Native Web/Metro)
for PORT in 3000 8080; do
  if command -v lsof >/dev/null 2>&1; then
    PIDS=$(lsof -ti :$PORT -sTCP:LISTEN 2>/dev/null || true)
    if [ -n "${PIDS:-}" ]; then
      echo "Killing processes on port $PORT: $PIDS"
      kill -9 $PIDS 2>/dev/null || true
    fi
  else
    # Fallback: try busybox fuser/netstat if available
    if command -v fuser >/dev/null 2>&1; then
      fuser -k ${PORT}/tcp 2>/dev/null || true
    fi
  fi
done

echo "Port cleanup complete for 3000 and 8080."
