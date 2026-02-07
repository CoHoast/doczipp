import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FileText, Check } from 'lucide-react';
import { MobileMenu } from '@/components/layout/MobileMenu';

export const metadata = {
  title: 'Pricing | QuickBill',
  description: 'Simple, transparent pricing for freelancers, small businesses, and teams.',
};

const PLANS = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Perfect for trying out QuickBill',
    features: [
      '3 documents per month',
      'All 5 document types',
      'Basic templates',
      'PDF download',
      'QuickBill watermark',
    ],
    cta: 'Get Started',
    ctaLink: '/create',
    highlighted: false,
  },
  {
    name: 'Pro',
    price: '$9',
    period: '/month',
    yearlyPrice: '$79/year',
    description: 'For freelancers and solopreneurs',
    features: [
      'Unlimited documents',
      'All 5 document types',
      'All premium templates',
      'Custom branding (no watermark)',
      'Logo upload',
      'AI-powered suggestions',
      'Save & manage documents',
      'Email support',
    ],
    cta: 'Start Free Trial',
    ctaLink: '/create',
    highlighted: true,
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <header className="container mx-auto px-4 py-4 md:py-6">
        <nav className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <FileText className="h-4 w-4 md:h-6 md:w-6 text-white" />
            </div>
            <span className="text-xl md:text-2xl font-bold text-slate-900">QuickBill</span>
          </Link>
          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-4">
            <Link href="/pricing" className="text-blue-600 font-medium">
              Pricing
            </Link>
            <Link href="/templates" className="text-slate-600 hover:text-slate-900">
              Templates
            </Link>
            <Link href="/login">
              <Button variant="outline">Log In</Button>
            </Link>
            <Link href="/create">
              <Button className="bg-blue-600 hover:bg-blue-700">
                Get Started
              </Button>
            </Link>
          </div>
          {/* Mobile nav */}
          <MobileMenu />
        </nav>
      </header>

      {/* Hero */}
      <section className="container mx-auto px-4 py-12 md:py-16 text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4">
          Simple, Transparent Pricing
        </h1>
        <p className="text-base md:text-xl text-slate-600 max-w-2xl mx-auto">
          Start free, upgrade when you need more. No hidden fees, cancel anytime.
        </p>
      </section>

      {/* Pricing Cards */}
      <section className="container mx-auto px-4 pb-12 md:pb-20">
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-3xl mx-auto">
          {PLANS.map((plan) => (
            <div 
              key={plan.name}
              className={`
                rounded-2xl p-6 md:p-8 
                ${plan.highlighted 
                  ? 'bg-blue-600 text-white ring-4 ring-blue-600 ring-offset-4' 
                  : 'bg-white border border-slate-200'
                }
              `}
            >
              <div className="mb-6">
                <h3 className={`text-lg font-semibold mb-2 ${plan.highlighted ? 'text-white' : 'text-slate-900'}`}>
                  {plan.name}
                </h3>
                <div className="flex items-baseline gap-1">
                  <span className={`text-4xl md:text-5xl font-bold ${plan.highlighted ? 'text-white' : 'text-slate-900'}`}>
                    {plan.price}
                  </span>
                  <span className={plan.highlighted ? 'text-blue-100' : 'text-slate-500'}>
                    {plan.period}
                  </span>
                </div>
                {plan.yearlyPrice && (
                  <p className={`text-sm mt-1 ${plan.highlighted ? 'text-blue-100' : 'text-slate-500'}`}>
                    or {plan.yearlyPrice} (save 27%)
                  </p>
                )}
                <p className={`text-sm mt-3 ${plan.highlighted ? 'text-blue-100' : 'text-slate-600'}`}>
                  {plan.description}
                </p>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <Check className={`h-5 w-5 flex-shrink-0 ${plan.highlighted ? 'text-blue-200' : 'text-green-500'}`} />
                    <span className={`text-sm ${plan.highlighted ? 'text-white' : 'text-slate-700'}`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Link href={plan.ctaLink}>
                <Button 
                  className={`w-full ${
                    plan.highlighted 
                      ? 'bg-white text-blue-600 hover:bg-blue-50' 
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                >
                  {plan.cta}
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-slate-50 py-12 md:py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-slate-900 mb-8 md:mb-12">
            Frequently Asked Questions
          </h2>
          <div className="max-w-3xl mx-auto space-y-6">
            <FaqItem 
              question="Can I try QuickBill for free?"
              answer="Yes! You can create up to 3 documents per month completely free. No credit card required."
            />
            <FaqItem 
              question="What happens when I hit the free limit?"
              answer="You'll be prompted to upgrade to Pro for unlimited documents. Your existing documents remain accessible."
            />
            <FaqItem 
              question="What's included in the Pro plan?"
              answer="Pro gives you unlimited documents, all premium templates, no watermark, logo upload, AI-powered suggestions, and the ability to save and manage all your documents."
            />
            <FaqItem 
              question="Can I cancel my subscription anytime?"
              answer="Absolutely. Cancel anytime with no questions asked. You'll retain access until the end of your billing period."
            />
            <FaqItem 
              question="Is my data secure?"
              answer="Yes. We use industry-standard encryption and never share your data with third parties."
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-12 md:py-20">
        <div className="bg-blue-600 rounded-2xl md:rounded-3xl p-8 md:p-12 text-center text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-blue-100 mb-6 md:mb-8 text-base md:text-lg">
            Join thousands of professionals who create documents with QuickBill.
          </p>
          <Link href="/create">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 text-base md:text-lg px-6 md:px-8 py-4 md:py-6 h-auto">
              Create Your First Document — Free
            </Button>
          </Link>
        </div>
      </section>

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
            <Link href="/terms" className="hover:text-slate-900">Terms</Link>
            <Link href="/contact" className="hover:text-slate-900">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  return (
    <div className="bg-white rounded-xl p-6 border border-slate-200">
      <h3 className="font-semibold text-slate-900 mb-2">{question}</h3>
      <p className="text-slate-600 text-sm">{answer}</p>
    </div>
  );
}
