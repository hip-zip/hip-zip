import ArtistManagement from "@/app/components/template/Management/ArtistManagement";

async function fetchMoreArtists() {
  "use server";
  // const artists = await
}

export default function Page() {
  return <ArtistManagement type={"artists"} />;
}
