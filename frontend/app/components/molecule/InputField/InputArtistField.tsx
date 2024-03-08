import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import useDebouncedSearch from "@/app/hook/useDebouncedSearch";
import { searchArtist } from "@/app/api/Client/requests";
import { GroupMemberType } from "@/app/components/organism/Modal/GroupModifyModal";
import XIcon from "@/app/components/atom/Icon/X-Icon";
import CarouselComponent from "@/app/components/molecule/Carousel/Carousel";
import { Simulate } from "react-dom/test-utils";
import { IArtist } from "@/app/components/type";

interface InputArtistFieldProps {
  label: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  artistInfo: IArtist;
  setArtistInfo: React.Dispatch<React.SetStateAction<IArtist>>;
}

const InputArtistField = (props: InputArtistFieldProps) => {
  const [response, onSearchQueryChange, resetResponse] =
    useDebouncedSearch<IArtist>((query: string) => searchArtist(query), 300);

  const [popOverStatus, setPopOverStatus] = useState<boolean>(false);

  const handleSaveMember = (artist: IArtist) => {
    props.setArtistInfo(artist);
    setPopOverStatus(false);
  };

  const handleDeleteMember = (member: GroupMemberType) => {};

  return (
    <div className={"flex justify-between items-center"}>
      <Label className="text-right w-24">{props.label}</Label>
      <span className={"w-[70%] h-22"}>
        <Popover open={popOverStatus} onOpenChange={setPopOverStatus}>
          <PopoverTrigger asChild>
            <Button variant="outline" className={"w-full"}>
              {props.artistInfo.name === ""
                ? "아티스트 검색"
                : props.artistInfo.name}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 bg-hipzip-black text-hipzip-white relative">
            <h4 className="font-medium leading-none text-sm text-center">
              클릭하여 아티스트를 선택하세요
            </h4>
            <div className={"mt-2 flex justify-center items-center"}>
              <CarouselComponent<IArtist>
                data={response}
                setData={handleSaveMember}
                close={() => setPopOverStatus(false)}
              />
            </div>
            <div className="mt-4 grid gap-2">
              <Input
                id="maxWidth"
                placeholder={"아티스트를 검색하세요"}
                onChange={onSearchQueryChange}
                className="col-span-2 h-8 text-hipzip-black text-center"
              />
            </div>
            <div className={"absolute top-2 right-2"}>
              {/*<Button*/}
              {/*  variant={"outline"}*/}
              {/*  onClick={() => setPopOverStatus((prev) => !prev)}*/}
              {/*>*/}
              {/*  확인*/}
              {/*</Button>*/}
              <XIcon
                className={"h-4 w-4"}
                onClick={() => setPopOverStatus((prev) => !prev)}
              />
            </div>
          </PopoverContent>
        </Popover>
      </span>
    </div>
  );
};

export default InputArtistField;
