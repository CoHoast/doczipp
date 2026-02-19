import Link from "next/link";
import { Separator } from "@/components/ui/separator";

// DOCzipp Logo Icon
function DocZippIcon({ className = "", id = "footer-doc" }: { className?: string; id?: string }) {
  return (
    <svg 
      viewBox="0 0 28 32" 
      className={className}
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={`${id}-gradient`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="50%" stopColor="#6366F1" />
          <stop offset="100%" stopColor="#8B5CF6" />
        </linearGradient>
      </defs>
      <path 
        d="M4 4C4 2.89543 4.89543 2 6 2H16L24 10V28C24 29.1046 23.1046 30 22 30H6C4.89543 30 4 29.1046 4 28V4Z" 
        fill={`url(#${id}-gradient)`}
        opacity="0.9"
      />
      <path 
        d="M16 2V8C16 9.10457 16.8954 10 18 10H24L16 2Z" 
        fill="white"
        opacity="0.3"
      />
      <path 
        d="M10 12H17L13 18H17L9 26L11 19H8L10 12Z" 
        fill="white"
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
              <DocZippIcon className="w-7 h-8" />
              <div className="font-bold text-xl tracking-tight">
                <span>DOC</span>
                <span className="brand-gradient-text font-extrabold">zipp</span>
              </div>
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
            © {new Date().getFullYear()} DOCzipp. All rights reserved.
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
