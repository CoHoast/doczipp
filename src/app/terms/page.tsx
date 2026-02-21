import { Badge } from '@/components/ui/badge';
import { FileText } from 'lucide-react';

export const metadata = {
  title: 'Terms of Service | DOCZipp',
  description: 'DOCZipp terms of service',
};

export default function TermsPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 brand-gradient opacity-5" />
        <div className="container mx-auto px-4 py-16 md:py-20 text-center relative">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
            <FileText className="h-3 w-3 mr-1" />
            Legal
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Terms of <span className="brand-gradient-text">Service</span>
          </h1>
          <p className="text-muted-foreground">Last updated: February 2026</p>
        </div>
      </section>
      
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="max-w-3xl mx-auto">
          <div className="prose prose-slate dark:prose-invert max-w-none">
            <h2 className="text-xl font-semibold mt-8 mb-4">1. Acceptance of Terms</h2>
            <p className="text-muted-foreground mb-4">
              By accessing or using DOCZipp, you agree to be bound by these Terms of Service. 
              If you do not agree to these terms, please do not use our service.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">2. Description of Service</h2>
            <p className="text-muted-foreground mb-4">
              DOCZipp provides an online platform for creating professional business documents 
              including invoices, quotes, estimates, receipts, and proforma invoices.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">3. User Accounts</h2>
            <p className="text-muted-foreground mb-4">
              You may use DOCZipp without creating an account, subject to certain limitations. 
              To access premium features, you must create an account and provide accurate information.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">4. Payment Terms</h2>
            <p className="text-muted-foreground mb-4">
              Paid subscriptions are billed in advance on a monthly or annual basis. You may cancel 
              your subscription at any time, and you will continue to have access until the end of 
              your billing period.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">5. Acceptable Use</h2>
            <p className="text-muted-foreground mb-4">
              You agree not to use DOCZipp for any unlawful purpose or in any way that could damage, 
              disable, or impair our service. You are responsible for all content you create using our platform.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">6. Limitation of Liability</h2>
            <p className="text-muted-foreground mb-4">
              DOCZipp is provided &quot;as is&quot; without warranties of any kind. We are not liable for any 
              indirect, incidental, or consequential damages arising from your use of the service.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">7. Contact</h2>
            <p className="text-muted-foreground mb-4">
              Questions about these terms? Contact us at{' '}
              <a href="mailto:legal@doczipp.com" className="text-primary hover:underline">
                legal@doczipp.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
