'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-surface-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-2xl font-bold text-primary">
            UnGone
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-foreground hover:text-primary transition-colors">
              Home
            </Link>
            <Link href="/services" className="text-foreground hover:text-primary transition-colors">
              Services
            </Link>
            <Link href="/about" className="text-foreground hover:text-primary transition-colors">
              About
            </Link>
            <Link href="/contact" className="bg-primary hover:bg-primary-dark text-background px-4 py-2 rounded-full font-medium transition-colors">
              Get a Growth Audit
            </Link>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-foreground"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-surface border-t border-surface-light">
          <div className="px-4 py-4 space-y-3">
            <Link href="/" className="block text-foreground hover:text-primary transition-colors" onClick={() => setIsOpen(false)}>
              Home
            </Link>
            <Link href="/services" className="block text-foreground hover:text-primary transition-colors" onClick={() => setIsOpen(false)}>
              Services
            </Link>
            <Link href="/about" className="block text-foreground hover:text-primary transition-colors" onClick={() => setIsOpen(false)}>
              About
            </Link>
            <Link href="/contact" className="block bg-primary text-background px-4 py-2 rounded-full font-medium text-center" onClick={() => setIsOpen(false)}>
              Get a Growth Audit
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
