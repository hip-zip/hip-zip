import Image from "next/image";
import RedirectButton from "@/app/components/atom/RedirectButton/RedirectButton";
import Logo from "@/public/static/logo.png";

export default function Home() {
  return (
    <div className={"h-screen flex flex-col justify-center items-center"}>
      <Image
        src={Logo}
        alt={"Logo Image"}
        width={300}
        height={300}
        className={"animate-bounce"}
      />
      <p className="text-4xl mb-10">hip_zip</p>
      <div className={"flex justify-center"}>
        <RedirectButton redirectUrl={"main"} />
      </div>
    </div>
  );
}
