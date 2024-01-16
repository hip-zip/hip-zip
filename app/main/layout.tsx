"use client";

import Header from "@/app/components/organism/Header/Header";
import { QueryClient } from "@tanstack/react-query";
import { QueryClientProvider } from "@tanstack/react-query";
import Footer from "@/app/components/organism/Footer/Footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <div
        className={
          "w-full h-full flex flex-col justify-center items-center p-2 overflow-auto"
        }
      >
        {children}
      </div>
      <Footer />
    </QueryClientProvider>
  );
}
