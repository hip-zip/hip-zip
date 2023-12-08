import React from "react";

interface SearchInputProps {
  searchQuery: (param: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = (props: { searchQuery }) => {
  const handleSearchInputChange = async (event) => {
    props.searchQuery(event.target.value);
  };

  return (
    <>
      <div className={"text-2xl md:text-3xl xl:text-4xl pb-10"}>
        앨범, 아티스트 이름으로 검색해보세요 !
      </div>
      <input
        className="placeholder:text-gray-300 w-9/12 bg-transparent border border-slate-300 rounded-md p-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
        placeholder=""
        type="text"
        name="search"
        onChange={handleSearchInputChange}
      />
    </>
  );
};

export default SearchInput;
