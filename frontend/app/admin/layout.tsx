import Header from "@/app/components/organism/Header/Header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className={"h-full min-h-screen"}>{children}</div>;
}
