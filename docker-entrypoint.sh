#!/bin/sh
set -e

echo "Running database migrations..."
cd /app && bun run db:migrate
echo "Migrations complete."

echo "Starting application..."
exec bun server.js
