import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import AiAssistantWidget from '@/components/layout/ai-assistant-widget';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Edxdeals',
  description: 'Welcome to Edxdeals - Your Modern E-commerce Destination',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className={cn("font-body antialiased min-h-screen flex flex-col")} suppressHydrationWarning={true}>
        <div className="flex-grow">
          {children}
        </div>
        <Toaster />
        <AiAssistantWidget />
      </body>
    </html>
  );
}
