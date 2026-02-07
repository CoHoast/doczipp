'use client';

import { useState, useCallback } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Trash2, Download, FileText } from 'lucide-react';
import { Invoice, LineItem, DocumentType } from '@/lib/types/invoice';
import { DOCUMENT_TYPES, CURRENCIES, DUE_DATE_PRESETS } from '@/lib/constants';
import { 
  createEmptyInvoice, 
  createEmptyLineItem, 
  calculateLineItemAmount,
  calculateTotals,
  formatCurrency 
} from '@/lib/utils/invoice';
import { InvoicePreview } from './InvoicePreview';

export function InvoiceBuilder() {
  const [invoice, setInvoice] = useState<Partial<Invoice>>(() => createEmptyInvoice());
  const [activeTab, setActiveTab] = useState('details');

  const updateInvoice = useCallback((updates: Partial<Invoice>) => {
    setInvoice(prev => {
      const updated = { ...prev, ...updates };
      // Recalculate totals when line items change
      if (updates.lineItems) {
        const totals = calculateTotals(updates.lineItems);
        return { ...updated, ...totals };
      }
      return updated;
    });
  }, []);

  const updateLineItem = useCallback((id: string, updates: Partial<LineItem>) => {
    setInvoice(prev => {
      const lineItems = prev.lineItems?.map(item => {
        if (item.id === id) {
          const updated = { ...item, ...updates };
          updated.amount = calculateLineItemAmount(updated);
          return updated;
        }
        return item;
      }) || [];
      
      const totals = calculateTotals(lineItems);
      return { ...prev, lineItems, ...totals };
    });
  }, []);

  const addLineItem = useCallback(() => {
    setInvoice(prev => ({
      ...prev,
      lineItems: [...(prev.lineItems || []), createEmptyLineItem()],
    }));
  }, []);

  const removeLineItem = useCallback((id: string) => {
    setInvoice(prev => {
      const lineItems = prev.lineItems?.filter(item => item.id !== id) || [];
      const totals = calculateTotals(lineItems);
      return { ...prev, lineItems, ...totals };
    });
  }, []);

  const handleDocumentTypeChange = useCallback((type: DocumentType) => {
    setInvoice(prev => ({
      ...prev,
      ...createEmptyInvoice(type),
      // Keep existing data
      from: prev.from,
      to: prev.to,
      lineItems: prev.lineItems,
    }));
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto py-8 px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Create {invoice.type === 'invoice' ? 'Invoice' : invoice.type}</h1>
            <p className="text-slate-600 mt-1">Build your professional document</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="gap-2">
              <FileText className="h-4 w-4" />
              Save Draft
            </Button>
            <Button className="gap-2 bg-blue-600 hover:bg-blue-700">
              <Download className="h-4 w-4" />
              Download PDF
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Form */}
          <div className="space-y-6">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="items">Items</TabsTrigger>
                <TabsTrigger value="notes">Notes</TabsTrigger>
                <TabsTrigger value="settings">Style</TabsTrigger>
              </TabsList>

              {/* Details Tab */}
              <TabsContent value="details" className="space-y-6">
                <Card className="p-6">
                  <h3 className="font-semibold mb-4">Document Type</h3>
                  <Select 
                    value={invoice.type} 
                    onValueChange={(v) => handleDocumentTypeChange(v as DocumentType)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {DOCUMENT_TYPES.map(type => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Card>

                <Card className="p-6">
                  <h3 className="font-semibold mb-4">Your Business</h3>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="from-name">Business Name</Label>
                      <Input
                        id="from-name"
                        value={invoice.from?.name || ''}
                        onChange={(e) => updateInvoice({ 
                          from: { ...invoice.from!, name: e.target.value } 
                        })}
                        placeholder="Your Company Name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="from-email">Email</Label>
                      <Input
                        id="from-email"
                        type="email"
                        value={invoice.from?.email || ''}
                        onChange={(e) => updateInvoice({ 
                          from: { ...invoice.from!, email: e.target.value } 
                        })}
                        placeholder="you@company.com"
                      />
                    </div>
                    <div>
                      <Label htmlFor="from-address">Address</Label>
                      <Input
                        id="from-address"
                        value={invoice.from?.address || ''}
                        onChange={(e) => updateInvoice({ 
                          from: { ...invoice.from!, address: e.target.value } 
                        })}
                        placeholder="123 Main St"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="from-city">City</Label>
                        <Input
                          id="from-city"
                          value={invoice.from?.city || ''}
                          onChange={(e) => updateInvoice({ 
                            from: { ...invoice.from!, city: e.target.value } 
                          })}
                          placeholder="New York"
                        />
                      </div>
                      <div>
                        <Label htmlFor="from-state">State</Label>
                        <Input
                          id="from-state"
                          value={invoice.from?.state || ''}
                          onChange={(e) => updateInvoice({ 
                            from: { ...invoice.from!, state: e.target.value } 
                          })}
                          placeholder="NY"
                        />
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <h3 className="font-semibold mb-4">Bill To</h3>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="to-name">Client Name</Label>
                      <Input
                        id="to-name"
                        value={invoice.to?.name || ''}
                        onChange={(e) => updateInvoice({ 
                          to: { ...invoice.to!, name: e.target.value } 
                        })}
                        placeholder="Client Company"
                      />
                    </div>
                    <div>
                      <Label htmlFor="to-email">Client Email</Label>
                      <Input
                        id="to-email"
                        type="email"
                        value={invoice.to?.email || ''}
                        onChange={(e) => updateInvoice({ 
                          to: { ...invoice.to!, email: e.target.value } 
                        })}
                        placeholder="client@company.com"
                      />
                    </div>
                    <div>
                      <Label htmlFor="to-address">Address</Label>
                      <Input
                        id="to-address"
                        value={invoice.to?.address || ''}
                        onChange={(e) => updateInvoice({ 
                          to: { ...invoice.to!, address: e.target.value } 
                        })}
                        placeholder="456 Client Ave"
                      />
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <h3 className="font-semibold mb-4">Invoice Details</h3>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="invoice-number">Invoice Number</Label>
                      <Input
                        id="invoice-number"
                        value={invoice.number || ''}
                        onChange={(e) => updateInvoice({ number: e.target.value })}
                        placeholder="INV-2026-001"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="issue-date">Issue Date</Label>
                        <Input
                          id="issue-date"
                          type="date"
                          value={invoice.issueDate || ''}
                          onChange={(e) => updateInvoice({ issueDate: e.target.value })}
                        />
                      </div>
                      {invoice.type !== 'receipt' && (
                        <div>
                          <Label htmlFor="due-date">Due Date</Label>
                          <Input
                            id="due-date"
                            type="date"
                            value={invoice.dueDate || ''}
                            onChange={(e) => updateInvoice({ dueDate: e.target.value })}
                          />
                        </div>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="currency">Currency</Label>
                      <Select 
                        value={invoice.settings?.currency || 'USD'} 
                        onValueChange={(v) => updateInvoice({ 
                          settings: { ...invoice.settings!, currency: v } 
                        })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {CURRENCIES.map(currency => (
                            <SelectItem key={currency.code} value={currency.code}>
                              {currency.symbol} {currency.name} ({currency.code})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </Card>
              </TabsContent>

              {/* Items Tab */}
              <TabsContent value="items" className="space-y-4">
                <Card className="p-6">
                  <h3 className="font-semibold mb-4">Line Items</h3>
                  <div className="space-y-4">
                    {invoice.lineItems?.map((item, index) => (
                      <div key={item.id} className="border rounded-lg p-4 space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-slate-600">Item {index + 1}</span>
                          {(invoice.lineItems?.length || 0) > 1 && (
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => removeLineItem(item.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                        <div>
                          <Label>Description</Label>
                          <Textarea
                            value={item.description}
                            onChange={(e) => updateLineItem(item.id, { description: e.target.value })}
                            placeholder="Describe your service or product..."
                            rows={2}
                          />
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <Label>Quantity</Label>
                            <Input
                              type="number"
                              min="0"
                              step="1"
                              value={item.quantity}
                              onChange={(e) => updateLineItem(item.id, { quantity: parseFloat(e.target.value) || 0 })}
                            />
                          </div>
                          <div>
                            <Label>Rate</Label>
                            <Input
                              type="number"
                              min="0"
                              step="0.01"
                              value={item.rate}
                              onChange={(e) => updateLineItem(item.id, { rate: parseFloat(e.target.value) || 0 })}
                            />
                          </div>
                          <div>
                            <Label>Amount</Label>
                            <div className="h-10 flex items-center text-lg font-semibold text-slate-900">
                              {formatCurrency(item.amount, invoice.settings?.currency)}
                            </div>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label>Tax Rate (%)</Label>
                            <Input
                              type="number"
                              min="0"
                              max="100"
                              step="0.1"
                              value={item.taxRate || ''}
                              onChange={(e) => updateLineItem(item.id, { taxRate: parseFloat(e.target.value) || 0 })}
                              placeholder="0"
                            />
                          </div>
                          <div>
                            <Label>Discount (%)</Label>
                            <Input
                              type="number"
                              min="0"
                              max="100"
                              step="0.1"
                              value={item.discount || ''}
                              onChange={(e) => updateLineItem(item.id, { 
                                discount: parseFloat(e.target.value) || 0,
                                discountType: 'percentage'
                              })}
                              placeholder="0"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                    <Button 
                      variant="outline" 
                      className="w-full gap-2"
                      onClick={addLineItem}
                    >
                      <Plus className="h-4 w-4" />
                      Add Line Item
                    </Button>
                  </div>

                  <Separator className="my-6" />

                  {/* Totals */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-slate-600">
                      <span>Subtotal</span>
                      <span>{formatCurrency(invoice.subtotal || 0, invoice.settings?.currency)}</span>
                    </div>
                    {(invoice.discountTotal || 0) > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Discount</span>
                        <span>-{formatCurrency(invoice.discountTotal || 0, invoice.settings?.currency)}</span>
                      </div>
                    )}
                    {(invoice.taxTotal || 0) > 0 && (
                      <div className="flex justify-between text-slate-600">
                        <span>Tax</span>
                        <span>{formatCurrency(invoice.taxTotal || 0, invoice.settings?.currency)}</span>
                      </div>
                    )}
                    <Separator />
                    <div className="flex justify-between text-xl font-bold text-slate-900">
                      <span>Total</span>
                      <span>{formatCurrency(invoice.total || 0, invoice.settings?.currency)}</span>
                    </div>
                  </div>
                </Card>
              </TabsContent>

              {/* Notes Tab */}
              <TabsContent value="notes" className="space-y-4">
                <Card className="p-6">
                  <h3 className="font-semibold mb-4">Notes</h3>
                  <Textarea
                    value={invoice.notes || ''}
                    onChange={(e) => updateInvoice({ notes: e.target.value })}
                    placeholder="Add any notes for your client..."
                    rows={4}
                  />
                </Card>
                <Card className="p-6">
                  <h3 className="font-semibold mb-4">Terms & Conditions</h3>
                  <Textarea
                    value={invoice.terms || ''}
                    onChange={(e) => updateInvoice({ terms: e.target.value })}
                    placeholder="Payment terms, late fees, etc..."
                    rows={4}
                  />
                </Card>
              </TabsContent>

              {/* Settings Tab */}
              <TabsContent value="settings" className="space-y-4">
                <Card className="p-6">
                  <h3 className="font-semibold mb-4">Colors</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Primary Color</Label>
                      <div className="flex gap-2 mt-1">
                        <Input
                          type="color"
                          value={invoice.settings?.primaryColor || '#1e40af'}
                          onChange={(e) => updateInvoice({ 
                            settings: { ...invoice.settings!, primaryColor: e.target.value } 
                          })}
                          className="w-12 h-10 p-1 cursor-pointer"
                        />
                        <Input
                          value={invoice.settings?.primaryColor || '#1e40af'}
                          onChange={(e) => updateInvoice({ 
                            settings: { ...invoice.settings!, primaryColor: e.target.value } 
                          })}
                          placeholder="#1e40af"
                        />
                      </div>
                    </div>
                    <div>
                      <Label>Accent Color</Label>
                      <div className="flex gap-2 mt-1">
                        <Input
                          type="color"
                          value={invoice.settings?.accentColor || '#10b981'}
                          onChange={(e) => updateInvoice({ 
                            settings: { ...invoice.settings!, accentColor: e.target.value } 
                          })}
                          className="w-12 h-10 p-1 cursor-pointer"
                        />
                        <Input
                          value={invoice.settings?.accentColor || '#10b981'}
                          onChange={(e) => updateInvoice({ 
                            settings: { ...invoice.settings!, accentColor: e.target.value } 
                          })}
                          placeholder="#10b981"
                        />
                      </div>
                    </div>
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right: Preview */}
          <div className="lg:sticky lg:top-8 h-fit">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Preview</h3>
                <span className="text-sm text-slate-500">Live preview</span>
              </div>
              <div className="border rounded-lg overflow-hidden bg-white">
                <InvoicePreview invoice={invoice} />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
