import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // PayMongo webhook structure
    const { data } = body;

    if (!data || !data.attributes) {
      console.error('Invalid webhook payload');
      return NextResponse.json(
        { error: 'Invalid payload' },
        { status: 400 }
      );
    }

    const eventType = data.attributes.type;
    const paymentData = data.attributes.data;

    console.log('PayMongo webhook received:', {
      eventType,
      paymentId: paymentData.id,
      status: paymentData.attributes?.status,
      amount: paymentData.attributes?.amount,
      currency: paymentData.attributes?.currency,
    });

    // Handle different webhook events
    switch (eventType) {
      case 'payment.paid':
        console.log(`Payment ${paymentData.id} completed successfully`);
        // TODO: Add your business logic here
        // - Update database with payment status
        // - Send confirmation email
        // - Trigger order fulfillment
        // - Update user's subscription/access
        break;

      case 'payment.failed':
        console.log(`Payment ${paymentData.id} failed`);
        // TODO: Handle failed payment
        // - Notify user
        // - Log failure reason
        break;

      case 'payment_intent.payment_failed':
        console.log(`Payment intent ${paymentData.id} payment failed`);
        // TODO: Handle payment intent failure
        break;

      case 'payment_intent.succeeded':
        console.log(`Payment intent ${paymentData.id} succeeded`);
        // TODO: Handle successful payment intent
        break;

      case 'source.chargeable':
        console.log(`Source ${paymentData.id} is chargeable`);
        // TODO: Handle chargeable source (for GCash/GrabPay)
        break;

      default:
        console.log(`Unhandled webhook event: ${eventType}`);
    }

    // PayMongo expects a 200 response
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Webhook processing error:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}
