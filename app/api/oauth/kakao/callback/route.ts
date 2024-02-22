import { NextRequest } from "next/server";
import { cookies } from "next/headers";

export async function GET(request: NextRequest) {
  console.log("route.ts:5 -  = ");
  const searchParams = request.nextUrl.searchParams;
  const token = searchParams?.get("token");
  console.log("route.ts:7 - token = ", token);

  cookies().set("token", token || "");
  return Response.json({ status: "success" });
}
