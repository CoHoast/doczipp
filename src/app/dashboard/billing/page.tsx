import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Check, Zap } from 'lucide-react';

export const metadata = {
  title: 'Billing | QuickBill',
  description: 'Manage your subscription',
};

export default function BillingPage() {
  // Mock current plan - would come from auth session/database
  const currentPlan: string = 'free';
  const documentsUsed = 2;
  const documentsLimit = 3;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Billing</h1>
        <p className="text-slate-600">Manage your subscription and billing</p>
      </div>

      <div className="space-y-8">
        {/* Current Plan */}
        <section className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-6">Current Plan</h2>
          
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl font-bold text-slate-900 capitalize">{currentPlan}</span>
                {currentPlan === 'pro' && (
                  <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                    Active
                  </span>
                )}
              </div>
              {currentPlan === 'free' ? (
                <p className="text-slate-600">
                  {documentsUsed} of {documentsLimit} documents used this month
                </p>
              ) : (
                <p className="text-slate-600">Unlimited documents • Renews on March 7, 2026</p>
              )}
            </div>
            
            {currentPlan === 'free' && (
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Zap className="h-4 w-4 mr-2" />
                Upgrade to Pro
              </Button>
            )}
          </div>

          {/* Usage bar for free plan */}
          {currentPlan === 'free' && (
            <div className="mt-6">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-600">Monthly Usage</span>
                <span className="text-slate-900 font-medium">{documentsUsed}/{documentsLimit}</span>
              </div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-600 rounded-full"
                  style={{ width: `${(documentsUsed / documentsLimit) * 100}%` }}
                />
              </div>
            </div>
          )}
        </section>

        {/* Upgrade Card (show only for free users) */}
        {currentPlan === 'free' && (
          <section className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-6 text-white">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xl font-bold mb-2">Upgrade to Pro</h2>
                <p className="text-blue-100 mb-4">
                  Unlock unlimited documents and premium features
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-blue-200" />
                    Unlimited documents
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-blue-200" />
                    No watermark
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-blue-200" />
                    AI-powered suggestions
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-blue-200" />
                    Logo upload
                  </li>
                </ul>
                <Button className="bg-white text-blue-600 hover:bg-blue-50">
                  Upgrade for $9/month
                </Button>
              </div>
              <div className="text-right">
                <div className="text-4xl font-bold">$9</div>
                <div className="text-blue-200">/month</div>
                <div className="text-sm text-blue-200 mt-1">or $79/year</div>
              </div>
            </div>
          </section>
        )}

        {/* Billing History */}
        <section className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-6">Billing History</h2>
          
          {currentPlan === 'free' ? (
            <p className="text-slate-600">No billing history yet. Upgrade to Pro to see your invoices here.</p>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-3 text-sm font-medium text-slate-600">Date</th>
                  <th className="text-left py-3 text-sm font-medium text-slate-600">Description</th>
                  <th className="text-left py-3 text-sm font-medium text-slate-600">Amount</th>
                  <th className="text-right py-3 text-sm font-medium text-slate-600">Invoice</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-100">
                  <td className="py-3 text-slate-700">Feb 7, 2026</td>
                  <td className="py-3 text-slate-700">Pro Plan - Monthly</td>
                  <td className="py-3 text-slate-900 font-medium">$9.00</td>
                  <td className="py-3 text-right">
                    <Button variant="ghost" size="sm" className="text-blue-600">
                      Download
                    </Button>
                  </td>
                </tr>
              </tbody>
            </table>
          )}
        </section>

        {/* Cancel Subscription (show only for pro users) */}
        {currentPlan === 'pro' && (
          <section className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-2">Cancel Subscription</h2>
            <p className="text-slate-600 text-sm mb-4">
              You can cancel your subscription at any time. You&apos;ll retain access until the end of your billing period.
            </p>
            <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50">
              Cancel Subscription
            </Button>
          </section>
        )}
      </div>
    </div>
  );
}
