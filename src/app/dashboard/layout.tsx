import Link from 'next/link';
import { LayoutDashboard, Settings, CreditCard, Plus, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DOCzippLogo } from '@/components/layout/Header';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="bg-background border-b">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <DOCzippLogo />
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/create">
              <Button size="sm" className="brand-gradient text-white hover:opacity-90">
                <Plus className="h-4 w-4 mr-2" />
                New Document
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <aside className="w-64 flex-shrink-0">
            <nav className="space-y-1">
              <NavLink href="/dashboard" icon={<LayoutDashboard className="h-5 w-5" />}>
                My Documents
              </NavLink>
              <NavLink href="/dashboard/settings" icon={<Settings className="h-5 w-5" />}>
                Account Settings
              </NavLink>
              <NavLink href="/dashboard/billing" icon={<CreditCard className="h-5 w-5" />}>
                Billing
              </NavLink>
              <hr className="my-4 border-border" />
              <form action="/api/auth/signout" method="POST">
                <button 
                  type="submit"
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
                >
                  <LogOut className="h-5 w-5" />
                  Sign Out
                </button>
              </form>
            </nav>
          </aside>

          {/* Main content */}
          <main className="flex-1 min-w-0">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}

function NavLink({ 
  href, 
  icon, 
  children 
}: { 
  href: string; 
  icon: React.ReactNode; 
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 px-4 py-2.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
    >
      {icon}
      <span>{children}</span>
    </Link>
  );
}
