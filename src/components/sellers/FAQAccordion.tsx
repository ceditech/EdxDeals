'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export default function FAQAccordion() {
  const faqs = [
    {
      q: 'How do I become a seller?',
      a: 'Apply using the Become a Seller form. Our team will review your application and contact you within 1–3 business days.',
    },
    {
      q: 'What are the fees?',
      a: 'We keep it simple: zero upfront fees and a competitive commission per sale. Detailed pricing is provided upon approval.',
    },
    {
      q: 'What support do you offer?',
      a: 'Dedicated seller support, educational resources, and performance tips to help grow your business.',
    },
    {
      q: 'How do payouts work?',
      a: 'Fast, reliable payouts to your preferred payment method. Settlement schedules are configurable in your dashboard.',
    },
    {
      q: 'Can I import my existing product catalog?',
      a: 'Yes. You can import products via CSV or connect via our API for bulk management.',
    },
  ];

  return (
    <section className="container mx-auto px-4 py-10" aria-labelledby="faq-title">
      <h2 id="faq-title" className="text-2xl md:text-3xl font-semibold mb-6 text-center">
        Frequently Asked Questions
      </h2>
      <div className="mx-auto max-w-3xl">
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((item, idx) => (
            <AccordionItem key={idx} value={`item-${idx}`}>
              <AccordionTrigger className="text-left">{item.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{item.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}