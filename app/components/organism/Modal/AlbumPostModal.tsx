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
import { postAlbum, postArtist, searchArtist } from "@/app/api/Client/requests";
import ConfirmDialog from "@/app/components/atom/ConfirmDialog/ConfirmDialog";
import { useToast } from "@/components/ui/use-toast";
import InputDateField from "@/app/components/molecule/InputField/InputDateField";
import useDebouncedSearch from "@/app/hook/useDebouncedSearch";
import InputArtistField from "@/app/components/molecule/InputField/InputArtistField";
import { ArtistType } from "@/app/components/type";
import { convertDate } from "@/lib/utils";

export interface AlbumPostFormType {
  // essential values
  name: string;
  image: string;
  releaseDate: string; // 2024-02-08
  musicVideo: string;
  artistId: number; // 앨범과 아티스트는 무조건 1:1 관계, 사람이 많으면 그룹 아이디로
}

interface AlbumPostModalProps {
  open: boolean;
  setOpen: React.Dispatch<boolean>;
}

const AlbumPostModal = (props: AlbumPostModalProps) => {
  const { toast } = useToast();

  const [response, onSearchQueryChange] = useDebouncedSearch<ArtistType>(
    (query: string) => searchArtist(query),
    300,
  );

  const [artistInfo, setArtistInfo] = useState<ArtistType>({
    name: "",
    image: "",
    id: -1,
    artistType: "SOLO",
  });

  const [formValue, setFormValue] = useState<AlbumPostFormType>({
    name: "",
    image: "",
    releaseDate: convertDate(new Date()),
    musicVideo: "",
    artistId: -1,
  });
  const [handleNameChange] = useFormInput<AlbumPostFormType>(
    setFormValue,
    "name",
  );
  const [handleImageChange] = useFormInput<AlbumPostFormType>(
    setFormValue,
    "image",
  );
  const [handleMusicVideoChange] = useFormInput<AlbumPostFormType>(
    setFormValue,
    "musicVideo",
  );

  const handleAlbumReleaseDateChange = (date: Date | undefined) => {
    if (date) {
      setFormValue((prev) => {
        return {
          ...prev,
          releaseDate: convertDate(date),
        };
      });
    }
  };

  // const [handleReleaseDateChange] = useFormInput<AlbumPostFormType>(
  //   setFormValue,
  //   "",
  // );

  // const [artistType, setArtistType] = useState<string>("SOLO");
  // const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {}, [formValue]);

  const handleAlbumSubmit = async () => {
    if (artistInfo.id === -1) {
      alert("아티스트를 선택해주세요.");
      return;
    }

    if (
      formValue.name === "" ||
      formValue.image === "" ||
      formValue.releaseDate === ""
    ) {
      alert("입력 값을 다시 한 번 확인해주세요");
      return;
    }

    try {
      const params = {
        ...formValue,
        artistId: artistInfo.id,
      };

      const response = await postAlbum<AlbumPostFormType>(params);

      if (response.ok) {
        toast({
          variant: "default",
          title: "앨범 등록 성공",
          description: `"${formValue.name}" 앨범이 등록되었습니다.`,
          className: "bg-hipzip-black text-hipzip-white",
        });

        setFormValue({
          name: "",
          image: "",
          releaseDate: convertDate(new Date()),
          musicVideo: "",
          artistId: -1,
        });
        props.setOpen(false);
      }
    } catch (e) {}
  };

  return (
    // Trigger 버튼은 외부 컴포넌트로 빼서 관리해야 핧 듯
    <>
      <Dialog open={props.open} onOpenChange={props.setOpen}>
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
            />
            <InputDateField
              label={"앨범 발매일"}
              onSelect={handleAlbumReleaseDateChange}
            />
            <InputField
              label={"앨범 이미지"}
              onChange={handleImageChange}
              placeholder={"https://example.com/example.jpg"}
              value={formValue.image}
            />
            <InputField
              label={"뮤직 비디오"}
              onChange={handleMusicVideoChange}
              placeholder={
                "https://www.youtube.com/embed/nZ5SfoLB5yA?si=l7i-idwk4RyUO9K9"
              }
              value={formValue.musicVideo}
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
