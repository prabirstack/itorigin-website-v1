#!/bin/sh
set -e

echo "Running database migrations..."
cd /app && ./node_modules/.bin/drizzle-kit migrate
echo "Migrations complete."

echo "Starting application..."
exec bun server.js
