import Header from "@/app/components/organism/Header/Header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={"w-full h-full flex flex-col justify-center items-center"}>
      {children}
    </div>
  );
}
