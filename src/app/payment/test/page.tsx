import { PaymentQRCode } from '@/components/PaymentQRCode';

export default function PaymentTestPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            PayMongo Payment Test
          </h1>
          <p className="mt-2 text-gray-600">
            Test Card and Maya payments with PayMongo
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <h2 className="text-xl font-semibold mb-4">Small Payment</h2>
            <PaymentQRCode
              amount={100.00}
              currency="PHP"
              email="test@example.com"
              name="Test User"
              purpose="Test Payment - Small"
            />
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Large Payment</h2>
            <PaymentQRCode
              amount={250.00}
              currency="PHP"
              email="test@example.com"
              name="Test User"
              purpose="Test Payment - Large"
            />
          </div>
        </div>

        <div className="mt-8 bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Testing Instructions</h3>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>Click the &quot;Pay Now&quot; button</li>
            <li>PayMongo&apos;s checkout modal will open</li>
            <li>Use test card: <code className="text-xs bg-gray-100 px-1 py-0.5 rounded">4343434343434345</code></li>
            <li>Enter any future expiry date and CVC</li>
            <li>You&apos;ll be redirected back to the success page</li>
            <li>Check the webhook logs in your terminal for payment notifications</li>
          </ol>

          <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded">
            <p className="text-sm text-yellow-800">
              <strong>Note:</strong> Make sure your PayMongo API keys are configured in .env.local
            </p>
          </div>

          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded">
            <h4 className="text-sm font-semibold text-blue-900 mb-2">Webhook Setup</h4>
            <p className="text-sm text-blue-800 mb-2">
              To receive payment notifications, register your webhook URL in PayMongo Dashboard:
            </p>
            <code className="text-xs bg-white px-2 py-1 rounded border block">
              https://your-domain.com/api/payment/webhook
            </code>
            <p className="text-xs text-blue-700 mt-2">
              Events to listen: payment.paid, payment.failed, payment_intent.succeeded
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
