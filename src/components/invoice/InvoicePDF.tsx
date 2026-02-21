'use client';

import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
} from '@react-pdf/renderer';
import { Invoice } from '@/lib/types/invoice';

interface InvoicePDFProps {
  invoice: Partial<Invoice>;
  showWatermark?: boolean;
}

export function InvoicePDF({ invoice, showWatermark = true }: InvoicePDFProps) {
  const primaryColor = invoice.settings?.primaryColor || '#1e40af';
  const currency = invoice.settings?.currency || 'USD';

  const documentTitle = invoice.type === 'invoice' ? 'INVOICE' :
                        invoice.type === 'quote' ? 'QUOTE' :
                        invoice.type === 'estimate' ? 'ESTIMATE' :
                        invoice.type === 'receipt' ? 'RECEIPT' : 'PROFORMA INVOICE';

  const formatCurrency = (amount: number) => {
    const symbols: Record<string, string> = {
      USD: '$', EUR: '€', GBP: '£', CAD: 'C$', AUD: 'A$',
      JPY: '¥', CHF: 'Fr', CNY: '¥', INR: '₹', MXN: '$',
    };
    const symbol = symbols[currency] || '$';
    const decimals = currency === 'JPY' ? 0 : 2;
    return `${symbol}${amount.toFixed(decimals)}`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const styles = StyleSheet.create({
    page: {
      padding: 40,
      fontFamily: 'Helvetica',
      fontSize: 10,
      color: '#1e293b',
    },
    watermark: {
      position: 'absolute',
      top: '40%',
      left: '20%',
      fontSize: 60,
      color: '#e2e8f0',
      transform: 'rotate(-30deg)',
      opacity: 0.3,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 30,
    },
    companyName: {
      fontSize: 20,
      fontWeight: 700,
      color: primaryColor,
      marginBottom: 4,
    },
    companyDetails: {
      fontSize: 9,
      color: '#64748b',
      lineHeight: 1.4,
    },
    documentTitle: {
      fontSize: 28,
      fontWeight: 700,
      color: primaryColor,
      textAlign: 'right',
      marginBottom: 8,
    },
    invoiceDetails: {
      fontSize: 9,
      color: '#64748b',
      textAlign: 'right',
      lineHeight: 1.4,
    },
    billTo: {
      marginBottom: 20,
    },
    sectionLabel: {
      fontSize: 9,
      fontWeight: 600,
      color: primaryColor,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
      marginBottom: 6,
    },
    clientName: {
      fontSize: 12,
      fontWeight: 600,
      marginBottom: 2,
    },
    clientDetails: {
      fontSize: 9,
      color: '#64748b',
      lineHeight: 1.4,
    },
    table: {
      marginBottom: 20,
    },
    tableHeader: {
      flexDirection: 'row',
      backgroundColor: primaryColor,
      color: 'white',
      padding: 8,
      fontSize: 9,
      fontWeight: 600,
      textTransform: 'uppercase',
    },
    tableRow: {
      flexDirection: 'row',
      padding: 8,
      borderBottomWidth: 1,
      borderBottomColor: '#e2e8f0',
    },
    tableRowAlt: {
      backgroundColor: '#f8fafc',
    },
    colDescription: {
      flex: 1,
    },
    colQty: {
      width: 60,
      textAlign: 'center',
    },
    colRate: {
      width: 80,
      textAlign: 'right',
    },
    colAmount: {
      width: 80,
      textAlign: 'right',
    },
    totalsContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      marginBottom: 30,
    },
    totalsBox: {
      width: 200,
    },
    totalRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 4,
    },
    totalLabel: {
      color: '#64748b',
    },
    totalValue: {
      textAlign: 'right',
    },
    grandTotalRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 8,
      borderTopWidth: 2,
      borderTopColor: primaryColor,
      marginTop: 4,
    },
    grandTotalLabel: {
      fontSize: 14,
      fontWeight: 700,
      color: primaryColor,
    },
    grandTotalValue: {
      fontSize: 14,
      fontWeight: 700,
      color: primaryColor,
      textAlign: 'right',
    },
    notes: {
      marginTop: 20,
      paddingTop: 20,
      borderTopWidth: 1,
      borderTopColor: '#e2e8f0',
    },
    notesLabel: {
      fontSize: 9,
      fontWeight: 600,
      color: '#64748b',
      textTransform: 'uppercase',
      marginBottom: 4,
    },
    notesText: {
      fontSize: 9,
      color: '#475569',
      lineHeight: 1.4,
    },
    footer: {
      position: 'absolute',
      bottom: 30,
      left: 40,
      right: 40,
      textAlign: 'center',
      fontSize: 9,
      color: '#94a3b8',
    },
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Watermark */}
        {showWatermark && (
          <Text style={styles.watermark}>DOCZipp</Text>
        )}

        {/* Header */}
        <View style={styles.header}>
          <View>
            {invoice.from?.logo ? (
              <Image src={invoice.from.logo} style={{ height: 50, marginBottom: 8, objectFit: 'contain' }} />
            ) : (
              <Text style={styles.companyName}>
                {invoice.from?.name || 'Your Company'}
              </Text>
            )}
            {invoice.from?.logo && (
              <Text style={[styles.companyName, { fontSize: 14 }]}>
                {invoice.from?.name || 'Your Company'}
              </Text>
            )}
            <Text style={styles.companyDetails}>
              {invoice.from?.address && `${invoice.from.address}\n`}
              {[invoice.from?.city, invoice.from?.state, invoice.from?.zip].filter(Boolean).join(', ')}
              {invoice.from?.email && `\n${invoice.from.email}`}
              {invoice.from?.phone && `\n${invoice.from.phone}`}
            </Text>
          </View>
          <View>
            <Text style={styles.documentTitle}>{documentTitle}</Text>
            <Text style={styles.invoiceDetails}>
              Number: {invoice.number || 'INV-0001'}{'\n'}
              Date: {invoice.issueDate ? formatDate(invoice.issueDate) : 'Not set'}
              {invoice.dueDate && invoice.type !== 'receipt' && `\nDue: ${formatDate(invoice.dueDate)}`}
            </Text>
          </View>
        </View>

        {/* Bill To */}
        <View style={styles.billTo}>
          <Text style={styles.sectionLabel}>Bill To</Text>
          <Text style={styles.clientName}>{invoice.to?.name || 'Client Name'}</Text>
          <Text style={styles.clientDetails}>
            {invoice.to?.address && `${invoice.to.address}\n`}
            {[invoice.to?.city, invoice.to?.state, invoice.to?.zip].filter(Boolean).join(', ')}
            {invoice.to?.email && `\n${invoice.to.email}`}
          </Text>
        </View>

        {/* Line Items Table */}
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={styles.colDescription}>Description</Text>
            <Text style={styles.colQty}>Qty</Text>
            <Text style={styles.colRate}>Rate</Text>
            <Text style={styles.colAmount}>Amount</Text>
          </View>
          {invoice.lineItems?.map((item, index) => (
            <View 
              key={item.id} 
              style={[styles.tableRow, index % 2 === 0 ? styles.tableRowAlt : {}]}
            >
              <Text style={styles.colDescription}>
                {item.description || 'Item description'}
                {item.taxRate && item.taxRate > 0 ? ` (Tax: ${item.taxRate}%)` : ''}
                {item.discount && item.discount > 0 ? ` (-${item.discount}%)` : ''}
              </Text>
              <Text style={styles.colQty}>{item.quantity}</Text>
              <Text style={styles.colRate}>{formatCurrency(item.rate)}</Text>
              <Text style={styles.colAmount}>{formatCurrency(item.amount)}</Text>
            </View>
          ))}
        </View>

        {/* Totals */}
        <View style={styles.totalsContainer}>
          <View style={styles.totalsBox}>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Subtotal</Text>
              <Text style={styles.totalValue}>{formatCurrency(invoice.subtotal || 0)}</Text>
            </View>
            {(invoice.discountTotal || 0) > 0 && (
              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Discount</Text>
                <Text style={[styles.totalValue, { color: '#16a34a' }]}>
                  -{formatCurrency(invoice.discountTotal || 0)}
                </Text>
              </View>
            )}
            {(invoice.taxTotal || 0) > 0 && (
              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Tax</Text>
                <Text style={styles.totalValue}>{formatCurrency(invoice.taxTotal || 0)}</Text>
              </View>
            )}
            <View style={styles.grandTotalRow}>
              <Text style={styles.grandTotalLabel}>Total</Text>
              <Text style={styles.grandTotalValue}>{formatCurrency(invoice.total || 0)}</Text>
            </View>
          </View>
        </View>

        {/* Notes & Terms */}
        {(invoice.notes || invoice.terms) && (
          <View style={styles.notes}>
            {invoice.notes && (
              <View style={{ marginBottom: 12 }}>
                <Text style={styles.notesLabel}>Notes</Text>
                <Text style={styles.notesText}>{invoice.notes}</Text>
              </View>
            )}
            {invoice.terms && (
              <View>
                <Text style={styles.notesLabel}>Terms & Conditions</Text>
                <Text style={styles.notesText}>{invoice.terms}</Text>
              </View>
            )}
          </View>
        )}

        {/* Footer */}
        <Text style={styles.footer}>Thank you for your business!</Text>
      </Page>
    </Document>
  );
}
