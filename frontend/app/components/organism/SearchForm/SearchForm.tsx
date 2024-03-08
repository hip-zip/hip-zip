import SearchAlbumInput from "@/app/components/molecule/SearchAlbumInput/SearchAlbumInput";
import ResultAlbumList from "@/app/main/search/ResultAlbumList";

export interface ISupabaseAlbumList {
  id: number;
  album_name: string;
  album_description: string;
  album_image: string;
  album_tracks: string[];
  album_release_date: string;
  music_video: string;
  artist_name: string;
  artist_image: string;
} // TODO: Deprecate Soon

interface SearchFormProps {
  searchQuery: (param: string) => void;
  albumList: ISupabaseAlbumList[];
}

export const SearchForm = (props: SearchFormProps) => {
  return (
    <>
      <SearchAlbumInput searchQuery={props.searchQuery} />
      <ResultAlbumList albumList={props.albumList} />
    </>
  );
};
