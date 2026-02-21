import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, ArrowRight, Check, Palette } from 'lucide-react';

export const metadata = {
  title: 'Templates | DOCZipp',
  description: 'Choose from 5 professional templates for invoices, quotes, estimates, receipts and more.',
};

const TEMPLATES = [
  {
    id: 'clean',
    name: 'Clean',
    description: 'Minimal and modern design with clean lines. Perfect for tech and creative professionals.',
    gradient: 'from-purple-500 to-pink-500',
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
    gradient: 'from-gray-300 to-gray-500',
    features: ['Ultra simple', 'Elegant styling', 'Focus on content'],
  },
  {
    id: 'professional',
    name: 'Professional',
    description: 'Traditional business style trusted by enterprises worldwide.',
    gradient: 'from-pink-500 to-orange-500',
    features: ['Traditional layout', 'Business-focused', 'Trusted design'],
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Colorful and unique design for creative agencies and freelancers.',
    gradient: 'from-purple-600 via-pink-500 to-orange-400',
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
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 brand-gradient opacity-5" />
        <div className="container mx-auto px-4 py-16 md:py-20 text-center relative">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
            <Palette className="h-3 w-3 mr-1" />
            5 Templates
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Professional <span className="brand-gradient-text">Templates</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose from 5 beautifully designed templates. Customize colors and fonts to match your brand.
          </p>
        </div>
      </section>

      {/* Templates Grid */}
      <section className="container mx-auto px-4 pb-16 md:pb-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {TEMPLATES.map((template) => (
            <div 
              key={template.id}
              className="tool-card bg-card rounded-xl md:rounded-2xl border overflow-hidden"
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
                <h3 className="text-lg md:text-xl font-semibold mb-2">{template.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{template.description}</p>
                <ul className="space-y-1 mb-4">
                  {template.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Check className="h-4 w-4 text-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link href={`/create?template=${template.id}`}>
                  <Button className="w-full brand-gradient text-white hover:opacity-90">
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
      <section className="bg-muted/30 py-16 md:py-20 border-t">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Create Any Document You Need
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Every template works with all document types. Switch between them instantly.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6">
            {DOCUMENT_TYPES.map((docType) => (
              <Link 
                key={docType.id}
                href={`/create?type=${docType.id}`}
              >
                <div className="tool-card bg-card rounded-xl p-5 md:p-6 border text-center cursor-pointer">
                  <div className="w-12 h-12 brand-gradient rounded-xl flex items-center justify-center mx-auto mb-3">
                    <FileText className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-semibold mb-1">{docType.name}</h3>
                  <p className="text-sm text-muted-foreground">{docType.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-16 md:py-20">
        <div className="relative rounded-3xl overflow-hidden brand-gradient p-8 md:p-16 text-center text-white">
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Create Your First Document?
            </h2>
            <p className="text-xl opacity-90 mb-8">
              Pick a template and start creating in seconds. No signup required.
            </p>
            <Link href="/create">
              <Button size="lg" variant="secondary" className="text-lg px-8">
                Get Started — It's Free
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
