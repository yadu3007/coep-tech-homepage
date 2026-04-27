import { Toaster } from "@/components/ui/sonner";
import type { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {children}
      <Toaster />
    </div>
  );
}
