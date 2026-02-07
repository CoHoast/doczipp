import { InvoiceBuilder } from '@/components/invoice';

export const metadata = {
  title: 'Create Invoice | QuickBill',
  description: 'Create professional invoices in seconds',
};

export default function CreatePage() {
  return <InvoiceBuilder />;
}
