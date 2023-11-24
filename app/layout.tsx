import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "hip_zip",
  description: "힙합 앨범 리스트를 너희에게 제공하리라 ..",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body className={`${inter.className} h-full`}>
        <div className="h-full p-3 gap-10 flex flex-col items-center justify-center text-white font-bold text-4xl bg-gradient-to-r from-black to-gray-900 animate-gradient">
          {children}
        </div>
      </body>
    </html>
  );
}
