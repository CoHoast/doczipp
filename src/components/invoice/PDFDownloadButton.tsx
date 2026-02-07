'use client';

import { useState } from 'react';
import { pdf } from '@react-pdf/renderer';
import { Button } from '@/components/ui/button';
import { Download, Loader2 } from 'lucide-react';
import { Invoice } from '@/lib/types/invoice';
import { InvoicePDF } from './InvoicePDF';

interface PDFDownloadButtonProps {
  invoice: Partial<Invoice>;
  showWatermark?: boolean;
  className?: string;
}

export function PDFDownloadButton({ 
  invoice, 
  showWatermark = true,
  className 
}: PDFDownloadButtonProps) {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownload = async () => {
    setIsGenerating(true);
    
    try {
      const blob = await pdf(
        <InvoicePDF invoice={invoice} showWatermark={showWatermark} />
      ).toBlob();
      
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      
      // Generate filename
      const type = invoice.type || 'invoice';
      const number = invoice.number || 'draft';
      const clientName = invoice.to?.name?.replace(/[^a-zA-Z0-9]/g, '-') || 'client';
      link.download = `${type}-${number}-${clientName}.pdf`;
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Button 
      onClick={handleDownload}
      disabled={isGenerating}
      className={className}
    >
      {isGenerating ? (
        <>
          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          Generating...
        </>
      ) : (
        <>
          <Download className="h-4 w-4 mr-2" />
          Download PDF
        </>
      )}
    </Button>
  );
}
