import Image from "next/image";
import RedirectButton from "@/app/components/atom/Button/RedirectButton";
import Logo from "@/public/static/logo.png";
import Label from "@/app/components/atom/Label/Label";

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
      <Label
        className={"text-4xl s-core-bold text-hipzip-white pb-5"}
        message={"HIPZIP"}
      />
      <div className={"flex justify-center"}>
        <RedirectButton
          redirectUrl={"main"}
          message={"앨범 리스트를 확인하러 가봅시다 🔥"}
        />
      </div>
    </div>
  );
}
