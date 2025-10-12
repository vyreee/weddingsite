import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const secretKey = process.env.PAYMONGO_SECRET_KEY;
    const apiUrl = process.env.PAYMONGO_API_URL;

    if (!secretKey || !apiUrl) {
      return NextResponse.json(
        { error: 'PayMongo API configuration missing' },
        { status: 500 }
      );
    }

    // Try to list payment methods to verify API key
    const response = await fetch(`${apiUrl}/payment_methods`, {
      method: 'GET',
      headers: {
        'Authorization': `Basic ${Buffer.from(secretKey + ':').toString('base64')}`,
      },
    });

    const data = await response.json();

    return NextResponse.json({
      status: response.status,
      ok: response.ok,
      apiKeyWorks: response.ok,
      response: data,
    });
  } catch (error) {
    console.error('Test error:', error);
    return NextResponse.json(
      { error: 'Test failed', details: error },
      { status: 500 }
    );
  }
}
