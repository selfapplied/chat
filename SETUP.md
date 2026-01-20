# Chat Website Setup with AntClock Intelligence Boost

This document provides a complete guide to setting up and running the chat website with AntClock intelligence integration.

## Prerequisites

- Node.js 18+ and pnpm
- Python 3.7+
- PostgreSQL
- Git

## Quick Start

### Option 1: Automated Setup (Recommended)

```bash
# Clone the repository
git clone https://github.com/selfapplied/chat.git
cd chat

# Install dependencies
pnpm install

# Setup database
sudo service postgresql start
sudo -u postgres psql -c "CREATE DATABASE chatdb;"
sudo -u postgres psql -c "CREATE USER chatuser WITH PASSWORD 'chatpass';"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE chatdb TO chatuser;"

# Run migrations
pnpm db:migrate

# Start both services with one command
./start-with-antclock.sh
```

The application will be available at:
- **Chat Interface**: http://localhost:3000
- **AntClock API**: http://localhost:5000

### Option 2: Manual Setup

#### 1. Install Node.js Dependencies

```bash
pnpm install
```

#### 2. Setup Environment Variables

Create `.env.local` file:

```bash
# Generate a random secret
AUTH_SECRET=$(openssl rand -base64 32)

# Database URL
POSTGRES_URL=postgresql://chatuser:chatpass@localhost:5432/chatdb
```

#### 3. Setup PostgreSQL Database

```bash
# Start PostgreSQL
sudo service postgresql start

# Create database and user
sudo -u postgres psql -c "CREATE DATABASE chatdb;"
sudo -u postgres psql -c "CREATE USER chatuser WITH PASSWORD 'chatpass';"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE chatdb TO chatuser;"
sudo -u postgres psql -d chatdb -c "GRANT ALL ON SCHEMA public TO chatuser;"
```

#### 4. Run Database Migrations

```bash
pnpm db:migrate
```

#### 5. Install Python Dependencies

```bash
pip3 install flask flask-cors numpy
```

#### 6. Start AntClock Service

```bash
cd antclock-service
python3 api.py &
cd ..
```

#### 7. Start Next.js Application

```bash
pnpm dev
```

## What You'll See

### Chat Interface
The main chat interface at http://localhost:3000 features:
- Clean, modern UI with Next.js 16 and React 19
- AI-powered chat using Grok Vision model
- Message history and chat management
- File upload support
- Responsive design

### AntClock Intelligence Boost Badge
In the bottom-right corner, you'll see the **AntClock Intelligence Boost** badge with:
- Animated pulse indicator showing service is active
- Display of the CE1→CE2→CE3 framework
- Gradient background (blue to purple)

## Testing AntClock Integration

### 1. Check Service Health

```bash
curl http://localhost:5000/health
```

Expected response:
```json
{
  "status": "healthy",
  "service": "AntClock Intelligence API",
  "framework": "CE1→CE2→CE3"
}
```

### 2. Test Intelligence Boost

```bash
curl -X POST http://localhost:5000/boost \
  -H "Content-Type: application/json" \
  -d '{"text": "Test message for coherence analysis"}'
```

Expected response includes:
- `coherence_score`: Overall coherence metric (0.0-1.0)
- `ce1_discrete`: Character diversity, symmetry, mirror phase
- `ce2_flow`: Word flow entropy and curvature
- `ce3_emergent`: Simplicial complexity and Riemann alignment
- `suggestions`: Improvement recommendations

### 3. Get Framework Metrics

```bash
curl http://localhost:5000/metrics
```

Returns AntClock framework parameters and layer descriptions.

## Understanding AntClock

### The CE Framework

AntClock implements a three-layer Coherence Engine:

#### CE1 - Discrete Grammar
- Analyzes combinatorial structures
- Computes digit symmetries
- Calculates mirror-phase positions (mod 4)
- Measures character diversity

#### CE2 - Dynamical Flow
- Measures word flow entropy
- Computes curvature indices
- Analyzes continuous dynamics from discrete structures
- Tracks average word lengths and variations

#### CE3 - Emergent Simplicial
- Extracts topological patterns
- Computes simplicial complexity
- Measures emergence levels
- Calculates Riemann alignment

### Key Concepts

- **φ(10) = 4**: Euler's totient function of 10, fundamental to the discrete structure
- **Gamma Gap**: Based on Euler-Mascheroni constant (≈0.577)
- **Mirror-Phase Shells**: Positions where symmetry breaks (n mod 4)
- **Coherence Score**: Combined metric from all three CE layers

## Architecture

```
┌─────────────────────────────────────────┐
│     Next.js Chat Application            │
│     (localhost:3000)                    │
│  ┌──────────────────────────────────┐  │
│  │  Chat Interface                  │  │
│  │  - Messages                      │  │
│  │  - AI Models                     │  │
│  │  - File Upload                   │  │
│  └──────────────────────────────────┘  │
│               │                         │
│               ▼                         │
│  ┌──────────────────────────────────┐  │
│  │  API Route: /api/antclock        │  │
│  │  - Proxies to Python service     │  │
│  └──────────────────────────────────┘  │
│               │                         │
│               ▼                         │
│  ┌──────────────────────────────────┐  │
│  │  AntClock Badge Component        │  │
│  │  - Shows service status          │  │
│  │  - CE1→CE2→CE3 indicator         │  │
│  └──────────────────────────────────┘  │
└─────────────────┬───────────────────────┘
                  │
                  ▼ HTTP
┌─────────────────────────────────────────┐
│  AntClock Intelligence Service          │
│  (Python/Flask - localhost:5000)        │
│  ┌──────────────────────────────────┐  │
│  │  Flask API                       │  │
│  │  - /health                       │  │
│  │  - /boost (POST)                 │  │
│  │  - /metrics                      │  │
│  └──────────────────────────────────┘  │
│               │                         │
│               ▼                         │
│  ┌──────────────────────────────────┐  │
│  │  AntClock Engine                 │  │
│  │  - CE1 Analysis                  │  │
│  │  - CE2 Flow Computation          │  │
│  │  - CE3 Emergence Detection       │  │
│  └──────────────────────────────────┘  │
└─────────────────────────────────────────┘
```

## Configuration

### Environment Variables

#### Next.js (.env.local)
- `AUTH_SECRET` - Authentication secret (required)
- `POSTGRES_URL` - Database connection string (required)
- `NEXT_PUBLIC_ANTCLOCK_API_URL` - AntClock service URL (optional, defaults to http://localhost:5000)
- `AI_GATEWAY_API_KEY` - AI Gateway API key (optional for development)
- `BLOB_READ_WRITE_TOKEN` - Blob storage token (optional)
- `REDIS_URL` - Redis connection string (optional)

#### Python Service
- `FLASK_DEBUG` - Enable Flask debug mode (default: false)
- `ANTCLOCK_API_URL` - Override API URL (default: http://localhost:5000)

## Troubleshooting

### PostgreSQL Issues

**Database connection failed:**
```bash
# Check if PostgreSQL is running
sudo service postgresql status

# Start if needed
sudo service postgresql start

# Verify connection
psql -U chatuser -d chatdb -h localhost
```

### Port Already in Use

**Port 3000 or 5000 busy:**
```bash
# Find process using port
lsof -i :3000
lsof -i :5000

# Kill process
kill -9 <PID>
```

### AntClock Service Not Responding

**Badge doesn't appear:**
1. Check if Python service is running: `curl http://localhost:5000/health`
2. Check Python dependencies: `pip3 list | grep flask`
3. Check logs in terminal where `api.py` is running
4. Verify CORS is enabled in Flask

### Next.js Build Issues

**Module not found or build errors:**
```bash
# Clean and reinstall
rm -rf node_modules .next
pnpm install
pnpm dev
```

## Development

### Adding New AntClock Features

1. Edit `antclock-service/antclock_engine.py` to add new analysis methods
2. Expose via API in `antclock-service/api.py`
3. Call from Next.js via `/api/antclock` route
4. Update UI components as needed

### Running Tests

```bash
# Next.js tests
pnpm test

# Python tests
cd antclock-service
python3 -m pytest
```

## Production Deployment

For production deployment:

1. **Disable Flask debug mode** (already configured by default)
2. **Use production WSGI server** (Gunicorn, uWSGI)
3. **Set up proper environment variables** on hosting platform
4. **Use managed PostgreSQL** (Vercel Postgres, Neon, etc.)
5. **Deploy services separately**:
   - Next.js → Vercel/Netlify
   - Python API → Fly.io/Railway/AWS Lambda

## Resources

- [AntClock Repository](https://github.com/selfapplied/antclock)
- [AntClock Documentation](https://github.com/selfapplied/antclock/blob/main/docs/spec.md)
- [Next.js AI Chatbot Template](https://github.com/vercel/ai-chatbot)
- [Flask Documentation](https://flask.palletsprojects.com/)

## License

- Chat Application: MIT License
- AntClock Integration: CC BY-SA 4.0 (per AntClock project)

## Support

For issues or questions:
- GitHub Issues: https://github.com/selfapplied/chat/issues
- AntClock Issues: https://github.com/selfapplied/antclock/issues
