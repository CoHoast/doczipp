import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Sparkles, Crown, Zap } from 'lucide-react';

export const metadata = {
  title: 'Pricing | DOCZipp',
  description: 'Simple, transparent pricing for freelancers, small businesses, and teams.',
};

const PLANS = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Perfect for trying out DOCZipp',
    features: [
      '3 documents per month',
      'All 5 document types',
      'Basic templates',
      'PDF download',
      'DOCZipp watermark',
    ],
    notIncluded: [
      'Custom branding',
      'AI-powered suggestions',
      'Save & manage documents',
    ],
    cta: 'Get Started',
    ctaLink: '/create',
    highlighted: false,
    badge: null,
  },
  {
    name: 'Pro',
    price: '$9',
    period: '/month',
    yearlyPrice: '$79/year',
    description: 'For freelancers who need more',
    features: [
      'Unlimited documents',
      'All 5 document types',
      'All premium templates',
      'No watermark',
      'Custom branding',
      'Logo upload',
      'Color & font customization',
    ],
    notIncluded: [
      'AI-powered suggestions',
      'Save & manage documents',
    ],
    cta: 'Start Free Trial',
    ctaLink: '/create',
    highlighted: false,
    badge: null,
  },
  {
    name: 'Premium',
    price: '$19',
    period: '/month',
    yearlyPrice: '$149/year',
    description: 'Full power with AI assistance',
    features: [
      'Everything in Pro',
      'AI line item suggestions',
      'AI description expander',
      'Save & manage documents',
      'Client database',
      'Document history',
      'Priority email support',
    ],
    notIncluded: [],
    cta: 'Start Free Trial',
    ctaLink: '/create',
    highlighted: true,
    badge: 'AI Enhanced',
  },
];

export default function PricingPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 brand-gradient opacity-5" />
        <div className="container mx-auto px-4 pt-20 pb-16 md:pt-24 md:pb-20 text-center relative">
          <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 px-4 py-1.5">
            <Crown className="h-3.5 w-3.5 mr-1.5" />
            Simple Pricing
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Choose Your <span className="brand-gradient-text">Plan</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Start free, upgrade when you need more. No hidden fees, cancel anytime.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="container mx-auto px-4 pb-16 md:pb-20">
        <div className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
          {PLANS.map((plan) => (
            <div 
              key={plan.name}
              className={`
                relative rounded-2xl p-6 md:p-8 
                ${plan.highlighted 
                  ? 'brand-gradient text-white ring-4 ring-primary ring-offset-4' 
                  : 'bg-card border border-border'
                }
              `}
            >
              {/* AI Enhanced Badge */}
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge className="bg-white text-primary border-0 shadow-lg px-3 py-1">
                    <Sparkles className="h-3.5 w-3.5 mr-1.5" />
                    {plan.badge}
                  </Badge>
                </div>
              )}

              <div className="mb-6">
                <h3 className={`text-lg font-semibold mb-2 ${plan.highlighted ? 'text-white' : ''}`}>
                  {plan.name}
                </h3>
                <div className="flex items-baseline gap-1">
                  <span className={`text-4xl md:text-5xl font-bold ${plan.highlighted ? 'text-white' : ''}`}>
                    {plan.price}
                  </span>
                  <span className={plan.highlighted ? 'text-white/80' : 'text-muted-foreground'}>
                    {plan.period}
                  </span>
                </div>
                {plan.yearlyPrice && (
                  <p className={`text-sm mt-1 ${plan.highlighted ? 'text-white/80' : 'text-muted-foreground'}`}>
                    or {plan.yearlyPrice} (save ~30%)
                  </p>
                )}
                <p className={`text-sm mt-3 ${plan.highlighted ? 'text-white/80' : 'text-muted-foreground'}`}>
                  {plan.description}
                </p>
              </div>

              <ul className="space-y-3 mb-6">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <Check className={`h-5 w-5 flex-shrink-0 mt-0.5 ${plan.highlighted ? 'text-white/80' : 'text-primary'}`} />
                    <span className={`text-sm ${plan.highlighted ? 'text-white' : ''}`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {plan.notIncluded.length > 0 && (
                <ul className="space-y-2 mb-6 opacity-60">
                  {plan.notIncluded.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <span className={`text-sm line-through ${plan.highlighted ? 'text-white/60' : 'text-muted-foreground'}`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              )}

              <Link href={plan.ctaLink}>
                <Button 
                  className={`w-full ${
                    plan.highlighted 
                      ? 'bg-white text-primary hover:bg-white/90' 
                      : 'brand-gradient text-white hover:opacity-90'
                  }`}
                >
                  {plan.cta}
                </Button>
              </Link>
            </div>
          ))}
        </div>

        {/* Comparison note */}
        <p className="text-center text-muted-foreground text-sm mt-8">
          All plans include all 5 document types: Invoice, Quote, Estimate, Receipt, Proforma
        </p>
      </section>

      {/* FAQ */}
      <section className="bg-muted/30 py-16 md:py-20 border-t">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="max-w-3xl mx-auto space-y-6">
            <FaqItem 
              question="Can I try DOCZipp for free?"
              answer="Yes! You can create up to 3 documents per month completely free. No credit card required."
            />
            <FaqItem 
              question="What's the difference between Pro and Premium?"
              answer="Pro gives you unlimited documents with custom branding. Premium adds AI-powered suggestions for line items and descriptions, plus the ability to save and manage all your documents in a dashboard."
            />
            <FaqItem 
              question="How do the AI features work?"
              answer="Our AI analyzes your document context and suggests relevant line items and professional descriptions. It learns from industry standards to help you create polished documents faster."
            />
            <FaqItem 
              question="Can I cancel my subscription anytime?"
              answer="Absolutely. Cancel anytime with no questions asked. You'll retain access until the end of your billing period."
            />
            <FaqItem 
              question="Is my data secure?"
              answer="Yes. We use industry-standard encryption and never share your data with third parties. Premium users' documents are stored securely in our database."
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-16 md:py-20">
        <div className="relative rounded-3xl overflow-hidden brand-gradient p-8 md:p-16 text-center text-white">
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-xl opacity-90 mb-8">
              Create your first document in under 60 seconds. No credit card required.
            </p>
            <Link href="/create">
              <Button size="lg" variant="secondary" className="text-lg px-8">
                Start Creating — Free
              </Button>
            </Link>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-3xl" />
        </div>
      </section>
    </div>
  );
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  return (
    <div className="bg-card rounded-xl p-6 border">
      <h3 className="font-semibold mb-2">{question}</h3>
      <p className="text-muted-foreground text-sm">{answer}</p>
    </div>
  );
}
