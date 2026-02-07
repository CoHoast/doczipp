import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FileText, Zap, Download, Palette, Shield, Sparkles } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <FileText className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-slate-900">QuickBill</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/pricing" className="text-slate-600 hover:text-slate-900">
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
                Create Invoice
              </Button>
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
          <Sparkles className="h-4 w-4" />
          AI-Powered Invoice Generation
        </div>
        <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 max-w-4xl mx-auto leading-tight">
          Create Professional Invoices in{' '}
          <span className="text-blue-600">Seconds</span>
        </h1>
        <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
          Generate beautiful invoices, quotes, and receipts. No signup required. 
          Download as PDF and get paid faster.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link href="/create">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-6 h-auto">
              Create Your First Invoice
              <span className="ml-2">→</span>
            </Button>
          </Link>
          <Link href="/templates">
            <Button size="lg" variant="outline" className="text-lg px-8 py-6 h-auto">
              Browse Templates
            </Button>
          </Link>
        </div>
        <p className="text-sm text-slate-500 mt-4">
          Free to try • No credit card required
        </p>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">
          Everything You Need to Invoice Like a Pro
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Zap className="h-8 w-8" />}
            title="Lightning Fast"
            description="Create a complete invoice in under 60 seconds. No learning curve, no complex setup."
          />
          <FeatureCard
            icon={<Palette className="h-8 w-8" />}
            title="Beautiful Templates"
            description="5 professional templates with customizable colors and fonts to match your brand."
          />
          <FeatureCard
            icon={<Download className="h-8 w-8" />}
            title="Instant PDF Download"
            description="Generate high-quality PDFs ready to send to your clients immediately."
          />
          <FeatureCard
            icon={<Sparkles className="h-8 w-8" />}
            title="AI-Powered"
            description="Smart line item suggestions and professional description expansion powered by AI."
          />
          <FeatureCard
            icon={<FileText className="h-8 w-8" />}
            title="Multiple Document Types"
            description="Create invoices, quotes, estimates, receipts, and proforma invoices."
          />
          <FeatureCard
            icon={<Shield className="h-8 w-8" />}
            title="Your Data, Your Control"
            description="No account required for basic use. We don't store your data unless you want us to."
          />
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-20">
        <div className="bg-blue-600 rounded-3xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Create Your First Invoice?
          </h2>
          <p className="text-blue-100 mb-8 text-lg">
            Join thousands of freelancers and small businesses who invoice smarter.
          </p>
          <Link href="/create">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 text-lg px-8 py-6 h-auto">
              Get Started — It&apos;s Free
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-12 border-t">
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

function FeatureCard({ icon, title, description }: { 
  icon: React.ReactNode; 
  title: string; 
  description: string;
}) {
  return (
    <div className="bg-white rounded-2xl p-8 border border-slate-200 hover:border-blue-200 hover:shadow-lg transition-all">
      <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-slate-900 mb-2">{title}</h3>
      <p className="text-slate-600">{description}</p>
    </div>
  );
}
