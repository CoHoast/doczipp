import { Badge } from '@/components/ui/badge';
import { Shield } from 'lucide-react';

export const metadata = {
  title: 'Privacy Policy | DOCzipp',
  description: 'DOCzipp privacy policy - how we handle your data',
};

export default function PrivacyPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 brand-gradient opacity-5" />
        <div className="container mx-auto px-4 py-16 md:py-20 text-center relative">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
            <Shield className="h-3 w-3 mr-1" />
            Legal
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Privacy <span className="brand-gradient-text">Policy</span>
          </h1>
          <p className="text-muted-foreground">Last updated: February 2026</p>
        </div>
      </section>
      
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="max-w-3xl mx-auto">
          <div className="prose prose-slate dark:prose-invert max-w-none">
            <h2 className="text-xl font-semibold mt-8 mb-4">1. Information We Collect</h2>
            <p className="text-muted-foreground mb-4">
              DOCzipp collects information you provide directly to us, including when you create documents, 
              set up an account, or contact us for support. This may include your name, email address, 
              business information, and document content.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">2. How We Use Your Information</h2>
            <p className="text-muted-foreground mb-4">
              We use the information we collect to provide, maintain, and improve our services, 
              process transactions, send you technical notices and support messages, and respond to your requests.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">3. Data Storage</h2>
            <p className="text-muted-foreground mb-4">
              If you use DOCzipp without an account, your document data is processed in your browser 
              and is not stored on our servers. If you create an account, your documents are stored 
              securely using industry-standard encryption.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">4. Data Sharing</h2>
            <p className="text-muted-foreground mb-4">
              We do not sell, trade, or rent your personal information to third parties. We may share 
              information with service providers who assist us in operating our platform, conducting our 
              business, or serving our users.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">5. Your Rights</h2>
            <p className="text-muted-foreground mb-4">
              You have the right to access, correct, or delete your personal information. You can also 
              request a copy of your data or ask us to stop processing your information.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">6. Contact Us</h2>
            <p className="text-muted-foreground mb-4">
              If you have any questions about this Privacy Policy, please contact us at{' '}
              <a href="mailto:privacy@doczipp.com" className="text-primary hover:underline">
                privacy@doczipp.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
