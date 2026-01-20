#!/bin/bash
# Start both Next.js chat app and AntClock intelligence service

set -e

echo "🚀 Starting Chat Application with AntClock Intelligence Boost"
echo ""

# Check if PostgreSQL is running
if ! pg_isready -q; then
    echo "⚠️  PostgreSQL is not running. Starting PostgreSQL..."
    sudo service postgresql start
    sleep 2
fi

# Check Python dependencies
echo "📦 Checking Python dependencies..."
pip3 list | grep -q flask || pip3 install flask flask-cors numpy

# Start AntClock service in background
echo "🧠 Starting AntClock Intelligence Service on port 5000..."
cd antclock-service
python3 api.py &
ANTCLOCK_PID=$!
cd ..

# Wait for AntClock service to start
sleep 3

# Check if AntClock service is running
if curl -s http://localhost:5000/health > /dev/null; then
    echo "✅ AntClock Intelligence Service is running (PID: $ANTCLOCK_PID)"
else
    echo "❌ Failed to start AntClock service"
    kill $ANTCLOCK_PID 2>/dev/null || true
    exit 1
fi

# Start Next.js development server
echo ""
echo "🌐 Starting Next.js Chat Application on port 3000..."
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✨ Chat with AntClock Intelligence Boost"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "  Chat App:     http://localhost:3000"
echo "  AntClock API: http://localhost:5000"
echo ""
echo "  Framework: CE1 → CE2 → CE3"
echo ""
echo "  Press Ctrl+C to stop both services"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Cleanup function
cleanup() {
    echo ""
    echo "🛑 Stopping services..."
    kill $ANTCLOCK_PID 2>/dev/null || true
    exit 0
}

trap cleanup EXIT INT TERM

# Start Next.js
pnpm dev
