import Management from "@/app/components/template/Management/Management";

async function fetchMoreArtists() {
  "use server";
  // const artists = await
}

export default function Page() {
  return <Management type={"artists"} />;
}
