import Link from 'next/link';
import { FileText } from 'lucide-react';
import { Header } from '@/components/layout/Header';

export const metadata = {
  title: 'Terms of Service | QuickBill',
  description: 'QuickBill terms of service',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Terms of Service</h1>
          <p className="text-slate-600 mb-8">Last updated: February 2026</p>
          
          <div className="prose prose-slate max-w-none">
            <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-4">1. Acceptance of Terms</h2>
            <p className="text-slate-600 mb-4">
              By accessing or using QuickBill, you agree to be bound by these Terms of Service. 
              If you do not agree to these terms, please do not use our service.
            </p>

            <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-4">2. Description of Service</h2>
            <p className="text-slate-600 mb-4">
              QuickBill provides an online platform for creating professional business documents 
              including invoices, quotes, estimates, receipts, and proforma invoices.
            </p>

            <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-4">3. User Accounts</h2>
            <p className="text-slate-600 mb-4">
              You may use QuickBill without creating an account, subject to certain limitations. 
              To access premium features, you must create an account and provide accurate information.
            </p>

            <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-4">4. Payment Terms</h2>
            <p className="text-slate-600 mb-4">
              Paid subscriptions are billed in advance on a monthly or annual basis. You may cancel 
              your subscription at any time, and you will continue to have access until the end of 
              your billing period.
            </p>

            <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-4">5. Acceptable Use</h2>
            <p className="text-slate-600 mb-4">
              You agree not to use QuickBill for any unlawful purpose or in any way that could damage, 
              disable, or impair our service. You are responsible for all content you create using our platform.
            </p>

            <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-4">6. Limitation of Liability</h2>
            <p className="text-slate-600 mb-4">
              QuickBill is provided &quot;as is&quot; without warranties of any kind. We are not liable for any 
              indirect, incidental, or consequential damages arising from your use of the service.
            </p>

            <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-4">7. Contact</h2>
            <p className="text-slate-600 mb-4">
              Questions about these terms? Contact us at{' '}
              <a href="mailto:legal@quickbill.com" className="text-blue-600 hover:text-blue-700">
                legal@quickbill.com
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 md:py-12 border-t">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <FileText className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-bold text-slate-900">QuickBill</span>
          </div>
          <div className="text-slate-500 text-sm">
            © {new Date().getFullYear()} QuickBill. A BLUPRYNT product.
          </div>
          <div className="flex gap-6 text-sm text-slate-600">
            <Link href="/privacy" className="hover:text-slate-900">Privacy</Link>
            <Link href="/terms" className="text-blue-600 font-medium">Terms</Link>
            <Link href="/contact" className="hover:text-slate-900">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
