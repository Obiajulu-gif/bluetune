"use client";

import { useEffect, useState } from "react";

// This component ensures that child components only run on the client side
// It prevents hydration mismatches and issues with server-side rendering
export function ClientOnly({ children, fallback = null }: { children: React.ReactNode, fallback?: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return fallback;
  }

  return <>{children}</>;
}
