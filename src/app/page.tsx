import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FileText, Zap, Download, Palette, Shield, Sparkles, ArrowRight, Receipt, FileCheck, ClipboardList, FileOutput, FileBadge } from 'lucide-react';
import { MobileMenu } from '@/components/layout/MobileMenu';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <header className="container mx-auto px-4 py-4 md:py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <FileText className="h-4 w-4 md:h-6 md:w-6 text-white" />
            </div>
            <span className="text-xl md:text-2xl font-bold text-slate-900">QuickBill</span>
          </div>
          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-4">
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
                Get Started
              </Button>
            </Link>
          </div>
          {/* Mobile nav */}
          <MobileMenu />
        </nav>
      </header>

      {/* Hero */}
      <section className="container mx-auto px-4 py-12 md:py-20 text-center">
        <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium mb-4 md:mb-6">
          <Sparkles className="h-3 w-3 md:h-4 md:w-4" />
          AI-Powered Invoice Generation
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-4 md:mb-6 max-w-4xl mx-auto leading-tight">
          Create Professional Documents in{' '}
          <span className="text-blue-600">Seconds</span>
        </h1>
        <p className="text-base md:text-xl text-slate-600 mb-6 md:mb-10 max-w-2xl mx-auto px-4">
          Generate beautiful invoices, quotes, estimates, receipts & more. 
          No signup required. Download as PDF and get paid faster.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 px-4">
          <Link href="/create" className="w-full sm:w-auto">
            <Button size="lg" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-base md:text-lg px-6 md:px-8 py-4 md:py-6 h-auto">
              Create Your First Document
              <span className="ml-2">→</span>
            </Button>
          </Link>
          <Link href="/templates" className="w-full sm:w-auto">
            <Button size="lg" variant="outline" className="w-full sm:w-auto text-base md:text-lg px-6 md:px-8 py-4 md:py-6 h-auto">
              Browse Templates
            </Button>
          </Link>
        </div>
        <p className="text-xs md:text-sm text-slate-500 mt-4">
          Free to try • No credit card required
        </p>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-12 md:py-20">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-slate-900 mb-3 md:mb-4">
          Everything You Need to Get Paid Faster
        </h2>
        <p className="text-base md:text-lg text-slate-600 text-center max-w-2xl mx-auto mb-8 md:mb-12">
          A complete document suite for freelancers, contractors, and small businesses.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          <FeatureCard
            icon={<Zap className="h-6 w-6 md:h-8 md:w-8" />}
            title="Lightning Fast"
            description="Create a complete document in under 60 seconds. No learning curve, no complex setup."
          />
          <FeatureCard
            icon={<Palette className="h-6 w-6 md:h-8 md:w-8" />}
            title="Beautiful Templates"
            description="5 professional templates with customizable colors and fonts to match your brand."
          />
          <FeatureCard
            icon={<Download className="h-6 w-6 md:h-8 md:w-8" />}
            title="Instant PDF Download"
            description="Generate high-quality PDFs ready to send to your clients immediately."
          />
          <FeatureCard
            icon={<Sparkles className="h-6 w-6 md:h-8 md:w-8" />}
            title="AI-Powered"
            description="Smart line item suggestions and professional description expansion powered by AI."
          />
          <FeatureCard
            icon={<FileText className="h-6 w-6 md:h-8 md:w-8" />}
            title="Multiple Document Types"
            description="Create invoices, quotes, estimates, receipts, and proforma invoices — all in one place."
          />
          <FeatureCard
            icon={<Shield className="h-6 w-6 md:h-8 md:w-8" />}
            title="Your Data, Your Control"
            description="No account required for basic use. Your documents stay private and secure."
          />
        </div>
      </section>

      {/* Document Types */}
      <section className="bg-slate-50 py-12 md:py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-slate-900 mb-3 md:mb-4">
            One Platform, Every Document You Need
          </h2>
          <p className="text-base md:text-lg text-slate-600 text-center max-w-2xl mx-auto mb-8 md:mb-12">
            From initial quotes to final receipts — we&apos;ve got your entire billing workflow covered.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6">
            <DocumentTypeCard 
              title="Invoices"
              description="Bill clients for completed work"
              icon={<FileText className="h-6 w-6" />}
            />
            <DocumentTypeCard 
              title="Quotes"
              description="Provide pricing before starting"
              icon={<ClipboardList className="h-6 w-6" />}
            />
            <DocumentTypeCard 
              title="Estimates"
              description="Give rough project pricing"
              icon={<FileCheck className="h-6 w-6" />}
            />
            <DocumentTypeCard 
              title="Receipts"
              description="Confirm payments received"
              icon={<Receipt className="h-6 w-6" />}
            />
            <DocumentTypeCard 
              title="Proforma"
              description="Request upfront payment"
              icon={<FileOutput className="h-6 w-6" />}
            />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="container mx-auto px-4 py-12 md:py-20">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-slate-900 mb-3 md:mb-4">
          Create Professional Documents in 3 Simple Steps
        </h2>
        <p className="text-base md:text-lg text-slate-600 text-center max-w-2xl mx-auto mb-8 md:mb-12">
          No signup required. Start creating immediately.
        </p>
        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          <StepCard 
            number="1"
            title="Choose Your Document"
            description="Select from invoices, quotes, estimates, receipts, or proforma invoices."
          />
          <StepCard 
            number="2"
            title="Customize & Brand"
            description="Add your logo, pick a template, customize colors and fonts to match your brand."
          />
          <StepCard 
            number="3"
            title="Download & Send"
            description="Generate a professional PDF instantly. Download and send to your client."
          />
        </div>
      </section>

      {/* Templates Preview */}
      <section className="bg-gradient-to-b from-slate-50 to-white py-12 md:py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-slate-900 mb-3 md:mb-4">
            Professional Templates for Every Style
          </h2>
          <p className="text-base md:text-lg text-slate-600 text-center max-w-2xl mx-auto mb-8 md:mb-12">
            Choose from 5 beautifully designed templates. Customize colors and fonts to make them yours.
          </p>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-8">
            <TemplatePreview name="Clean" gradient="from-blue-500 to-indigo-600" />
            <TemplatePreview name="Bold" gradient="from-slate-700 to-slate-900" />
            <TemplatePreview name="Minimal" gradient="from-gray-300 to-gray-400" />
            <TemplatePreview name="Professional" gradient="from-blue-600 to-cyan-500" />
            <TemplatePreview name="Creative" gradient="from-pink-500 to-orange-400" />
          </div>
          <div className="text-center">
            <Link href="/templates">
              <Button variant="outline" size="lg">
                View All Templates
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Product Preview */}
      <section className="container mx-auto px-4 py-12 md:py-20">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-slate-900 mb-3 md:mb-4">
          See It In Action
        </h2>
        <p className="text-base md:text-lg text-slate-600 text-center max-w-2xl mx-auto mb-8 md:mb-12">
          Our intuitive builder makes creating professional documents effortless.
        </p>
        
        {/* Mockup of the builder */}
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
            {/* Browser chrome */}
            <div className="bg-slate-100 px-4 py-3 border-b border-slate-200 flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <div className="flex-1 flex justify-center">
                <div className="bg-white rounded-md px-4 py-1 text-sm text-slate-500 border">
                  quickbill.com/create
                </div>
              </div>
            </div>
            
            {/* App mockup */}
            <div className="p-4 md:p-8 bg-slate-50">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Form side */}
                <div className="space-y-4">
                  <div className="bg-white rounded-xl p-4 border border-slate-200">
                    <div className="flex gap-2 mb-4">
                      <div className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded-md">Details</div>
                      <div className="px-3 py-1.5 bg-slate-100 text-slate-600 text-sm rounded-md">Items</div>
                      <div className="px-3 py-1.5 bg-slate-100 text-slate-600 text-sm rounded-md">Style</div>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <div className="text-xs text-slate-500 mb-1">Business Name</div>
                        <div className="h-9 bg-slate-100 rounded-md border" />
                      </div>
                      <div>
                        <div className="text-xs text-slate-500 mb-1">Client Name</div>
                        <div className="h-9 bg-slate-100 rounded-md border" />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <div className="text-xs text-slate-500 mb-1">Invoice #</div>
                          <div className="h-9 bg-slate-100 rounded-md border" />
                        </div>
                        <div>
                          <div className="text-xs text-slate-500 mb-1">Due Date</div>
                          <div className="h-9 bg-slate-100 rounded-md border" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Preview side */}
                <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
                  <div className="text-xs text-slate-400 mb-2">Live Preview</div>
                  <div className="border rounded-lg p-4 bg-white">
                    <div className="flex justify-between items-start mb-4">
                      <div className="w-16 h-4 bg-blue-600 rounded" />
                      <div className="text-right">
                        <div className="text-lg font-bold text-blue-600">INVOICE</div>
                        <div className="text-xs text-slate-400">#INV-2026-001</div>
                      </div>
                    </div>
                    <div className="mb-4">
                      <div className="text-xs text-blue-600 font-medium mb-1">BILL TO</div>
                      <div className="w-24 h-3 bg-slate-200 rounded mb-1" />
                      <div className="w-32 h-2 bg-slate-100 rounded" />
                    </div>
                    <div className="border-t pt-3">
                      <div className="flex text-xs text-slate-400 mb-2">
                        <div className="flex-1">Description</div>
                        <div className="w-16 text-right">Amount</div>
                      </div>
                      <div className="flex items-center py-2 border-b">
                        <div className="flex-1">
                          <div className="w-32 h-2 bg-slate-200 rounded" />
                        </div>
                        <div className="w-16 text-right text-sm font-medium">$500</div>
                      </div>
                      <div className="flex justify-end mt-3">
                        <div className="text-right">
                          <div className="text-xs text-slate-400">Total</div>
                          <div className="text-lg font-bold text-blue-600">$500.00</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-8">
          <Link href="/create">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              Try It Now — Free
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-12 md:py-20">
        <div className="bg-blue-600 rounded-2xl md:rounded-3xl p-8 md:p-12 text-center text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">
            Ready to Create Your First Invoice?
          </h2>
          <p className="text-blue-100 mb-6 md:mb-8 text-base md:text-lg">
            Join thousands of freelancers and small businesses who invoice smarter.
          </p>
          <Link href="/create">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 text-base md:text-lg px-6 md:px-8 py-4 md:py-6 h-auto">
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
    <div className="bg-white rounded-xl md:rounded-2xl p-5 md:p-8 border border-slate-200 hover:border-blue-200 hover:shadow-lg transition-all">
      <div className="w-10 h-10 md:w-14 md:h-14 bg-blue-50 rounded-lg md:rounded-xl flex items-center justify-center text-blue-600 mb-3 md:mb-4">
        {icon}
      </div>
      <h3 className="text-lg md:text-xl font-semibold text-slate-900 mb-1 md:mb-2">{title}</h3>
      <p className="text-sm md:text-base text-slate-600">{description}</p>
    </div>
  );
}

function DocumentTypeCard({ title, description, icon }: {
  title: string;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-xl p-5 md:p-6 border border-slate-200 hover:border-blue-200 hover:shadow-md transition-all text-center">
      <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mx-auto mb-3 text-blue-600">
        {icon}
      </div>
      <h3 className="font-semibold text-slate-900 mb-1">{title}</h3>
      <p className="text-sm text-slate-500">{description}</p>
    </div>
  );
}

function StepCard({ number, title, description }: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="text-center">
      <div className="w-12 h-12 md:w-16 md:h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl md:text-2xl font-bold mx-auto mb-4">
        {number}
      </div>
      <h3 className="text-lg md:text-xl font-semibold text-slate-900 mb-2">{title}</h3>
      <p className="text-sm md:text-base text-slate-600">{description}</p>
    </div>
  );
}

function TemplatePreview({ name, gradient }: {
  name: string;
  gradient: string;
}) {
  return (
    <div className="w-32 md:w-40">
      <div className={`h-24 md:h-32 rounded-lg bg-gradient-to-br ${gradient} p-2 md:p-3 mb-2`}>
        <div className="bg-white/90 rounded h-full p-2">
          <div className="w-6 h-1 bg-slate-300 rounded mb-2" />
          <div className="space-y-1">
            <div className="w-full h-1 bg-slate-200 rounded" />
            <div className="w-3/4 h-1 bg-slate-200 rounded" />
          </div>
        </div>
      </div>
      <p className="text-sm font-medium text-slate-700 text-center">{name}</p>
    </div>
  );
}

// Removed StatCard - no longer used
