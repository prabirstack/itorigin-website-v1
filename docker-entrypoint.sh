#!/bin/sh

echo "Running database migrations..."
cd /app && ./node_modules/.bin/drizzle-kit migrate || echo "Warning: migrations failed, continuing anyway..."
echo "Migrations step complete."

echo "Starting application..."
exec bun server.js
