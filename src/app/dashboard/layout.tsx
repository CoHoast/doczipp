import Link from 'next/link';
import { LayoutDashboard, Settings, CreditCard, Plus, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DOCZippLogo } from '@/components/layout/Header';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-muted/30 pb-20 md:pb-0">
      {/* Header */}
      <header className="bg-background border-b sticky top-0 z-40">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <DOCZippLogo />
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/create">
              <Button size="sm" className="brand-gradient text-white hover:opacity-90">
                <Plus className="h-4 w-4 sm:mr-2" />
                <span className="hidden sm:inline">New Document</span>
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-4 md:py-8">
        <div className="flex gap-8">
          {/* Sidebar - Hidden on mobile */}
          <aside className="hidden md:block w-64 flex-shrink-0">
            <nav className="space-y-1 sticky top-20">
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

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-background border-t z-50">
        <div className="flex justify-around py-2">
          <MobileNavLink href="/dashboard" icon={<LayoutDashboard className="h-5 w-5" />} label="Docs" />
          <MobileNavLink href="/create" icon={<Plus className="h-5 w-5" />} label="Create" isAction />
          <MobileNavLink href="/dashboard/settings" icon={<Settings className="h-5 w-5" />} label="Settings" />
          <MobileNavLink href="/dashboard/billing" icon={<CreditCard className="h-5 w-5" />} label="Billing" />
        </div>
      </nav>
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

function MobileNavLink({ 
  href, 
  icon, 
  label,
  isAction = false
}: { 
  href: string; 
  icon: React.ReactNode; 
  label: string;
  isAction?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`flex flex-col items-center gap-1 px-4 py-1 ${
        isAction 
          ? 'text-primary' 
          : 'text-muted-foreground hover:text-foreground'
      } transition-colors`}
    >
      <div className={isAction ? 'brand-gradient rounded-full p-2 text-white' : ''}>
        {icon}
      </div>
      <span className="text-xs">{label}</span>
    </Link>
  );
}
