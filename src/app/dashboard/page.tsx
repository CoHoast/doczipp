import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Plus, FileText, MoreHorizontal, Search } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

export const metadata = {
  title: 'Dashboard | DOCzipp',
  description: 'Manage your documents',
};

// This would be fetched from the database in a real app
const MOCK_DOCUMENTS = [
  {
    id: '1',
    type: 'invoice',
    number: 'INV-2026-001',
    clientName: 'Acme Corp',
    total: 2500,
    status: 'paid',
    createdAt: '2026-02-01',
  },
  {
    id: '2',
    type: 'quote',
    number: 'QUO-2026-001',
    clientName: 'TechStart Inc',
    total: 5000,
    status: 'sent',
    createdAt: '2026-02-03',
  },
  {
    id: '3',
    type: 'invoice',
    number: 'INV-2026-002',
    clientName: 'Design Studio',
    total: 1200,
    status: 'draft',
    createdAt: '2026-02-05',
  },
];

export default function DashboardPage() {
  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">My Documents</h1>
          <p className="text-slate-600">Manage and track all your documents</p>
        </div>
        <Link href="/create">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            New Document
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input placeholder="Search documents..." className="pl-10" />
        </div>
        <select className="px-4 py-2 border border-slate-200 rounded-lg bg-white text-slate-600">
          <option value="">All Types</option>
          <option value="invoice">Invoices</option>
          <option value="quote">Quotes</option>
          <option value="estimate">Estimates</option>
          <option value="receipt">Receipts</option>
          <option value="proforma">Proforma</option>
        </select>
        <select className="px-4 py-2 border border-slate-200 rounded-lg bg-white text-slate-600">
          <option value="">All Status</option>
          <option value="draft">Draft</option>
          <option value="sent">Sent</option>
          <option value="paid">Paid</option>
          <option value="overdue">Overdue</option>
        </select>
      </div>

      {/* Documents Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              <th className="text-left px-6 py-4 text-sm font-medium text-slate-600">Document</th>
              <th className="text-left px-6 py-4 text-sm font-medium text-slate-600">Client</th>
              <th className="text-left px-6 py-4 text-sm font-medium text-slate-600">Amount</th>
              <th className="text-left px-6 py-4 text-sm font-medium text-slate-600">Status</th>
              <th className="text-left px-6 py-4 text-sm font-medium text-slate-600">Date</th>
              <th className="text-right px-6 py-4 text-sm font-medium text-slate-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_DOCUMENTS.map((doc) => (
              <tr key={doc.id} className="border-b border-slate-100 hover:bg-slate-50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                      <FileText className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-medium text-slate-900">{doc.number}</div>
                      <div className="text-sm text-slate-500 capitalize">{doc.type}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-slate-700">{doc.clientName}</td>
                <td className="px-6 py-4 font-medium text-slate-900">
                  ${doc.total.toLocaleString()}
                </td>
                <td className="px-6 py-4">
                  <StatusBadge status={doc.status} />
                </td>
                <td className="px-6 py-4 text-slate-600">{doc.createdAt}</td>
                <td className="px-6 py-4 text-right">
                  <button className="p-2 hover:bg-slate-100 rounded-lg">
                    <MoreHorizontal className="h-5 w-5 text-slate-400" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Empty state (show when no documents) */}
      {MOCK_DOCUMENTS.length === 0 && (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText className="h-8 w-8 text-slate-400" />
          </div>
          <h3 className="text-lg font-medium text-slate-900 mb-2">No documents yet</h3>
          <p className="text-slate-600 mb-6">Create your first document to get started</p>
          <Link href="/create">
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Create Document
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    draft: 'bg-slate-100 text-slate-700',
    sent: 'bg-blue-100 text-blue-700',
    paid: 'bg-green-100 text-green-700',
    overdue: 'bg-red-100 text-red-700',
    partial: 'bg-yellow-100 text-yellow-700',
  };

  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize ${styles[status] || styles.draft}`}>
      {status}
    </span>
  );
}
