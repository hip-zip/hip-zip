import Header from "@/app/components/Header/Header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <div className={"w-full flex flex-col gap-2"}>{children}</div>
    </>
  );
}
