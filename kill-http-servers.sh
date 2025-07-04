#!/bin/bash

# Script to kill any running Python HTTP servers

echo "Looking for running Python HTTP servers..."

# Find processes running Python HTTP servers
if command -v pgrep >/dev/null 2>&1; then
  # If pgrep is available
  PIDS=$(pgrep -f "python.*http.server")
elif command -v ps >/dev/null 2>&1; then
  # Fallback to ps
  PIDS=$(ps aux | grep "python.*http.server" | grep -v grep | awk '{print $2}')
else
  echo "Error: Could not find pgrep or ps command."
  exit 1
fi

# Kill the processes
if [ -z "$PIDS" ]; then
  echo "No Python HTTP servers found."
else
  echo "Found Python HTTP servers with PIDs: $PIDS"
  echo "Killing processes..."
  
  for PID in $PIDS; do
    if kill -9 $PID 2>/dev/null; then
      echo "Killed process $PID"
    else
      echo "Failed to kill process $PID"
    fi
  done
  
  echo "All Python HTTP servers have been terminated."
fi

echo "You can now run ./test-versions-locally.sh again."