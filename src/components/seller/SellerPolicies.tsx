'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Package, Clock as RotateIcon, CheckCircle, Clock, DollarSign } from 'lucide-react';
import type { SellerShopData } from '@/lib/seller-mock-data';

interface SellerPoliciesProps {
  policies: SellerShopData['policies'];
}

export default function SellerPolicies({ policies }: SellerPoliciesProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Policies & Information</CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          {/* Shipping Policy */}
          <AccordionItem value="shipping">
            <AccordionTrigger className="text-left">
              <div className="flex items-center gap-2">
                <Package className="w-4 h-4 text-blue-600" />
                <span>Shipping & Delivery</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                {/* Processing Time */}
                <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
                  <Clock className="w-4 h-4 text-blue-600" />
                  <div>
                    <div className="font-medium text-sm">Processing Time</div>
                    <div className="text-sm text-gray-600">{policies.shipping.processingTime}</div>
                  </div>
                </div>

                {/* Free Shipping Threshold */}
                {policies.shipping.freeShippingThreshold && (
                  <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
                    <DollarSign className="w-4 h-4 text-green-600" />
                    <div>
                      <div className="font-medium text-sm">Free Shipping</div>
                      <div className="text-sm text-gray-600">
                        On orders over {policies.shipping.freeShippingThreshold}
                      </div>
                    </div>
                  </div>
                )}

                {/* Shipping Methods */}
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Available Shipping Methods:</h4>
                  {policies.shipping.methods.map((method, index) => (
                    <div key={index} className="border rounded-lg p-3">
                      <div className="flex justify-between items-start mb-1">
                        <span className="font-medium text-sm">{method.name}</span>
                        <Badge variant="outline" className="text-xs">
                          {method.price}
                        </Badge>
                      </div>
                      <div className="text-xs text-gray-600 mb-1">
                        Estimated delivery: {method.estimatedDays} business days
                      </div>
                      <div className="text-xs text-gray-500">
                        {method.description}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Returns Policy */}
          <AccordionItem value="returns">
            <AccordionTrigger className="text-left">
              <div className="flex items-center gap-2">
                <RotateIcon className="w-4 h-4 text-green-600" />
                <span>Returns & Exchanges</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                {/* Return Period */}
                <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
                  <Clock className="w-4 h-4 text-green-600" />
                  <div>
                    <div className="font-medium text-sm">Return Period</div>
                    <div className="text-sm text-gray-600">{policies.returns.period}</div>
                  </div>
                </div>

                {/* Return Process */}
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Return Process:</h4>
                  <p className="text-sm text-gray-600">{policies.returns.process}</p>
                </div>

                {/* Return Conditions */}
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Return Conditions:</h4>
                  <ul className="space-y-1">
                    {policies.returns.conditions.map((condition, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0" />
                        {condition}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Warranty Policy */}
          <AccordionItem value="warranty">
            <AccordionTrigger className="text-left">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-purple-600" />
                <span>Warranty & Support</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                {/* Warranty Period */}
                <div className="flex items-center gap-2 p-3 bg-purple-50 rounded-lg">
                  <Clock className="w-4 h-4 text-purple-600" />
                  <div>
                    <div className="font-medium text-sm">Warranty Period</div>
                    <div className="text-sm text-gray-600">{policies.warranty.period}</div>
                  </div>
                </div>

                {/* Warranty Coverage */}
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Warranty Coverage:</h4>
                  <ul className="space-y-1">
                    {policies.warranty.coverage.map((item, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* Quick Info Summary */}
        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="grid grid-cols-1 gap-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Processing Time:</span>
              <span className="font-medium">{policies.shipping.processingTime}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Return Period:</span>
              <span className="font-medium">{policies.returns.period}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Warranty:</span>
              <span className="font-medium">{policies.warranty.period}</span>
            </div>
            
            {policies.shipping.freeShippingThreshold && (
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Free Shipping:</span>
                <span className="font-medium">{policies.shipping.freeShippingThreshold}+</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}