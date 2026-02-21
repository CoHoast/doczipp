import Link from "next/link";
import { Separator } from "@/components/ui/separator";

// DOCZipp Logo Icon - Lightning bolt (matches other ZIPP sites)
function DocZippIcon({ className = "", id = "footer-doc" }: { className?: string; id?: string }) {
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
      <path 
        d="M5 2H20L11 14H19L4 30L9 16H2L5 2Z" 
        fill={`url(#${id}-gradient)`}
      />
    </svg>
  );
}

const footerLinks = {
  documents: [
    { name: "Invoice", href: "/create?type=invoice" },
    { name: "Quote", href: "/create?type=quote" },
    { name: "Estimate", href: "/create?type=estimate" },
    { name: "Receipt", href: "/create?type=receipt" },
    { name: "Proforma", href: "/create?type=proforma" },
  ],
  resources: [
    { name: "Templates", href: "/templates" },
    { name: "Pricing", href: "/pricing" },
  ],
  legal: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Contact", href: "/contact" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-1 mb-4">
              <DocZippIcon className="w-6 h-8" />
              <span className="font-bold text-xl tracking-tight">
                <span>DOC</span>
                <span className="brand-gradient-text font-extrabold">Zipp</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Create professional invoices, quotes, and receipts in seconds. Get paid faster.
            </p>
          </div>

          {/* Documents */}
          <div>
            <h3 className="font-semibold mb-3">Documents</h3>
            <ul className="space-y-2">
              {footerLinks.documents.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold mb-3">Resources</h3>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-3">Legal</h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} DOCZipp. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            A{" "}
            <Link href="https://bluprynt.com" className="text-primary hover:underline">
              BLUPRYNT
            </Link>
            {" "}product. Sister site of{" "}
            <Link href="https://pixzipp.com" className="text-primary hover:underline">
              PixZipp
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
