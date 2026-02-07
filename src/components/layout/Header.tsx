'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FileText } from 'lucide-react';
import { MobileMenu } from './MobileMenu';

interface HeaderProps {
  currentPage?: 'home' | 'templates' | 'pricing' | 'create';
}

export function Header({ currentPage }: HeaderProps) {
  return (
    <header className="bg-white border-b border-slate-200">
      <div className="container mx-auto px-4 py-3 md:py-4">
        <nav className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <FileText className="h-4 w-4 md:h-6 md:w-6 text-white" />
            </div>
            <span className="text-xl md:text-2xl font-bold text-slate-900">QuickBill</span>
          </Link>
          
          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-4">
            <Link 
              href="/pricing" 
              className={currentPage === 'pricing' ? 'text-blue-600 font-medium' : 'text-slate-600 hover:text-slate-900'}
            >
              Pricing
            </Link>
            <Link 
              href="/templates" 
              className={currentPage === 'templates' ? 'text-blue-600 font-medium' : 'text-slate-600 hover:text-slate-900'}
            >
              Templates
            </Link>
            <Link href="/login">
              <Button variant="outline" size="sm">Log In</Button>
            </Link>
            {currentPage !== 'create' && (
              <Link href="/create">
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                  Get Started
                </Button>
              </Link>
            )}
          </div>
          
          {/* Mobile nav */}
          <MobileMenu />
        </nav>
      </div>
    </header>
  );
}
