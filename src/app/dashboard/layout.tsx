import Link from 'next/link';
import { FileText, LayoutDashboard, Settings, CreditCard, Plus, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <FileText className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-900">QuickBill</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/create">
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
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
              <hr className="my-4" />
              <form action="/api/auth/signout" method="POST">
                <button 
                  type="submit"
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
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
      className="flex items-center gap-3 px-4 py-2.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
    >
      {icon}
      <span>{children}</span>
    </Link>
  );
}
