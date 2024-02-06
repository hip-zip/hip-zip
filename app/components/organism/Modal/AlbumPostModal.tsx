"use client";

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import InputField from "@/app/components/molecule/InputField/InputField";
import InputHashtagField from "@/app/components/molecule/InputField/InputHashtagField";
import useFormInput from "@/app/hook/useFormInput";
import useContinualInput from "@/app/hook/useContinualInput";
import { postArtist, searchArtist } from "@/app/api/fetch/api";
import ConfirmDialog from "@/app/components/atom/ConfirmDialog/ConfirmDialog";
import { useToast } from "@/components/ui/use-toast";
import InputComboBoxField from "@/app/components/molecule/InputField/InputComboBoxField";
import { DatePicker } from "@/app/components/atom/DatePicker/DatePicker";
import InputDateField from "@/app/components/molecule/InputField/InputDateField";
import useDebouncedSearch from "@/app/hook/useDebouncedSearch";
import { ArtistImageGridType } from "@/app/admin/artist/page";
import InputArtistField from "@/app/components/molecule/InputField/InputArtistField";

export interface AlbumPostFormType {
  // essential values
  name: string;
  image: string;
  releaseDate: Date; // string이 될수도 있음
  artistId: number; // 앨범과 아티스트는 무조건 1:1 관계, 사람이 많으면 그룹 아이디로
  hashtag: Array<string>;

  // optional values
  description?: string;
  musicVideo?: string; // youtube MV URL
}

interface AlbumPostModalProps {
  open: boolean;
  setOpen: React.Dispatch<boolean>;
}

const AlbumPostModal = (props: AlbumPostModalProps) => {
  const { toast } = useToast();

  const [response, onSearchQueryChange] =
    useDebouncedSearch<ArtistImageGridType>(
      (query: string) => searchArtist(query),
      300,
    );

  const [artistInfo, setArtistInfo] = useState<ArtistImageGridType>({
    name: "",
    image: "",
    id: -1,
    artistType: "SOLO",
  });

  const [formValue, setFormValue] = useState<AlbumPostFormType>({
    name: "",
    image: "",
    releaseDate: new Date(),
    artistId: 0,
    hashtag: [],
  });
  const [handleNameChange] = useFormInput<AlbumPostFormType>(
    setFormValue,
    "name",
  );
  const [handleImageChange] = useFormInput<AlbumPostFormType>(
    setFormValue,
    "image",
  );

  const handleAlbumReleaseDateChange = (date: Date | undefined) => {
    if (date) {
      setFormValue((prev) => {
        return {
          ...prev,
          releaseDate: date,
        };
      });
    }
  };

  const [hashtag, handleHashtagChange, handleHashtagInputKeyDown] =
    useContinualInput<AlbumPostFormType>(
      formValue.hashtag,
      setFormValue,
      "hashtag",
    );
  const [date, setDate] = useState<Date>(new Date());

  // const [handleReleaseDateChange] = useFormInput<AlbumPostFormType>(
  //   setFormValue,
  //   "",
  // );

  // const [artistType, setArtistType] = useState<string>("SOLO");
  // const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    console.log("AlbumPostModal.tsx:81 - formValue = ", formValue);
  }, [formValue]);

  const handleAlbumSubmit = async () => {
    try {
      // const params = {
      //   ...formValue,
      //   artistType,
      // };

      // const response = await postArtist<AlbumPostFormType>(params);

      // if (response.ok) {
      //   toast({
      //     variant: "default",
      //     title: "아티스트 등록 성공",
      //     description: `${formValue.name} 아티스트가 등록되었습니다.`,
      //     className: "bg-hipzip-black text-hipzip-white",
      //   });
      //
      //   setFormValue({
      //     name: "",
      //     image: "",
      //     artistType: "SOLO",
      //     hashtag: [],
      //   });
      //
      props.setOpen(false);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    // Trigger 버튼은 외부 컴포넌트로 빼서 관리해야 핧 듯
    <>
      <Dialog open={props.open} onOpenChange={props.setOpen}>
        {/*<DialogTrigger*/}
        {/*  className={*/}
        {/*    "p-3 fixed bg-hipzip-black bottom-10 left-10 text-sm rounded-lg border border-hipzip-white"*/}
        {/*  }*/}
        {/*>*/}
        {/*  앨범 등록하기*/}
        {/*</DialogTrigger>*/}
        <DialogContent className={"bg-hipzip-black text-hipzip-white"}>
          <DialogHeader>
            <DialogTitle className={"mb-3"}>앨범 등록하기</DialogTitle>
            <DialogDescription>
              - 아티스트는 한 명만 넣으실 수 있습니다.
            </DialogDescription>
            <DialogDescription>
              - 앨범 이미지 입력시 URL을 입력하셔야 합니다.
            </DialogDescription>
          </DialogHeader>
          <div className={"flex flex-col gap-3"}>
            <InputField
              label={"앨범 이름"}
              onChange={handleNameChange}
              placeholder={"2 MANY HOMES 4 1 KID"}
              value={formValue.name}
            />
            <InputArtistField
              label={"아티스트 이름"}
              onChange={onSearchQueryChange}
              placeholder={"입력하여 검색하세요"}
              artistInfo={artistInfo}
              setArtistInfo={setArtistInfo}
              value={formValue.name}
            />
            <InputField
              label={"앨범 이미지"}
              onChange={handleImageChange}
              placeholder={"https://example.com/example.jpg"}
              value={formValue.image}
            />
            <InputDateField
              label={"앨범 발매일"}
              onSelect={handleAlbumReleaseDateChange}
            />
            <InputHashtagField
              label={"검색 힌트"}
              placeholder={"지코, ZICO, 우지호"}
              className={"m-0"}
              onChange={handleHashtagChange}
              onKeyDown={handleHashtagInputKeyDown}
              tagList={formValue.hashtag}
            />
          </div>
          <DialogFooter>
            <ConfirmDialog
              target={"앨범"}
              action={"등록"}
              ok={handleAlbumSubmit}
            />
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AlbumPostModal;
