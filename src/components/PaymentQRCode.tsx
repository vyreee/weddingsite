'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface PaymentQRCodeProps {
  amount: number;
  currency?: string;
  email?: string;
  name?: string;
  purpose?: string;
}

export function PaymentQRCode({
  amount,
  currency = 'PHP',
  email,
  name,
  purpose,
}: PaymentQRCodeProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createPayment = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/payment/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount,
          currency,
          email,
          name,
          purpose,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create payment');
      }

      console.log('Checkout session created:', data.checkoutSessionId);
      console.log('Checkout URL:', data.checkoutUrl);

      // Redirect to PayMongo checkout page
      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      } else {
        throw new Error('No checkout URL received');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
      setLoading(false);
    }
  };

  return (
    <Card className="p-6 max-w-md mx-auto">
      <div className="space-y-4">
        <div className="text-center">
          <h3 className="text-lg font-semibold">Payment Amount</h3>
          <p className="text-3xl font-bold mt-2">
            {currency} {amount.toFixed(2)}
          </p>
          <p className="text-sm text-gray-500 mt-1">Card or Maya payment</p>
        </div>

        {!loading && (
          <Button onClick={createPayment} className="w-full" size="lg">
            Pay Now
          </Button>
        )}

        {loading && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
            <p className="mt-4 text-sm text-gray-600">
              Redirecting to checkout...
            </p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-800 text-sm font-medium mb-2">
              Payment Error
            </p>
            <p className="text-red-700 text-sm">{error}</p>
            <Button
              onClick={createPayment}
              variant="outline"
              size="sm"
              className="mt-3"
            >
              Try Again
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
}
