import { InvoiceBuilder } from '@/components/invoice';

export const metadata = {
  title: 'Create Document | QuickBill',
  description: 'Create professional invoices, quotes, estimates, receipts and more in seconds',
};

export default function CreatePage() {
  return <InvoiceBuilder />;
}
