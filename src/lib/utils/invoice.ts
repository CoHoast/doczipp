// Invoice utility functions

import { LineItem, Invoice, DocumentType } from '@/lib/types/invoice';
import { CURRENCIES, DEFAULT_INVOICE_SETTINGS } from '@/lib/constants';

export function generateId(): string {
  return Math.random().toString(36).substring(2, 15);
}

export function generateInvoiceNumber(type: DocumentType, sequence: number = 1): string {
  const year = new Date().getFullYear();
  const prefixes: Record<DocumentType, string> = {
    'invoice': 'INV',
    'quote': 'QUO',
    'estimate': 'EST',
    'receipt': 'REC',
    'proforma': 'PRO',
    'purchase-order': 'PO',
    'credit-note': 'CN',
    'timesheet': 'TS',
  };
  const prefix = prefixes[type] || 'DOC';
  return `${prefix}-${year}-${sequence.toString().padStart(3, '0')}`;
}

export function createEmptyLineItem(): LineItem {
  return {
    id: generateId(),
    description: '',
    quantity: 1,
    rate: 0,
    amount: 0,
  };
}

export function calculateLineItemAmount(item: LineItem): number {
  let amount = item.quantity * item.rate;
  
  // Apply discount
  if (item.discount && item.discount > 0) {
    if (item.discountType === 'percentage') {
      amount = amount * (1 - item.discount / 100);
    } else {
      amount = amount - item.discount;
    }
  }
  
  return Math.max(0, amount);
}

export function calculateTotals(lineItems: LineItem[]): {
  subtotal: number;
  taxTotal: number;
  discountTotal: number;
  total: number;
} {
  let subtotal = 0;
  let taxTotal = 0;
  let discountTotal = 0;

  lineItems.forEach(item => {
    const baseAmount = item.quantity * item.rate;
    subtotal += baseAmount;
    
    // Calculate discount
    if (item.discount && item.discount > 0) {
      if (item.discountType === 'percentage') {
        discountTotal += baseAmount * (item.discount / 100);
      } else {
        discountTotal += item.discount;
      }
    }
    
    // Calculate tax on post-discount amount
    const afterDiscount = calculateLineItemAmount(item);
    if (item.taxRate && item.taxRate > 0) {
      taxTotal += afterDiscount * (item.taxRate / 100);
    }
  });

  const total = subtotal - discountTotal + taxTotal;
  
  return {
    subtotal,
    taxTotal,
    discountTotal,
    total: Math.max(0, total),
  };
}

export function formatCurrency(amount: number, currencyCode: string = 'USD'): string {
  const currency = CURRENCIES.find(c => c.code === currencyCode) || CURRENCIES[0];
  
  // Special handling for JPY (no decimals)
  const decimals = currencyCode === 'JPY' ? 0 : 2;
  
  const formatted = amount.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
  
  return `${currency.symbol}${formatted}`;
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function createEmptyInvoice(type: DocumentType = 'invoice'): Partial<Invoice> {
  const now = new Date().toISOString();
  const dueDate = new Date();
  dueDate.setDate(dueDate.getDate() + 30);
  
  return {
    type,
    number: generateInvoiceNumber(type),
    from: {
      name: '',
      address: '',
      city: '',
      state: '',
      zip: '',
      country: '',
      email: '',
    },
    to: {
      id: generateId(),
      name: '',
      email: '',
    },
    issueDate: now.split('T')[0],
    dueDate: type !== 'receipt' ? dueDate.toISOString().split('T')[0] : undefined,
    lineItems: [createEmptyLineItem()],
    subtotal: 0,
    taxTotal: 0,
    discountTotal: 0,
    total: 0,
    customFields: [],
    settings: { ...DEFAULT_INVOICE_SETTINGS },
    status: 'draft',
  };
}
