import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { amount, currency = 'PHP', email, name, purpose } = body;

    if (!amount || amount <= 0) {
      return NextResponse.json(
        { error: 'Invalid amount' },
        { status: 400 }
      );
    }

    const secretKey = process.env.PAYMONGO_SECRET_KEY;
    const apiUrl = process.env.PAYMONGO_API_URL;

    if (!secretKey || !apiUrl) {
      return NextResponse.json(
        { error: 'PayMongo API configuration missing' },
        { status: 500 }
      );
    }

    // Convert amount to cents (PayMongo uses centavos)
    const amountInCents = Math.round(amount * 100);

    // Minimum amount check
    if (amountInCents < 10000) {
      return NextResponse.json(
        { error: 'Amount must be at least 100 PHP for testing' },
        { status: 400 }
      );
    }

    // Create Checkout Session
    const checkoutSessionData = {
      data: {
        attributes: {
          line_items: [
            {
              name: purpose || 'Wedding Website Service',
              amount: amountInCents,
              currency: currency.toUpperCase(),
              quantity: 1,
            },
          ],
          payment_method_types: ['card', 'paymaya'],
          success_url: `${request.nextUrl.origin}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${request.nextUrl.origin}/payment/failed`,
          description: purpose || 'Wedding Website Service',
          metadata: {
            email: email || '',
            name: name || '',
          },
        },
      },
    };

    console.log('Creating checkout session with data:', JSON.stringify(checkoutSessionData, null, 2));

    const checkoutResponse = await fetch(`${apiUrl}/checkout_sessions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${Buffer.from(secretKey + ':').toString('base64')}`,
      },
      body: JSON.stringify(checkoutSessionData),
    });

    const checkoutResult = await checkoutResponse.json();

    if (!checkoutResponse.ok) {
      console.error('PayMongo Checkout Session Error:', JSON.stringify(checkoutResult, null, 2));
      return NextResponse.json(
        { error: 'Failed to create checkout session', details: checkoutResult },
        { status: checkoutResponse.status }
      );
    }

    const checkoutSession = checkoutResult.data;
    console.log('Checkout session created:', checkoutSession.id);

    return NextResponse.json({
      success: true,
      checkoutSessionId: checkoutSession.id,
      checkoutUrl: checkoutSession.attributes.checkout_url,
      amount: amount,
      currency,
    });
  } catch (error) {
    console.error('Payment creation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
