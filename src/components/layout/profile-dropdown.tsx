'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { UserCircle } from 'lucide-react';

export default function ProfileDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscapeKey);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isOpen]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Profile Icon Button */}
      <Button 
        variant="ghost" 
        size="icon" 
        className="h-9 w-9" 
        aria-label="User Profile"
        onClick={toggleDropdown}
      >
        <UserCircle className="h-6 w-6" />
      </Button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-background rounded-xl shadow-xl border border-border z-50 overflow-hidden">
          <div className="p-4">
            <div className="text-center mb-4">
              <h3 className="text-lg font-semibold text-foreground">Account</h3>
              <p className="text-sm text-muted-foreground">Sign in or create an account</p>
            </div>
            
            <div className="space-y-3">
              <Link href="/auth/signin" onClick={() => setIsOpen(false)} className="block">
                <Button className="w-full h-12 text-base font-medium">
                  <span className="mr-2">🔑</span>
                  Sign In
                </Button>
              </Link>
              
              <Link href="/auth/register" onClick={() => setIsOpen(false)} className="block">
                <Button variant="outline" className="w-full h-12 text-base font-medium border-2 hover:bg-primary hover:text-primary-foreground hover:border-primary">
                  <span className="mr-2">📝</span>
                  Register / Open an Account
                </Button>
              </Link>
            </div>
            
            <div className="mt-4 pt-3 border-t border-border text-center">
              <p className="text-xs text-muted-foreground">
                Secure account management
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}