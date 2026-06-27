#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
ENV_FILE="${1:-$ROOT_DIR/.env.local}"
ENVIRONMENTS=(production preview development)

if [[ ! -f "$ENV_FILE" ]]; then
  echo "Env file not found: $ENV_FILE"
  exit 1
fi

if ! command -v vercel >/dev/null 2>&1; then
  echo "Vercel CLI is not installed. Run: npm i -g vercel"
  exit 1
fi

cd "$ROOT_DIR"

echo "Syncing env vars from $ENV_FILE to Vercel..."
echo "Project must already be linked (run 'vercel link' once if needed)."
echo

while IFS= read -r line || [[ -n "$line" ]]; do
  line="${line%%#*}"
  line="$(echo "$line" | xargs)"

  [[ -z "$line" ]] && continue
  [[ "$line" != *"="* ]] && continue

  key="${line%%=*}"
  value="${line#*=}"

  key="$(echo "$key" | xargs)"
  value="$(echo "$value" | xargs)"

  [[ -z "$key" || -z "$value" ]] && continue

  for env in "${ENVIRONMENTS[@]}"; do
    if vercel env ls "$env" 2>/dev/null | rg -q "^ ${key} "; then
      echo "Updating $key ($env)..."
      vercel env rm "$key" "$env" --yes >/dev/null 2>&1 || true
    else
      echo "Adding $key ($env)..."
    fi

    printf '%s' "$value" | vercel env add "$key" "$env" >/dev/null
  done
done < "$ENV_FILE"

echo
echo "Done. Verify with: vercel env ls"
