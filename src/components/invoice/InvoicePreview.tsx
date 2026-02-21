'use client';

import { Invoice } from '@/lib/types/invoice';
import { formatCurrency, formatDate } from '@/lib/utils/invoice';
import { FONTS } from '@/lib/constants';
import { getTemplate } from '@/lib/templates';
import { cn } from '@/lib/utils';

interface InvoicePreviewProps {
  invoice: Partial<Invoice>;
  showWatermark?: boolean;
}

export function InvoicePreview({ invoice, showWatermark = true }: InvoicePreviewProps) {
  const primaryColor = invoice.settings?.primaryColor || '#1e40af';
  const accentColor = invoice.settings?.accentColor || '#10b981';
  const currency = invoice.settings?.currency || 'USD';
  const fontId = invoice.settings?.font || 'inter';
  const font = FONTS.find(f => f.id === fontId) || FONTS[0];
  
  // Get template styles
  const template = getTemplate(invoice.settings?.template || 'clean');
  const styles = template.styles;

  const documentTitle = invoice.type === 'invoice' ? 'INVOICE' :
                        invoice.type === 'quote' ? 'QUOTE' :
                        invoice.type === 'estimate' ? 'ESTIMATE' :
                        invoice.type === 'receipt' ? 'RECEIPT' :
                        invoice.type === 'purchase-order' ? 'PURCHASE ORDER' :
                        invoice.type === 'credit-note' ? 'CREDIT NOTE' :
                        invoice.type === 'timesheet' ? 'TIMESHEET' : 'PROFORMA INVOICE';

  // Border radius based on template
  const radiusClass = styles.borderRadius === 'none' ? '' : 
                      styles.borderRadius === 'sm' ? 'rounded' :
                      styles.borderRadius === 'md' ? 'rounded-md' : 'rounded-lg';

  return (
    <div 
      className={cn(
        "relative bg-white min-h-[600px] text-sm",
        styles.accentPosition === 'top' && 'border-t-4',
        styles.accentPosition === 'left' && 'border-l-4'
      )} 
      style={{ 
        fontFamily: font.family,
        borderColor: styles.accentPosition !== 'none' ? primaryColor : undefined,
      }}
    >
      {/* Header Background for Bold/Creative/Executive */}
      {styles.headerBg && (
        <div 
          className="absolute top-0 left-0 right-0 h-24"
          style={{ backgroundColor: primaryColor, opacity: 0.1 }}
        />
      )}

      <div className="p-8">
        {/* Watermark */}
        {showWatermark && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10">
            <div className="text-6xl font-bold text-slate-400 rotate-[-30deg]">
              DOCZipp
            </div>
          </div>
        )}

        {/* Header - Different layouts based on template */}
        {styles.headerLayout === 'centered' ? (
          // Centered layout
          <div className="text-center mb-8">
            <div 
              className={cn("text-3xl mb-4", styles.fontWeight === 'bold' ? 'font-extrabold' : 'font-bold')}
              style={{ color: primaryColor }}
            >
              {documentTitle}
            </div>
            {invoice.from?.logo ? (
              <img src={invoice.from.logo} alt="Logo" className="h-12 mx-auto mb-2" />
            ) : (
              <div 
                className={cn("text-2xl mb-1", styles.fontWeight === 'bold' ? 'font-bold' : 'font-semibold')}
                style={{ color: primaryColor }}
              >
                {invoice.from?.name || 'Your Company'}
              </div>
            )}
            <div className="text-slate-600 text-xs">
              <div>{invoice.number || 'INV-0001'} | {invoice.issueDate ? formatDate(invoice.issueDate) : 'Not set'}</div>
            </div>
          </div>
        ) : styles.headerLayout === 'stacked' ? (
          // Stacked layout (minimal)
          <div className="mb-8">
            {invoice.from?.logo ? (
              <img src={invoice.from.logo} alt="Logo" className="h-10 mb-4" />
            ) : (
              <div className="text-xl font-medium text-slate-900 mb-4">
                {invoice.from?.name || 'Your Company'}
              </div>
            )}
            <div 
              className="text-2xl font-light tracking-wide"
              style={{ color: primaryColor }}
            >
              {documentTitle}
            </div>
            <div className="text-slate-500 text-xs mt-2">
              {invoice.number || 'INV-0001'} • {invoice.issueDate ? formatDate(invoice.issueDate) : 'Not set'}
              {invoice.dueDate && invoice.type !== 'receipt' && ` • Due: ${formatDate(invoice.dueDate)}`}
            </div>
          </div>
        ) : (
          // Split layout (default)
          <div className="flex justify-between items-start mb-8">
            <div>
              {invoice.from?.logo ? (
                <img src={invoice.from.logo} alt="Logo" className="h-12 mb-2" />
              ) : (
                <div 
                  className={cn("text-2xl mb-1", styles.fontWeight === 'bold' ? 'font-bold' : 'font-semibold')}
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
              </div>
            </div>
            <div className="text-right">
              <div 
                className={cn("text-3xl mb-2", styles.fontWeight === 'bold' ? 'font-extrabold' : 'font-bold')}
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
        )}

        {/* Bill To */}
        <div className="mb-8">
          <div 
            className={cn("text-xs uppercase tracking-wide mb-2", styles.fontWeight === 'bold' ? 'font-bold' : 'font-semibold')}
            style={{ color: primaryColor }}
          >
            Bill To
          </div>
          <div className="text-slate-900">
            <div className="font-medium">{invoice.to?.name || 'Client Name'}</div>
            <div className="text-slate-600 text-xs space-y-0.5 mt-1">
              {invoice.to?.address && <div>{invoice.to.address}</div>}
              {invoice.to?.email && <div>{invoice.to.email}</div>}
            </div>
          </div>
        </div>

        {/* Line Items Table - Different styles based on template */}
        <div className="mb-8">
          <table className="w-full">
            <thead>
              <tr 
                className={cn(
                  "text-left text-xs uppercase tracking-wide",
                  styles.tableStyle === 'minimal' && 'border-b-2',
                  styles.tableStyle === 'bordered' && 'border-2',
                  styles.tableStyle === 'modern' && 'border-b',
                  radiusClass
                )}
                style={{ 
                  backgroundColor: styles.tableStyle !== 'minimal' ? primaryColor : 'transparent',
                  color: styles.tableStyle !== 'minimal' ? 'white' : primaryColor,
                  borderColor: primaryColor,
                }}
              >
                <th className={cn("py-2 px-3", styles.tableStyle !== 'minimal' && 'rounded-tl')}>Description</th>
                <th className="py-2 px-3 text-center w-20">Qty</th>
                <th className="py-2 px-3 text-right w-24">Rate</th>
                <th className={cn("py-2 px-3 text-right w-24", styles.tableStyle !== 'minimal' && 'rounded-tr')}>Amount</th>
              </tr>
            </thead>
            <tbody className={styles.tableStyle === 'bordered' ? 'border-x-2 border-b-2' : ''} style={{ borderColor: styles.tableStyle === 'bordered' ? primaryColor : undefined }}>
              {invoice.lineItems?.map((item, index) => (
                <tr 
                  key={item.id} 
                  className={cn(
                    styles.tableStyle === 'striped' && index % 2 === 0 && 'bg-slate-50',
                    styles.tableStyle === 'bordered' && 'border-b',
                    styles.tableStyle === 'modern' && 'border-b border-slate-100'
                  )}
                  style={{ borderColor: styles.tableStyle === 'bordered' ? primaryColor : undefined }}
                >
                  <td className="py-2 px-3 text-slate-700">
                    {item.description || 'Item description'}
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
          <div className={cn("w-64 space-y-1 p-4", styles.headerBg && 'bg-slate-50', radiusClass)}>
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
              className={cn("flex justify-between text-lg pt-2 border-t-2", styles.fontWeight === 'bold' ? 'font-extrabold' : 'font-bold')}
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
    </div>
  );
}
