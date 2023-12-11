"use client";

import Header from "@/app/components/Header/Header";
import { QueryClient } from "@tanstack/react-query";
import { QueryClientProvider } from "@tanstack/react-query";
import Footer from "@/app/components/Footer/Footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();
  return (
    <div className={"w-full flex flex-col justify-center items-center p-10"}>
      {children}
    </div>
  );
}
