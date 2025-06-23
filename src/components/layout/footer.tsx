import Link from 'next/link';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { LanguageSwitcher } from '@/components/shared/language-switcher';
import Image from 'next/image';
import { AccessibilityToolbar } from '@/components/shared/accessibility-toolbar';

const footerLinks = {
  company: [
    { href: '/about-us', label: 'About Us' },
    { href: '/careers', label: 'Careers' },
    { href: '/press', label: 'Press' },
  ],
  support: [
    { href: '/contact', label: 'Contact Us' },
    { href: '/faq', label: 'FAQs' },
    { href: '/shipping', label: 'Shipping & Returns' },
  ],
  legal: [
    { href: '/privacy-policy', label: 'Privacy Policy' },
    { href: '/terms-of-service', label: 'Terms of Service' },
    { href: '/cookie-policy', label: 'Cookie Policy' },
  ],
};

const socialLinks = [
  { href: '#', icon: Facebook, label: 'Facebook' },
  { href: '#', icon: Twitter, label: 'Twitter' },
  { href: '#', icon: Instagram, label: 'Instagram' },
  { href: '#', icon: Linkedin, label: 'LinkedIn' },
];

export default function Footer() {
  return (
    <footer className="bg-muted/50 border-t mt-12">
      <div className="container mx-auto px-4 py-10 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <Link href="/" className="inline-block mb-4">
              <Image
                src="/images/Edxdeals-logo.png"
                alt="Edxdeals Logo"
                width={120}
                height={30}
              />
            </Link>
            <p className="text-muted-foreground text-sm max-w-xs">
              Your one-stop shop for everything amazing. Discover quality, style, and innovation.
            </p>
          </div>
          
          <div>
            <h3 className="font-headline text-lg font-semibold mb-3 text-foreground">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map(link => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-headline text-lg font-semibold mb-3 text-foreground">Support</h3>
            <ul className="space-y-2">
              {footerLinks.support.map(link => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-headline text-lg font-semibold mb-3 text-foreground">Legal</h3>
            <ul className="space-y-2">
              {footerLinks.legal.map(link => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Edxdeals. All rights reserved.
          </p>
          <div className="flex items-center space-x-3">
            <LanguageSwitcher />
            {socialLinks.map(social => (
              <Link key={social.label} href={social.href} aria-label={social.label} className="text-muted-foreground hover:text-primary transition-colors">
                <social.icon className="h-5 w-5" />
              </Link>
            ))}
          </div>
        </div>
      </div>
      <AccessibilityToolbar />
    </footer>
  );
}
