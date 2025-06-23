"use client";

import { Contrast, ALargeSmall, ZoomIn, ZoomOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useState, useEffect } from 'react';

export function AccessibilityToolbar() {
  const [isHighContrast, setIsHighContrast] = useState(false);
  const [fontSize, setFontSize] = useState(100); // Percentage
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const toggleHighContrast = () => {
    setIsHighContrast(!isHighContrast);
    // In a real app, this would toggle a class on the body or change theme variables
    document.body.classList.toggle('high-contrast-mode', !isHighContrast);
    console.log("High contrast mode toggled:", !isHighContrast);
  };

  const adjustFontSize = (adjustment: number) => {
    const newSize = Math.max(80, Math.min(150, fontSize + adjustment)); // Clamp between 80% and 150%
    setFontSize(newSize);
    // In a real app, this would adjust the root font size
    document.documentElement.style.fontSize = `${newSize}%`;
    console.log("Font size adjusted to:", newSize, "%");
  };
  
  if (!isClient) {
    return null; // Don't render toolbar on SSR to avoid hydration issues
  }

  return (
    <TooltipProvider>
      {/* Position the toolbar slightly above the AI assistant widget to avoid overlap */}
      <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 bg-card p-2 rounded-full shadow-lg border flex items-center space-x-1">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" onClick={toggleHighContrast} aria-pressed={isHighContrast} className="h-9 w-9 rounded-full">
              <Contrast className="h-5 w-5" />
              <span className="sr-only">Toggle High Contrast</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{isHighContrast ? "Disable" : "Enable"} High Contrast</p>
          </TooltipContent>
        </Tooltip>

        <Separator orientation="vertical" className="h-6" />
        
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" onClick={() => adjustFontSize(-10)} aria-label="Decrease font size" className="h-9 w-9 rounded-full">
              <ZoomOut className="h-5 w-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Decrease Font Size</p>
          </TooltipContent>
        </Tooltip>
        
        <div className="text-xs w-8 text-center text-muted-foreground select-none">{fontSize}%</div>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" onClick={() => adjustFontSize(10)} aria-label="Increase font size" className="h-9 w-9 rounded-full">
              <ZoomIn className="h-5 w-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Increase Font Size</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}
