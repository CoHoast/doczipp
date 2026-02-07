import Link from 'next/link';
import { FileText } from 'lucide-react';
import { Header } from '@/components/layout/Header';

export const metadata = {
  title: 'Privacy Policy | QuickBill',
  description: 'QuickBill privacy policy - how we handle your data',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Privacy Policy</h1>
          <p className="text-slate-600 mb-8">Last updated: February 2026</p>
          
          <div className="prose prose-slate max-w-none">
            <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-4">1. Information We Collect</h2>
            <p className="text-slate-600 mb-4">
              QuickBill collects information you provide directly to us, including when you create documents, 
              set up an account, or contact us for support. This may include your name, email address, 
              business information, and document content.
            </p>

            <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-4">2. How We Use Your Information</h2>
            <p className="text-slate-600 mb-4">
              We use the information we collect to provide, maintain, and improve our services, 
              process transactions, send you technical notices and support messages, and respond to your requests.
            </p>

            <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-4">3. Data Storage</h2>
            <p className="text-slate-600 mb-4">
              If you use QuickBill without an account, your document data is processed in your browser 
              and is not stored on our servers. If you create an account, your documents are stored 
              securely using industry-standard encryption.
            </p>

            <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-4">4. Data Sharing</h2>
            <p className="text-slate-600 mb-4">
              We do not sell, trade, or rent your personal information to third parties. We may share 
              information with service providers who assist us in operating our platform, conducting our 
              business, or serving our users.
            </p>

            <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-4">5. Your Rights</h2>
            <p className="text-slate-600 mb-4">
              You have the right to access, correct, or delete your personal information. You can also 
              request a copy of your data or ask us to stop processing your information.
            </p>

            <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-4">6. Contact Us</h2>
            <p className="text-slate-600 mb-4">
              If you have any questions about this Privacy Policy, please contact us at{' '}
              <a href="mailto:privacy@quickbill.com" className="text-blue-600 hover:text-blue-700">
                privacy@quickbill.com
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
            <Link href="/privacy" className="text-blue-600 font-medium">Privacy</Link>
            <Link href="/terms" className="hover:text-slate-900">Terms</Link>
            <Link href="/contact" className="hover:text-slate-900">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
