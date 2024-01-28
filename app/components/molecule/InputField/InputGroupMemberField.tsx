import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import useDebouncedSearch from "@/app/hook/useDebouncedSearch";
import { searchArtist } from "@/app/hook/util";
import { GroupMemberType } from "@/app/components/organism/Modal/GroupModifyModal";
import XIcon from "@/app/components/atom/Icon/X-Icon";
import { ArtistImageType } from "@/app/components/atom/Images/Artist";
import { ArtistImageGridType } from "@/app/admin/artist/page";

interface TagInputFieldProps {
  label: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  groupMembers: {
    id: number;
    name: string;
    image: string;
  }[];
  setGroupMembers: React.Dispatch<React.SetStateAction<GroupMemberType[]>>;
}

const InputGroupMemberField = (props: TagInputFieldProps) => {
  const [response, onSearchQueryChange] =
    useDebouncedSearch<ArtistImageGridType>(
      (query: string) => searchArtist(query),
      300,
    );

  const [popOverStatus, setPopOverStatus] = useState<boolean>(false);

  const handleAddMember = (member: GroupMemberType) => {
    if (props.groupMembers) {
      if (!props.groupMembers.find((artist) => artist.id === member.id)) {
        props.setGroupMembers((prev) => {
          if (prev) {
            return [...prev, member];
          }
          return [];
        });
        return;
      }
      alert("이미 추가된 멤버입니다");
    }
  };

  const handleDeleteMember = (member: GroupMemberType) => {
    if (props.groupMembers) {
      const newGroupMembers = props.groupMembers.filter(
        (artist) => artist.id !== member.id,
      );
      props.setGroupMembers(newGroupMembers);
    }
  };

  useEffect(() => {}, []);

  return (
    <div className={"flex justify-between items-center"}>
      <Label className="text-right w-24">{props.label}</Label>
      <span className={"w-[70%] h-22"}>
        <Popover open={popOverStatus} onOpenChange={setPopOverStatus}>
          <PopoverTrigger asChild>
            <Button variant="outline" className={"w-full"}>
              그룹 멤버 확인 및 수정 하기
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 bg-hipzip-black text-hipzip-white relative">
            <h4 className="font-medium leading-none text-sm">
              멤버 목록(클릭하여 제외)
            </h4>
            <div className={"mt-2"}>
              {props.groupMembers?.map((member) => {
                return (
                  <Image
                    key={member.id}
                    src={member.image}
                    width={49}
                    height={49}
                    className={"rounded-full inline-block m-1"}
                    alt={"개발자한테 사진 넣으라고 전해주세요"}
                    onClick={() => handleDeleteMember(member)}
                  />
                );
              })}
            </div>
            <h4 className="font-medium leading-none mt-4 text-sm">
              검색결과(검색 후 클릭하여 추가하세요)
            </h4>
            <div className={"mt-2"}>
              {response?.map((artist) => {
                return (
                  <Image
                    key={artist.id}
                    src={artist.image}
                    width={49}
                    height={49}
                    className={"rounded-full inline-block m-1"}
                    alt={"NO IMAGE"}
                    onClick={() => handleAddMember(artist)}
                  />
                );
              })}
            </div>
            <div className="mt-4 grid gap-2">
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="maxWidth">아티스트 검색</Label>
                <Input
                  id="maxWidth"
                  placeholder={"아티스트를 검색하세요"}
                  onChange={onSearchQueryChange}
                  className="col-span-2 h-8 text-hipzip-black"
                />
              </div>
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

export default InputGroupMemberField;
