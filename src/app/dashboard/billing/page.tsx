'use client';

import { useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Check, Zap, Loader2, CheckCircle } from 'lucide-react';

function BillingContent() {
  const searchParams = useSearchParams();
  const success = searchParams.get('success');
  const canceled = searchParams.get('canceled');
  
  // Mock current plan - would come from auth session/database
  const currentPlan: string = 'free';
  const documentsUsed = 2;
  const documentsLimit = 3;
  
  const [isLoading, setIsLoading] = useState(false);
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');

  const handleUpgrade = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/stripe/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ billingPeriod }),
      });
      
      const data = await res.json();
      
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert(data.error || 'Failed to start checkout');
      }
    } catch (error) {
      alert('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleManageBilling = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/stripe/create-portal', {
        method: 'POST',
      });
      
      const data = await res.json();
      
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      alert('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Billing</h1>
        <p className="text-slate-600">Manage your subscription and billing</p>
      </div>

      {/* Success/Canceled Messages */}
      {success && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
          <CheckCircle className="h-5 w-5 text-green-600" />
          <span className="text-green-700">Welcome to Pro! Your subscription is now active.</span>
        </div>
      )}
      
      {canceled && (
        <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-700">
          Checkout was canceled. You can try again when you&apos;re ready.
        </div>
      )}

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
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
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
                
                {/* Billing Period Toggle */}
                <div className="flex items-center gap-2 mb-4 bg-blue-500/30 rounded-lg p-1 w-fit">
                  <button
                    onClick={() => setBillingPeriod('monthly')}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      billingPeriod === 'monthly' 
                        ? 'bg-white text-blue-600' 
                        : 'text-white hover:bg-blue-500/30'
                    }`}
                  >
                    Monthly
                  </button>
                  <button
                    onClick={() => setBillingPeriod('yearly')}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      billingPeriod === 'yearly' 
                        ? 'bg-white text-blue-600' 
                        : 'text-white hover:bg-blue-500/30'
                    }`}
                  >
                    Yearly (Save 27%)
                  </button>
                </div>
                
                <Button 
                  onClick={handleUpgrade}
                  disabled={isLoading}
                  className="bg-white text-blue-600 hover:bg-blue-50"
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : null}
                  Upgrade for {billingPeriod === 'monthly' ? '$9/month' : '$79/year'}
                </Button>
              </div>
              <div className="text-right">
                <div className="text-4xl font-bold">
                  {billingPeriod === 'monthly' ? '$9' : '$79'}
                </div>
                <div className="text-blue-200">
                  /{billingPeriod === 'monthly' ? 'month' : 'year'}
                </div>
                {billingPeriod === 'yearly' && (
                  <div className="text-sm text-blue-200 mt-1">
                    (Just $6.58/month)
                  </div>
                )}
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

        {/* Manage Subscription (show only for pro users) */}
        {currentPlan === 'pro' && (
          <section className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-2">Manage Subscription</h2>
            <p className="text-slate-600 text-sm mb-4">
              Update your payment method, change your plan, or cancel your subscription.
            </p>
            <Button 
              onClick={handleManageBilling}
              disabled={isLoading}
              variant="outline"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : null}
              Manage Billing
            </Button>
          </section>
        )}
      </div>
    </div>
  );
}

export default function BillingPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    }>
      <BillingContent />
    </Suspense>
  );
}
