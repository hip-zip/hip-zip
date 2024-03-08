import SearchAlbumInput from "@/app/components/molecule/SearchAlbumInput/SearchAlbumInput";
import ResultAlbumList from "@/app/main/search/ResultAlbumList";
import { IAlbumList } from "@/app/main/page";

interface SearchFormProps {
  searchQuery: (param: string) => void;
  albumList: IAlbumList[];
}

export const SearchForm = (props: SearchFormProps) => {
  return (
    <>
      <SearchAlbumInput searchQuery={props.searchQuery} />
      <ResultAlbumList albumList={props.albumList} />
    </>
  );
};
