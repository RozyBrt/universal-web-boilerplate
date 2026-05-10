"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { bootstrapDI } from "@/core/di/bootstrap";

import { Toaster } from "react-hot-toast";

bootstrapDI();

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster position="top-right" reverseOrder={false} />
      {children}
    </QueryClientProvider>
  );
}
