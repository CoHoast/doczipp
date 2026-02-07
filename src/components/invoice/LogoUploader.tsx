'use client';

import { useRef, useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, X, Image as ImageIcon } from 'lucide-react';

interface LogoUploaderProps {
  logo?: string;
  onLogoChange: (logo: string | undefined) => void;
}

export function LogoUploader({ logo, onLogoChange }: LogoUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      alert('Image must be less than 2MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      onLogoChange(result);
    };
    reader.readAsDataURL(file);
  }, [onLogoChange]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFile(file);
    }
  }, [handleFile]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  }, [handleFile]);

  const handleRemove = useCallback(() => {
    onLogoChange(undefined);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, [onLogoChange]);

  if (logo) {
    return (
      <div className="relative inline-block">
        <img 
          src={logo} 
          alt="Logo" 
          className="h-16 max-w-[200px] object-contain rounded border border-slate-200"
        />
        <button
          onClick={handleRemove}
          className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      className={`
        border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
        ${isDragging 
          ? 'border-blue-500 bg-blue-50' 
          : 'border-slate-300 hover:border-slate-400'
        }
      `}
      onClick={() => fileInputRef.current?.click()}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileInput}
        className="hidden"
      />
      <div className="flex flex-col items-center gap-2">
        <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center">
          <ImageIcon className="h-6 w-6 text-slate-400" />
        </div>
        <div className="text-sm text-slate-600">
          <span className="text-blue-600 font-medium">Click to upload</span> or drag and drop
        </div>
        <div className="text-xs text-slate-400">
          PNG, JPG up to 2MB
        </div>
      </div>
    </div>
  );
}
