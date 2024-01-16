import Header from "@/app/components/organism/Header/Header";
import { QueryClient } from "@tanstack/react-query";
import { QueryClientProvider } from "@tanstack/react-query";
import Footer from "@/app/components/organism/Footer/Footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={
        "h-full flex flex-col items-center justify-center w-full rounded"
      }
    >
      {children}
    </div>
  );
}
