import Header from "@/app/components/Header/Header";
import { QueryClient } from "@tanstack/react-query";
import { QueryClientProvider } from "@tanstack/react-query";
import Footer from "@/app/components/Footer/Footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={"flex flex-col items-center justify-center w-full"}>
      {children}
    </div>
  );
}
