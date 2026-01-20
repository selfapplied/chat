# AntClock Intelligence Boost Service

This service integrates the [AntClock](https://github.com/selfapplied/antclock) Coherence Engine (CE1→CE2→CE3) framework into the chat application to provide intelligence boosting capabilities.

## Overview

AntClock is a complete reconstruction of the Riemann zeta function as a Galois covering space of the integers, built from curvature flows and digit symmetries. The CE framework provides three interconnected layers:

- **CE1 (Discrete Grammar)**: Combinatorial structures and digit symmetries
- **CE2 (Dynamical Flow)**: Continuous flows emerging from discrete dynamics
- **CE3 (Emergent Simplicial)**: Topological emergence via simplicial complexes

## Architecture

The service consists of:

1. **antclock_engine.py** - Core AntClock intelligence engine implementing the CE1-CE3 framework
2. **api.py** - Flask API service exposing AntClock features via REST endpoints

## API Endpoints

### Health Check
```bash
GET /health
```

Returns service health status.

### Boost Intelligence
```bash
POST /boost
Content-Type: application/json

{
  "text": "Your text to analyze",
  "context": {}  // optional
}
```

Returns:
```json
{
  "boosted": true,
  "coherence_score": 0.85,
  "ce1_discrete": {
    "char_diversity": 19,
    "total_chars": 61,
    "mirror_phase": 1,
    "symmetry_index": 0.35
  },
  "ce2_flow": {
    "word_count": 13,
    "avg_word_length": 4.8,
    "flow_entropy": 0.55,
    "curvature_index": 3.7
  },
  "ce3_emergent": {
    "sentence_count": 1,
    "simplicial_complexity": 3.25,
    "emergence_level": 0.25,
    "riemann_alignment": 0.0
  },
  "suggestions": ["..."],
  "framework": "AntClock CE1→CE2→CE3"
}
```

### Get Metrics
```bash
GET /metrics
```

Returns framework metrics and descriptions.

## Running the Service

### Prerequisites
- Python 3.7+
- Flask
- Flask-CORS
- NumPy

### Installation
```bash
pip install flask flask-cors numpy
```

### Start the Service
```bash
cd antclock-service
python3 api.py
```

The service will run on `http://localhost:5000`.

**Debug Mode:**
By default, the Flask app runs with debug mode disabled for security. To enable debug mode for development:
```bash
FLASK_DEBUG=true python3 api.py
```

## Integration with Next.js

The Next.js application includes:

1. **API Route** (`/app/api/antclock/route.ts`) - Proxies requests to the Python service
2. **AntClock Badge** (`/components/antclock/antclock-badge.tsx`) - Visual indicator showing the service is active
3. The badge appears in the bottom-right corner when the service is running

## Usage in Chat

When the AntClock service is running, it provides real-time intelligence analysis:

- Analyzes text coherence using the CE framework
- Computes discrete structure metrics (CE1)
- Measures flow dynamics (CE2)
- Extracts emergent patterns (CE3)
- Provides suggestions for improvement

## Development

To test the engine directly:

```bash
python3 antclock_engine.py
```

This will run a test analysis and output the results.

## References

- [AntClock GitHub Repository](https://github.com/selfapplied/antclock)
- [AntClock Documentation](https://github.com/selfapplied/antclock/blob/main/docs/spec.md)
- CE Framework: CE1→CE2→CE3 for systematic intelligence augmentation

## License

This integration follows the AntClock project's Creative Commons Attribution-ShareAlike 4.0 International (CC BY-SA 4.0) license.
