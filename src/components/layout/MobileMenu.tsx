'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden">
      {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-slate-600 hover:text-slate-900"
        aria-label="Toggle menu"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/20 z-40"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Menu Panel */}
          <div className="fixed top-0 right-0 h-full w-64 bg-white shadow-xl z-50 p-6">
            <div className="flex justify-end mb-8">
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 text-slate-600 hover:text-slate-900"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <nav className="flex flex-col gap-4">
              <Link 
                href="/"
                onClick={() => setIsOpen(false)}
                className="text-lg text-slate-600 hover:text-slate-900 py-2"
              >
                Home
              </Link>
              <Link 
                href="/pricing"
                onClick={() => setIsOpen(false)}
                className="text-lg text-slate-600 hover:text-slate-900 py-2"
              >
                Pricing
              </Link>
              <Link 
                href="/templates"
                onClick={() => setIsOpen(false)}
                className="text-lg text-slate-600 hover:text-slate-900 py-2"
              >
                Templates
              </Link>
              
              <div className="border-t pt-4 mt-4 space-y-3">
                <Link href="/login" onClick={() => setIsOpen(false)}>
                  <Button variant="outline" className="w-full">
                    Log In
                  </Button>
                </Link>
                <Link href="/create" onClick={() => setIsOpen(false)}>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    Get Started
                  </Button>
                </Link>
              </div>
            </nav>
          </div>
        </>
      )}
    </div>
  );
}
