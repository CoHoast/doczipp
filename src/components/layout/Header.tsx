"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { 
  Menu, 
  ChevronDown, 
  FileText, 
  Receipt, 
  ClipboardList, 
  FileCheck, 
  FileOutput,
  Sparkles,
  Crown,
  X
} from "lucide-react";
import { useState } from "react";

const documentTypes = [
  { name: "Invoice", href: "/create?type=invoice", icon: FileText, description: "Bill for completed work" },
  { name: "Quote", href: "/create?type=quote", icon: ClipboardList, description: "Provide pricing upfront" },
  { name: "Estimate", href: "/create?type=estimate", icon: FileCheck, description: "Rough project pricing" },
  { name: "Receipt", href: "/create?type=receipt", icon: Receipt, description: "Confirm payment received" },
  { name: "Proforma", href: "/create?type=proforma", icon: FileOutput, description: "Request advance payment" },
  { name: "Purchase Order", href: "/create?type=purchase-order", icon: ClipboardList, description: "Order from suppliers" },
  { name: "Credit Note", href: "/create?type=credit-note", icon: FileOutput, description: "Issue refunds or credits" },
  { name: "Timesheet", href: "/create?type=timesheet", icon: FileCheck, description: "Track billable hours" },
];

const features = [
  { name: "Templates", href: "/templates", description: "5 professional designs" },
  { name: "AI Assistant", href: "/create", description: "Smart suggestions", ai: true },
  { name: "Custom Branding", href: "/create", description: "Your logo & colors" },
];

// DOCZipp Logo - Lightning bolt (matches other ZIPP sites)
function DocZippIcon({ className = "", id = "doczipp" }: { className?: string; id?: string }) {
  return (
    <svg 
      viewBox="0 0 24 32" 
      className={className}
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={`${id}-gradient`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4F46E5" />
          <stop offset="50%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#0EA5E9" />
        </linearGradient>
      </defs>
      {/* Lightning bolt */}
      <path 
        d="M5 2H20L11 14H19L4 30L9 16H2L5 2Z" 
        fill={`url(#${id}-gradient)`}
      />
    </svg>
  );
}

function DOCZippLogo({ size = "default" }: { size?: "default" | "large" }) {
  const isLarge = size === "large";
  return (
    <div className="flex items-center gap-1">
      <DocZippIcon 
        className={`${isLarge ? 'w-7 h-9' : 'w-6 h-8'}`} 
        id={isLarge ? "header-doc" : "doc"}
      />
      <span className={`font-bold tracking-tight ${isLarge ? 'text-2xl' : 'text-xl'}`}>
        <span className="text-foreground">DOC</span>
        <span className="brand-gradient-text font-extrabold">Zipp</span>
      </span>
    </div>
  );
}

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <DOCZippLogo size="large" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {/* Documents Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-1">
                  Documents
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                {documentTypes.map((doc) => (
                  <DropdownMenuItem key={doc.href} asChild>
                    <Link href={doc.href} className="flex items-center gap-3 cursor-pointer">
                      <doc.icon className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="font-medium">{doc.name}</div>
                        <div className="text-xs text-muted-foreground">{doc.description}</div>
                      </div>
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Features Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-1">
                  Features
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                {features.map((feature) => (
                  <DropdownMenuItem key={feature.name} asChild>
                    <Link href={feature.href} className="flex items-center gap-3 cursor-pointer">
                      {feature.ai ? (
                        <Sparkles className="h-4 w-4 text-purple-500" />
                      ) : (
                        <Crown className="h-4 w-4 text-amber-500" />
                      )}
                      <div>
                        <div className="font-medium flex items-center gap-2">
                          {feature.name}
                          {feature.ai && <Sparkles className="h-3 w-3 text-purple-500" />}
                        </div>
                        <div className="text-xs text-muted-foreground">{feature.description}</div>
                      </div>
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Link href="/templates">
              <Button variant="ghost">Templates</Button>
            </Link>

            <Link href="/pricing">
              <Button variant="ghost">Pricing</Button>
            </Link>
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center gap-2">
              <Link href="/login">
                <Button variant="ghost">Log in</Button>
              </Link>
              <Link href="/create">
                <Button className="brand-gradient text-white hover:opacity-90">
                  Create Document
                </Button>
              </Link>
            </div>

            {/* Mobile CTA */}
            <Link href="/create" className="md:hidden">
              <Button size="sm" className="brand-gradient text-white text-xs px-3 py-1 h-7">
                Try Free
              </Button>
            </Link>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden h-10 w-10"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t max-h-[80vh] overflow-y-auto">
            <nav className="flex flex-col gap-1">
              {/* Documents Section */}
              <button
                onClick={() => setMobileSection(mobileSection === 'docs' ? null : 'docs')}
                className="w-full flex items-center justify-between px-2 py-3 rounded-lg hover:bg-muted"
              >
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-primary" />
                  <span className="font-semibold text-sm">Documents</span>
                  <span className="text-xs text-muted-foreground">({documentTypes.length})</span>
                </div>
                <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${mobileSection === 'docs' ? 'rotate-180' : ''}`} />
              </button>
              {mobileSection === 'docs' && (
                <div className="pl-4 space-y-1 pb-2">
                  {documentTypes.map((doc) => (
                    <Link
                      key={doc.href}
                      href={doc.href}
                      className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-muted"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <doc.icon className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{doc.name}</span>
                    </Link>
                  ))}
                </div>
              )}

              {/* Features Section */}
              <button
                onClick={() => setMobileSection(mobileSection === 'features' ? null : 'features')}
                className="w-full flex items-center justify-between px-2 py-3 rounded-lg hover:bg-muted"
              >
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-purple-500" />
                  <span className="font-semibold text-sm">Features</span>
                  <span className="text-xs text-muted-foreground">({features.length})</span>
                </div>
                <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${mobileSection === 'features' ? 'rotate-180' : ''}`} />
              </button>
              {mobileSection === 'features' && (
                <div className="pl-4 space-y-1 pb-2">
                  {features.map((feature) => (
                    <Link
                      key={feature.name}
                      href={feature.href}
                      className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-muted"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {feature.ai ? (
                        <Sparkles className="h-4 w-4 text-purple-500" />
                      ) : (
                        <Crown className="h-4 w-4 text-amber-500" />
                      )}
                      <span className="text-sm">{feature.name}</span>
                    </Link>
                  ))}
                </div>
              )}

              <div className="border-t my-3" />
              
              <Link
                href="/templates"
                className="flex items-center gap-3 px-2 py-3 rounded-lg hover:bg-muted"
                onClick={() => setMobileMenuOpen(false)}
              >
                <FileCheck className="h-4 w-4 text-primary" />
                <span className="font-medium text-sm">Templates</span>
              </Link>
              <Link
                href="/pricing"
                className="flex items-center gap-3 px-2 py-3 rounded-lg hover:bg-muted"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Crown className="h-4 w-4 text-amber-500" />
                <span className="font-medium text-sm">Pricing</span>
              </Link>
              
              <div className="flex gap-2 mt-4 px-2">
                <Link href="/login" className="flex-1">
                  <Button variant="outline" className="w-full">Log in</Button>
                </Link>
                <Link href="/create" className="flex-1">
                  <Button className="w-full brand-gradient text-white">Create</Button>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

export { DOCZippLogo, DocZippIcon };
