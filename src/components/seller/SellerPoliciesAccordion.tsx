'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  ChevronDown,
  ChevronUp,
  Package,
  Clock,
  DollarSign,
  CheckCircle,
  Phone,
  MessageSquare
} from 'lucide-react';
import type { SellerShopData } from '@/lib/seller-mock-data';

interface SellerPoliciesAccordionProps {
  seller: SellerShopData;
}

interface AccordionSection {
  id: string;
  title: string;
  icon: React.ReactNode;
  badge?: string;
  content: React.ReactNode;
}

export default function SellerPoliciesAccordion({ seller }: SellerPoliciesAccordionProps) {
  const [openSections, setOpenSections] = useState<Set<string>>(new Set(['shipping']));

  const toggleSection = (sectionId: string) => {
    const newOpenSections = new Set(openSections);
    if (newOpenSections.has(sectionId)) {
      newOpenSections.delete(sectionId);
    } else {
      newOpenSections.add(sectionId);
    }
    setOpenSections(newOpenSections);
  };

  const sections: AccordionSection[] = [
    {
      id: 'shipping',
      title: 'Shipping & Delivery',
      icon: <Package className="w-5 h-5" />,
      badge: seller.policies.shipping.freeShippingThreshold ? `Free over ${seller.policies.shipping.freeShippingThreshold}` : undefined,
      content: (
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Shipping Methods</h4>
            <div className="space-y-3">
              {seller.policies.shipping.methods.map((method, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium text-gray-900">{method.name}</div>
                    <div className="text-sm text-gray-600">{method.description}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-gray-900">{method.price}</div>
                    <div className="text-sm text-gray-600">{method.estimatedDays} days</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
              <Clock className="w-5 h-5 text-blue-600" />
              <div>
                <div className="font-medium text-gray-900">Processing Time</div>
                <div className="text-sm text-gray-600">{seller.policies.shipping.processingTime}</div>
              </div>
            </div>
            
            {seller.policies.shipping.freeShippingThreshold && (
              <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                <DollarSign className="w-5 h-5 text-green-600" />
                <div>
                  <div className="font-medium text-gray-900">Free Shipping</div>
                  <div className="text-sm text-gray-600">Orders over {seller.policies.shipping.freeShippingThreshold}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      ),
    },
    {
      id: 'returns',
      title: 'Returns & Refunds',
      icon: <Clock className="w-5 h-5" />,
      badge: seller.policies.returns.period,
      content: (
        <div className="space-y-4">
          <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <div>
              <div className="font-medium text-gray-900">Return Period</div>
              <div className="text-sm text-gray-600">{seller.policies.returns.period} return window</div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Return Conditions</h4>
            <ul className="space-y-2">
              {seller.policies.returns.conditions.map((condition, index) => (
                <li key={index} className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700">{condition}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-4 bg-blue-50 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-2">Return Process</h4>
            <p className="text-sm text-gray-700">{seller.policies.returns.process}</p>
          </div>
        </div>
      ),
    },
    {
      id: 'warranty',
      title: 'Warranty & Support',
      icon: <CheckCircle className="w-5 h-5" />,
      badge: seller.policies.warranty.period,
      content: (
        <div className="space-y-4">
          <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
            <CheckCircle className="w-5 h-5 text-purple-600" />
            <div>
              <div className="font-medium text-gray-900">Warranty Period</div>
              <div className="text-sm text-gray-600">{seller.policies.warranty.period} warranty included</div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Coverage Includes</h4>
            <ul className="space-y-2">
              {seller.policies.warranty.coverage.map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ),
    },
    {
      id: 'support',
      title: 'Customer Support',
      icon: <MessageSquare className="w-5 h-5" />,
      badge: seller.stats.responseTime,
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
              <Clock className="w-5 h-5 text-blue-600" />
              <div>
                <div className="font-medium text-gray-900">Response Time</div>
                <div className="text-sm text-gray-600">{seller.stats.responseTime}</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
              <MessageSquare className="w-5 h-5 text-green-600" />
              <div>
                <div className="font-medium text-gray-900">Support Hours</div>
                <div className="text-sm text-gray-600">Mon-Fri 9AM-6PM EST</div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-gray-900">Contact Methods</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Button variant="outline" className="justify-start">
                <MessageSquare className="w-4 h-4 mr-2" />
                Live Chat
              </Button>
              <Button variant="outline" className="justify-start">
                <Phone className="w-4 h-4 mr-2" />
                Phone Support
              </Button>
            </div>
          </div>

          <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <div className="flex items-start gap-2">
              <Clock className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
              <div>
                <div className="font-medium text-yellow-800">Support Notice</div>
                <div className="text-sm text-yellow-700 mt-1">
                  For urgent issues, please use live chat for fastest response. Phone support available during business hours.
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section className="py-8 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Shipping & Policies
          </h2>
          <p className="text-gray-600">
            Everything you need to know about shopping with {seller.name}
          </p>
        </div>

        <div className="space-y-4">
          {sections.map((section) => {
            const isOpen = openSections.has(section.id);
            
            return (
              <Card key={section.id} className="overflow-hidden">
                <button
                  onClick={() => toggleSection(section.id)}
                  className="w-full p-6 text-left hover:bg-gray-50 transition-colors duration-200"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                        {section.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 text-lg">
                          {section.title}
                        </h3>
                        {section.badge && (
                          <Badge variant="outline" className="mt-1 text-xs">
                            {section.badge}
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {isOpen ? (
                        <ChevronUp className="w-5 h-5 text-gray-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                  </div>
                </button>

                {isOpen && (
                  <CardContent className="px-6 pb-6 pt-0 border-t border-gray-100">
                    <div className="animate-fade-in">
                      {section.content}
                    </div>
                  </CardContent>
                )}
              </Card>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
          <div className="text-center">
            <h3 className="font-semibold text-gray-900 mb-2">
              Need Help with Your Order?
            </h3>
            <p className="text-gray-600 mb-4">
              Our customer support team is here to help you with any questions.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                <MessageSquare className="w-4 h-4 mr-2" />
                Contact Support
              </Button>
              <Button variant="outline">
                <Phone className="w-4 h-4 mr-2" />
                Call Us
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}