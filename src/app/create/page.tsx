import { Suspense } from 'react';
import { InvoiceBuilder } from '@/components/invoice';

export const metadata = {
  title: 'Create Document | DOCZipp',
  description: 'Create professional invoices, quotes, estimates, receipts and more in seconds',
};

function InvoiceBuilderFallback() {
  return (
    <div className="min-h-screen bg-muted/30 flex items-center justify-center">
      <div className="animate-pulse text-muted-foreground">Loading document builder...</div>
    </div>
  );
}

export default function CreatePage() {
  return (
    <Suspense fallback={<InvoiceBuilderFallback />}>
      <InvoiceBuilder />
    </Suspense>
  );
}
