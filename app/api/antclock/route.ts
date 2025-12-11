import { NextRequest, NextResponse } from 'next/server';

const ANTCLOCK_API_URL = process.env.ANTCLOCK_API_URL || 'http://localhost:5000';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { text, context } = body;

    if (!text) {
      return NextResponse.json(
        { error: 'Missing text field' },
        { status: 400 }
      );
    }

    // Call AntClock Intelligence API
    const response = await fetch(`${ANTCLOCK_API_URL}/boost`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text, context }),
    });

    if (!response.ok) {
      throw new Error(`AntClock API error: ${response.statusText}`);
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error calling AntClock API:', error);
    return NextResponse.json(
      { 
        error: 'Failed to boost intelligence',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // Health check and metrics
    const healthResponse = await fetch(`${ANTCLOCK_API_URL}/health`);
    const metricsResponse = await fetch(`${ANTCLOCK_API_URL}/metrics`);

    const health = await healthResponse.json();
    const metrics = await metricsResponse.json();

    return NextResponse.json({
      health,
      metrics,
      status: 'AntClock Intelligence Boost is active'
    });
  } catch (error) {
    console.error('Error checking AntClock status:', error);
    return NextResponse.json(
      { 
        error: 'AntClock service unavailable',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 503 }
    );
  }
}
