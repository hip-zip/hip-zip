"use client";

import Header from "@/app/components/organism/Header/Header";
import { QueryClient } from "@tanstack/react-query";
import { QueryClientProvider } from "@tanstack/react-query";
import Footer from "@/app/components/organism/Footer/Footer";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={"w-full flex flex-col justify-center items-center p-10"}>
      {children}
    </div>
  );
}
