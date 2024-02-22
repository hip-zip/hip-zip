import { NextRequest } from "next/server";
import { cookies } from "next/headers";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const token = searchParams?.get("token");

  cookies().set("token", token || "");
  return Response.json({ status: "success" });
}
