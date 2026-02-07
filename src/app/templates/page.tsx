import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FileText, ArrowRight, Check } from 'lucide-react';
import { MobileMenu } from '@/components/layout/MobileMenu';

export const metadata = {
  title: 'Templates | QuickBill',
  description: 'Choose from 5 professional templates for invoices, quotes, estimates, receipts and more.',
};

const TEMPLATES = [
  {
    id: 'clean',
    name: 'Clean',
    description: 'Minimal and modern design with clean lines. Perfect for tech and creative professionals.',
    gradient: 'from-blue-500 to-indigo-600',
    features: ['Minimal design', 'Modern typography', 'Lots of whitespace'],
  },
  {
    id: 'bold',
    name: 'Bold',
    description: 'Strong headers with high contrast. Great for making a statement.',
    gradient: 'from-slate-700 to-slate-900',
    features: ['High contrast', 'Strong headers', 'Professional feel'],
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Simple and elegant with maximum whitespace. Less is more.',
    gradient: 'from-gray-200 to-gray-400',
    features: ['Ultra simple', 'Elegant styling', 'Focus on content'],
  },
  {
    id: 'professional',
    name: 'Professional',
    description: 'Traditional business style trusted by enterprises worldwide.',
    gradient: 'from-blue-600 to-cyan-500',
    features: ['Traditional layout', 'Business-focused', 'Trusted design'],
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Colorful and unique design for creative agencies and freelancers.',
    gradient: 'from-pink-500 to-orange-400',
    features: ['Colorful accents', 'Unique styling', 'Stand out'],
  },
];

const DOCUMENT_TYPES = [
  { id: 'invoice', name: 'Invoice', description: 'Bill clients for completed work' },
  { id: 'quote', name: 'Quote', description: 'Provide pricing before starting work' },
  { id: 'estimate', name: 'Estimate', description: 'Give rough pricing estimates' },
  { id: 'receipt', name: 'Receipt', description: 'Confirm payment received' },
  { id: 'proforma', name: 'Proforma Invoice', description: 'Request payment before delivery' },
];

export default function TemplatesPage() {
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
            <Link href="/pricing" className="text-slate-600 hover:text-slate-900">
              Pricing
            </Link>
            <Link href="/templates" className="text-blue-600 font-medium">
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
          Professional Templates
        </h1>
        <p className="text-base md:text-xl text-slate-600 max-w-2xl mx-auto">
          Choose from 5 beautifully designed templates. Customize colors and fonts to match your brand.
        </p>
      </section>

      {/* Templates Grid */}
      <section className="container mx-auto px-4 pb-12 md:pb-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {TEMPLATES.map((template) => (
            <div 
              key={template.id}
              className="bg-white rounded-xl md:rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow"
            >
              {/* Preview */}
              <div className={`h-40 md:h-48 bg-gradient-to-br ${template.gradient} p-4 md:p-6`}>
                <div className="bg-white/90 rounded-lg h-full p-3 md:p-4 shadow-sm">
                  <div className="flex justify-between items-start mb-3">
                    <div className="w-12 md:w-16 h-2 bg-slate-300 rounded" />
                    <div className="text-[8px] md:text-[10px] font-bold text-slate-400">INVOICE</div>
                  </div>
                  <div className="space-y-1.5">
                    <div className="w-full h-1.5 bg-slate-200 rounded" />
                    <div className="w-3/4 h-1.5 bg-slate-200 rounded" />
                    <div className="w-1/2 h-1.5 bg-slate-200 rounded" />
                  </div>
                  <div className="mt-4 flex justify-end">
                    <div className="w-16 md:w-20 h-4 md:h-5 bg-slate-300 rounded" />
                  </div>
                </div>
              </div>
              
              {/* Info */}
              <div className="p-4 md:p-6">
                <h3 className="text-lg md:text-xl font-semibold text-slate-900 mb-2">{template.name}</h3>
                <p className="text-sm text-slate-600 mb-4">{template.description}</p>
                <ul className="space-y-1 mb-4">
                  {template.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-slate-600">
                      <Check className="h-4 w-4 text-green-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link href={`/create?template=${template.id}`}>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    Use Template
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Document Types Section */}
      <section className="bg-slate-50 py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
              Create Any Document You Need
            </h2>
            <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto">
              Every template works with all document types. Switch between them instantly.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6">
            {DOCUMENT_TYPES.map((docType) => (
              <Link 
                key={docType.id}
                href={`/create?type=${docType.id}`}
                className="bg-white rounded-xl p-5 md:p-6 border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all text-center"
              >
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <FileText className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-1">{docType.name}</h3>
                <p className="text-sm text-slate-500">{docType.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-12 md:py-20">
        <div className="bg-blue-600 rounded-2xl md:rounded-3xl p-8 md:p-12 text-center text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">
            Ready to Create Your First Document?
          </h2>
          <p className="text-blue-100 mb-6 md:mb-8 text-base md:text-lg">
            Pick a template and start creating in seconds. No signup required.
          </p>
          <Link href="/create">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 text-base md:text-lg px-6 md:px-8 py-4 md:py-6 h-auto">
              Get Started — It&apos;s Free
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
