import SearchInput from "@/app/components/molecule/SearchInput/SearchInput";
import ResultAlbumList from "@/app/main/search/ResultAlbumList";
import { AlbumListType } from "@/app/main/page";

interface SearchFormProps {
  searchQuery: (param: string) => void;
  albumList: AlbumListType[];
}

export const SearchForm = (props: SearchFormProps) => {
  return (
    <>
      <SearchInput searchQuery={props.searchQuery} />
      <ResultAlbumList albumList={props.albumList} />
    </>
  );
};
