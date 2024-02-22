import { getAlbum } from "@/app/api/Client/requests";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = parseInt(searchParams?.get("page") || "0", 10); // Parse and provide a default value

  let nextCursor;

  const albums = await getAlbum(page);

  if (albums?.length === 0) {
    nextCursor = undefined;
  } else {
    nextCursor = page + 1;
  }

  return Response.json({ data: albums, nextCursor: nextCursor });
}
