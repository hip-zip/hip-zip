import Image from "next/image";
import RedirectButton from "@/app/components/Buttons/RedirectButton";

export default function Home() {
  return (
    <div>
      <p className="text-9xl animate-bounce mb-10">hip_zip</p>
      <div className={"flex justify-center"}>
        <RedirectButton redirectUrl={"main"} />
      </div>
    </div>
  );
}
