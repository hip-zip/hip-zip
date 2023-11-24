import Image from "next/image";
import Cdd from "../../../public/static/cddProfile.jpeg";
import Link from "next/link";

export default function Page() {
  return (
    <div className={"h-full overflow-auto max-h-fit"}>
      <p className={"font-mono text-4xl text-center"}>Developer</p>
      <Link href={"https://github.com/devcdd/hip_zip"}>
        <Image
          src={Cdd}
          alt={"개발자한테 사진 넣으라고 말해주세요"}
          className={"rounded-full m-10 cursor-pointer"}
          width={300}
          height={300}
        />
      </Link>
      <div className={"border-2 border-sky-500 p-5"}>
        <p className={"font-mono text-xl text-center"}>Front-End Developer</p>
        <p className={"font-mono text-xl text-center"}>DB structure,</p>
        <p className={"font-mono text-xl text-center"}>Service Planning</p>
      </div>
      <p className={"font-mono mt-10 font-sans text-4xl text-center"}>
        Contribute
      </p>
      <p className={"font-mono mt-10 font-sans text-4xl text-center"}>
        Contact
      </p>
      <div className={"mt-10 border-2 border-sky-500 p-5"}>
        <p className={"font-mono text-xl text-center"}>E-Mail</p>
        <p className={"font-mono text-xl text-center"}>
          developer.cdd@gmail.com
        </p>
      </div>
    </div>
  );
}
