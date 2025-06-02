import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <Loader2 className="h-16 w-16 animate-spin text-primary mb-4" />
      <p className="text-xl font-semibold text-foreground font-headline">Loading FluxiCart...</p>
      <p className="text-muted-foreground">Please wait a moment.</p>
    </div>
  );
}
