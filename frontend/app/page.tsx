import IntroContainer from "@/app/components/template/Intro/IntroContainer";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {
  if (cookies().get("token")) {
    redirect("/main");
  }

  return <IntroContainer />;
}
