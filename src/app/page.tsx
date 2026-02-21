"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  FileText, 
  Zap, 
  Download, 
  Palette, 
  Shield, 
  Sparkles, 
  ArrowRight, 
  Receipt, 
  FileCheck, 
  ClipboardList, 
  FileOutput,
  Check,
  Upload,
  Wand2,
  Clock,
  CreditCard
} from 'lucide-react';

const documentTypes = [
  {
    name: "Invoice",
    description: "Bill clients for completed work",
    href: "/create?type=invoice",
    icon: FileText,
  },
  {
    name: "Quote",
    description: "Provide pricing before starting",
    href: "/create?type=quote",
    icon: ClipboardList,
  },
  {
    name: "Estimate",
    description: "Give rough project pricing",
    href: "/create?type=estimate",
    icon: FileCheck,
  },
  {
    name: "Receipt",
    description: "Confirm payments received",
    href: "/create?type=receipt",
    icon: Receipt,
  },
  {
    name: "Proforma",
    description: "Request upfront payment",
    href: "/create?type=proforma",
    icon: FileOutput,
  },
];

const features = [
  {
    name: "5 Templates",
    description: "Professional designs to match your brand",
    icon: Palette,
  },
  {
    name: "AI Assistant",
    description: "Smart line items & descriptions",
    icon: Sparkles,
    isAI: true,
  },
  {
    name: "Logo Upload",
    description: "Drag & drop your company logo",
    icon: Upload,
  },
  {
    name: "Custom Branding",
    description: "Your colors, fonts, and style",
    icon: Wand2,
  },
  {
    name: "Instant PDF",
    description: "Download in one click",
    icon: Download,
  },
  {
    name: "No Signup",
    description: "Start creating immediately",
    icon: Zap,
  },
];

const stats = [
  { value: "5", label: "Document Types" },
  { value: "5", label: "Pro Templates" },
  { value: "<60s", label: "Creation Time" },
  { value: "∞", label: "Customizations" },
];

function DocumentCard({ name, description, href, icon: Icon }: {
  name: string;
  description: string;
  href: string;
  icon: React.ElementType;
}) {
  return (
    <Link href={href}>
      <div className="tool-card bg-card rounded-xl p-3 sm:p-6 border hover:border-primary/50 cursor-pointer h-full">
        <div className="tool-icon w-10 h-10 sm:w-12 sm:h-12 brand-gradient rounded-lg flex items-center justify-center mb-2 sm:mb-4 transition-transform">
          <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
        </div>
        <h3 className="font-semibold text-sm sm:text-lg mb-0.5 sm:mb-1">{name}</h3>
        <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2">{description}</p>
      </div>
    </Link>
  );
}

function FeatureCard({ name, description, icon: Icon, isAI }: {
  name: string;
  description: string;
  icon: React.ElementType;
  isAI?: boolean;
}) {
  return (
    <div className="flex gap-4 items-start">
      <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${isAI ? 'bg-purple-100 text-purple-600' : 'brand-gradient text-white'}`}>
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <h3 className="font-semibold mb-1 flex items-center gap-2">
          {name}
          {isAI && <Sparkles className="h-3 w-3 text-purple-500" />}
        </h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 brand-gradient opacity-5" />
        <div className="container mx-auto px-4 pt-20 pb-16 md:pt-28 md:pb-24 relative">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <Badge className="bg-primary/10 text-primary border-primary/20 px-4 py-1.5">
                <Sparkles className="h-3.5 w-3.5 mr-1.5" />
                AI-Powered Document Generation
              </Badge>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Create documents.{" "}
              <span className="brand-gradient-text">Instantly.</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              The fastest way to create professional invoices, quotes, estimates, and receipts. 
              No signup required — just create, download, and get paid.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/create">
                <Button size="lg" className="brand-gradient text-white hover:opacity-90 text-lg px-8">
                  Start Creating — It's Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/templates">
                <Button size="lg" variant="outline" className="text-lg px-8">
                  View Templates
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y bg-muted/30">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-bold brand-gradient-text">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Document Types Grid */}
      <section id="documents" className="container mx-auto px-4 py-8 sm:py-16">
        <div className="text-center mb-6 sm:mb-12">
          <h2 className="text-xl sm:text-3xl font-bold mb-2 sm:mb-4">Create Any Document</h2>
          <p className="text-sm sm:text-base text-muted-foreground">
            Choose your document type and start creating in seconds.
          </p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 sm:gap-6">
          {documentTypes.map((doc) => (
            <DocumentCard key={doc.href} {...doc} />
          ))}
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-8 sm:py-16 border-t">
        <div className="text-center mb-6 sm:mb-12">
          <Badge className="mb-3 sm:mb-4 bg-amber-500/10 text-amber-600 border-amber-500/20">
            Features
          </Badge>
          <h2 className="text-xl sm:text-3xl font-bold mb-2 sm:mb-4">Everything You Need</h2>
          <p className="text-sm sm:text-base text-muted-foreground">
            Professional tools to create documents that get you paid faster.
          </p>
        </div>
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8">
          {features.map((feature) => (
            <FeatureCard key={feature.name} {...feature} />
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="container mx-auto px-4 py-8 sm:py-16 border-t">
        <div className="text-center mb-6 sm:mb-12">
          <h2 className="text-xl sm:text-3xl font-bold mb-2 sm:mb-4">Create in 3 Simple Steps</h2>
          <p className="text-sm sm:text-base text-muted-foreground">
            No signup required. Start creating immediately.
          </p>
        </div>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {[
            {
              step: "1",
              title: "Choose Document Type",
              description: "Select from invoices, quotes, estimates, receipts, or proforma.",
              icon: FileText,
            },
            {
              step: "2",
              title: "Customize & Brand",
              description: "Add your logo, pick a template, customize colors and fonts.",
              icon: Palette,
            },
            {
              step: "3",
              title: "Download & Send",
              description: "Generate a professional PDF and send it to your client.",
              icon: Download,
            },
          ].map((item) => (
            <div key={item.step} className="text-center">
              <div className="w-16 h-16 brand-gradient rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                {item.step}
              </div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-16">
        <div className="relative rounded-3xl overflow-hidden brand-gradient p-8 md:p-16 text-center text-white">
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to create your first document?
            </h2>
            <p className="text-xl opacity-90 mb-8">
              Join thousands of freelancers and businesses who create smarter.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/create">
                <Button size="lg" variant="secondary" className="text-lg px-8">
                  Get Started Free
                </Button>
              </Link>
              <Link href="/pricing">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 bg-transparent border-white text-white hover:bg-white/10"
                >
                  View Pro Plans
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-3xl" />
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="container mx-auto px-4 py-16 border-t">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why choose DOCzipp?
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "Lightning Fast",
                description: "Create a complete document in under 60 seconds. No learning curve.",
              },
              {
                title: "No Account Required",
                description: "Start creating immediately. Sign up only if you want to save documents.",
              },
              {
                title: "AI-Powered",
                description: "Smart line item suggestions and professional description expansion.",
              },
              {
                title: "Beautiful Templates",
                description: "5 professional designs with customizable colors and fonts.",
              },
              {
                title: "Privacy First",
                description: "Your documents stay private. We never sell your data.",
              },
              {
                title: "Works Everywhere",
                description: "Use on any device — desktop, tablet, or mobile. No app required.",
              },
            ].map((feature) => (
              <div key={feature.title} className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full brand-gradient flex items-center justify-center">
                  <Check className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
