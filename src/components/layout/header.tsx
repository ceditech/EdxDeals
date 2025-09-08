'use client';

import Link from 'next/link';
import { Menu, Search, UserCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { LanguageSwitcher } from '@/components/shared/language-switcher';
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetHeader } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import CartDropdown from './cart-dropdown';
import ProfileDropdown from './profile-dropdown';
import CategoriesMegaMenu from './categories-mega-menu';
import { useWishlist } from '@/hooks/use-wishlist';

const navLinks = [
  { href: '/shop', label: 'Shop' },
  { href: '/dealshub', label: 'Deals' },
  { href: '/sellers', label: 'Sellers' },
  { href: '/support', label: 'Support' },
];

export default function Header() {
  const { totalItems: wishlistCount } = useWishlist();
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 w-full items-center justify-between px-4 md:px-6 py-2" data-ai-hint="4-section header container">
        
        {/* 1. Logo Section */}
        <div className="min-w-[160px] max-w-[200px] flex items-center">
          <Link href="/" className="flex items-center" aria-label="Edxdeals Home">
            <Image
              src="/images/logo/edxdeals-logo.png"
              alt="Edxdeals by Edxstore LLC logo"
              width={130}
              height={30}
              priority
              className="w-28 md:w-36 h-auto object-contain"
              style={{ maxHeight: '56px' }}
            />
          </Link>
        </div>

        {/* 2. Menu Section */}
        <nav className="hidden lg:flex items-center space-x-6 font-medium text-sm">
          <CategoriesMegaMenu />
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="transition-colors hover:text-primary text-foreground/80"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* 3. Search Bar Section */}
        <div className="flex-1 max-w-[480px] min-w-[240px] px-4 hidden md:block">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              className="w-full rounded-lg bg-muted pl-10 h-9"
              aria-label="Search products"
            />
          </div>
        </div>
        
        {/* 4. Icons Section */}
        <div className="flex items-center space-x-4 min-w-[140px] justify-end">
          <LanguageSwitcher />
          
          {/* Wishlist Icon */}
          <Link href="/wishlist">
            <Button variant="ghost" size="icon" className="relative h-9 w-9" aria-label="Wishlist">
              <span className="text-xl">💙</span>
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-pink-500 text-xs text-white">
                  {wishlistCount}
                </span>
              )}
            </Button>
          </Link>
          
          <CartDropdown />
          <ProfileDropdown />
          
          {/* Mobile Menu Toggle */}
          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <SheetHeader>
                  <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col space-y-4 pt-8">
                  <div className="flex items-center mb-4 px-2">
                    <Link href="/" className="flex items-center" aria-label="Edxdeals Home">
                      <Image
                        src="/images/logo/edxdeals-logo.png"
                        alt="Edxdeals by Edxstore LLC logo"
                        width={150}
                        height={37}
                        className="w-32 h-auto object-contain"
                        style={{ maxHeight: '40px' }}
                      />
                    </Link>
                  </div>
                  <div className="relative mb-4">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search products..."
                      className="w-full rounded-lg bg-muted pl-10 h-9"
                      aria-label="Search products"
                    />
                  </div>
                  {navLinks.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      className="text-lg transition-colors hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
