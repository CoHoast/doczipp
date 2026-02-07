'use client';

import { Invoice } from '@/lib/types/invoice';
import { formatCurrency, formatDate } from '@/lib/utils/invoice';

interface InvoicePreviewProps {
  invoice: Partial<Invoice>;
  showWatermark?: boolean;
}

export function InvoicePreview({ invoice, showWatermark = true }: InvoicePreviewProps) {
  const primaryColor = invoice.settings?.primaryColor || '#1e40af';
  const accentColor = invoice.settings?.accentColor || '#10b981';
  const currency = invoice.settings?.currency || 'USD';

  const documentTitle = invoice.type === 'invoice' ? 'INVOICE' :
                        invoice.type === 'quote' ? 'QUOTE' :
                        invoice.type === 'estimate' ? 'ESTIMATE' :
                        invoice.type === 'receipt' ? 'RECEIPT' : 'PROFORMA INVOICE';

  return (
    <div className="relative bg-white p-8 min-h-[600px] text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
      {/* Watermark */}
      {showWatermark && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10">
          <div className="text-6xl font-bold text-slate-400 rotate-[-30deg]">
            QUICKBILL
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          {invoice.from?.logo ? (
            <img src={invoice.from.logo} alt="Logo" className="h-12 mb-2" />
          ) : (
            <div 
              className="text-2xl font-bold mb-1"
              style={{ color: primaryColor }}
            >
              {invoice.from?.name || 'Your Company'}
            </div>
          )}
          <div className="text-slate-600 text-xs space-y-0.5">
            {invoice.from?.address && <div>{invoice.from.address}</div>}
            {(invoice.from?.city || invoice.from?.state || invoice.from?.zip) && (
              <div>
                {[invoice.from?.city, invoice.from?.state, invoice.from?.zip].filter(Boolean).join(', ')}
              </div>
            )}
            {invoice.from?.email && <div>{invoice.from.email}</div>}
            {invoice.from?.phone && <div>{invoice.from.phone}</div>}
          </div>
        </div>
        <div className="text-right">
          <div 
            className="text-3xl font-bold mb-2"
            style={{ color: primaryColor }}
          >
            {documentTitle}
          </div>
          <div className="text-slate-600 text-xs space-y-0.5">
            <div><span className="font-medium">Number:</span> {invoice.number || 'INV-0001'}</div>
            <div><span className="font-medium">Date:</span> {invoice.issueDate ? formatDate(invoice.issueDate) : 'Not set'}</div>
            {invoice.dueDate && invoice.type !== 'receipt' && (
              <div><span className="font-medium">Due:</span> {formatDate(invoice.dueDate)}</div>
            )}
          </div>
        </div>
      </div>

      {/* Bill To */}
      <div className="mb-8">
        <div 
          className="text-xs font-semibold uppercase tracking-wide mb-2"
          style={{ color: primaryColor }}
        >
          Bill To
        </div>
        <div className="text-slate-900">
          <div className="font-medium">{invoice.to?.name || 'Client Name'}</div>
          <div className="text-slate-600 text-xs space-y-0.5 mt-1">
            {invoice.to?.address && <div>{invoice.to.address}</div>}
            {(invoice.to?.city || invoice.to?.state || invoice.to?.zip) && (
              <div>
                {[invoice.to?.city, invoice.to?.state, invoice.to?.zip].filter(Boolean).join(', ')}
              </div>
            )}
            {invoice.to?.email && <div>{invoice.to.email}</div>}
          </div>
        </div>
      </div>

      {/* Line Items Table */}
      <div className="mb-8">
        <table className="w-full">
          <thead>
            <tr 
              className="text-left text-xs uppercase tracking-wide"
              style={{ backgroundColor: primaryColor, color: 'white' }}
            >
              <th className="py-2 px-3 rounded-tl">Description</th>
              <th className="py-2 px-3 text-center w-20">Qty</th>
              <th className="py-2 px-3 text-right w-24">Rate</th>
              <th className="py-2 px-3 text-right w-24 rounded-tr">Amount</th>
            </tr>
          </thead>
          <tbody>
            {invoice.lineItems?.map((item, index) => (
              <tr 
                key={item.id} 
                className={index % 2 === 0 ? 'bg-slate-50' : 'bg-white'}
              >
                <td className="py-2 px-3 text-slate-700">
                  {item.description || 'Item description'}
                  {item.taxRate && item.taxRate > 0 && (
                    <span className="text-xs text-slate-500 ml-2">
                      (Tax: {item.taxRate}%)
                    </span>
                  )}
                  {item.discount && item.discount > 0 && (
                    <span className="text-xs text-green-600 ml-2">
                      (-{item.discount}%)
                    </span>
                  )}
                </td>
                <td className="py-2 px-3 text-center text-slate-700">{item.quantity}</td>
                <td className="py-2 px-3 text-right text-slate-700">
                  {formatCurrency(item.rate, currency)}
                </td>
                <td className="py-2 px-3 text-right font-medium text-slate-900">
                  {formatCurrency(item.amount, currency)}
                </td>
              </tr>
            ))}
            {(!invoice.lineItems || invoice.lineItems.length === 0) && (
              <tr className="bg-slate-50">
                <td colSpan={4} className="py-4 px-3 text-center text-slate-400">
                  No items added yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Totals */}
      <div className="flex justify-end mb-8">
        <div className="w-64 space-y-1">
          <div className="flex justify-between text-slate-600">
            <span>Subtotal</span>
            <span>{formatCurrency(invoice.subtotal || 0, currency)}</span>
          </div>
          {(invoice.discountTotal || 0) > 0 && (
            <div className="flex justify-between text-green-600">
              <span>Discount</span>
              <span>-{formatCurrency(invoice.discountTotal || 0, currency)}</span>
            </div>
          )}
          {(invoice.taxTotal || 0) > 0 && (
            <div className="flex justify-between text-slate-600">
              <span>Tax</span>
              <span>{formatCurrency(invoice.taxTotal || 0, currency)}</span>
            </div>
          )}
          <div 
            className="flex justify-between text-lg font-bold pt-2 border-t-2"
            style={{ borderColor: primaryColor, color: primaryColor }}
          >
            <span>Total</span>
            <span>{formatCurrency(invoice.total || 0, currency)}</span>
          </div>
        </div>
      </div>

      {/* Notes & Terms */}
      {(invoice.notes || invoice.terms) && (
        <div className="border-t pt-6 space-y-4">
          {invoice.notes && (
            <div>
              <div className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-1">
                Notes
              </div>
              <div className="text-slate-700 text-xs whitespace-pre-wrap">
                {invoice.notes}
              </div>
            </div>
          )}
          {invoice.terms && (
            <div>
              <div className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-1">
                Terms & Conditions
              </div>
              <div className="text-slate-600 text-xs whitespace-pre-wrap">
                {invoice.terms}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Footer */}
      <div className="absolute bottom-4 left-8 right-8 text-center text-xs text-slate-400">
        Thank you for your business!
      </div>
    </div>
  );
}
