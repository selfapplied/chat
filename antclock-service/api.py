#!/usr/bin/env python3
"""
AntClock Intelligence API Service
Flask API to expose AntClock CE framework for chat intelligence boosting.
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
from antclock_engine import AntClockEngine
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app)  # Enable CORS for Next.js frontend

# Initialize AntClock engine
engine = AntClockEngine()

@app.route('/health', methods=['GET'])
def health():
    """Health check endpoint."""
    return jsonify({
        "status": "healthy",
        "service": "AntClock Intelligence API",
        "framework": "CE1→CE2→CE3"
    })

@app.route('/boost', methods=['POST'])
def boost_intelligence():
    """
    Boost intelligence for input text using AntClock CE framework.
    
    Request body:
    {
        "text": "Input text to analyze",
        "context": {} // Optional context
    }
    
    Returns:
    {
        "boosted": true,
        "coherence_score": 0.85,
        "ce1_discrete": {...},
        "ce2_flow": {...},
        "ce3_emergent": {...},
        "suggestions": [...],
        "framework": "AntClock CE1→CE2→CE3"
    }
    """
    try:
        data = request.get_json()
        
        if not data or 'text' not in data:
            return jsonify({
                "error": "Missing 'text' field in request body"
            }), 400
        
        text = data['text']
        context = data.get('context', {})
        
        logger.info(f"Boosting intelligence for text of length {len(text)}")
        
        result = engine.boost_intelligence(text, context)
        
        return jsonify(result)
        
    except Exception as e:
        logger.error(f"Error boosting intelligence: {str(e)}")
        return jsonify({
            "error": "Internal server error",
            "message": str(e)
        }), 500

@app.route('/metrics', methods=['GET'])
def get_metrics():
    """Get AntClock framework metrics."""
    return jsonify({
        "framework": "AntClock CE1→CE2→CE3",
        "phi_10": engine.phi_10,
        "gamma_gap": engine.gamma_gap,
        "description": {
            "CE1": "Discrete Grammar - combinatorial structures and digit symmetries",
            "CE2": "Dynamical Flow - continuous flows from discrete dynamics",
            "CE3": "Emergent Simplicial - topological emergence via simplicial complexes"
        }
    })

if __name__ == '__main__':
    import os
    debug_mode = os.environ.get('FLASK_DEBUG', 'false').lower() == 'true'
    logger.info("Starting AntClock Intelligence API on port 5000")
    app.run(host='0.0.0.0', port=5000, debug=debug_mode)
