// Core Invoice Types

export type DocumentType = 'invoice' | 'quote' | 'receipt' | 'estimate' | 'proforma' | 'purchase-order' | 'credit-note' | 'timesheet';

export interface LineItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
  amount: number; // quantity * rate
  taxRate?: number; // percentage
  discount?: number; // percentage or flat
  discountType?: 'percentage' | 'flat';
}

export interface CustomField {
  id: string;
  label: string;
  value: string;
}

export interface BusinessInfo {
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  email: string;
  phone?: string;
  website?: string;
  taxId?: string;
  logo?: string; // base64 or URL
}

export interface Client {
  id: string;
  name: string;
  email: string;
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
  phone?: string;
}

export interface InvoiceSettings {
  currency: string;
  template: string;
  primaryColor: string;
  accentColor: string;
  font: string;
}

export interface Invoice {
  id: string;
  type: DocumentType;
  number: string; // e.g., "INV-2026-001"
  
  // Parties
  from: BusinessInfo;
  to: Client;
  
  // Details
  issueDate: string; // ISO date
  dueDate?: string; // ISO date (not for receipts)
  
  // Items
  lineItems: LineItem[];
  
  // Totals
  subtotal: number;
  taxTotal: number;
  discountTotal: number;
  total: number;
  
  // Additional
  notes?: string;
  terms?: string;
  customFields: CustomField[];
  
  // Settings
  settings: InvoiceSettings;
  
  // Status (for saved invoices)
  status?: 'draft' | 'sent' | 'paid' | 'overdue' | 'partial';
  paidAmount?: number;
  paidDate?: string;
  
  // Metadata
  createdAt: string;
  updatedAt: string;
}

// For creating new invoices
export type NewInvoice = Omit<Invoice, 'id' | 'createdAt' | 'updatedAt'>;
