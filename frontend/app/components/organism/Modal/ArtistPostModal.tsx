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
import { postArtist } from "@/app/api/Client/requests";
import ConfirmDialog from "@/app/components/atom/ConfirmDialog/ConfirmDialog";
import { useToast } from "@/components/ui/use-toast";
import InputComboBoxField from "@/app/components/molecule/InputField/InputComboBoxField";

export interface ArtistPostType {
  name: string;
  image: string;
  artistType: string;
  hashtag: Array<string>;
}

interface ArtistModalProps {
  open: boolean;
  setOpen: React.Dispatch<boolean>;
}

const ArtistPostModal = (props: ArtistModalProps) => {
  const { toast } = useToast();

  const [formValue, setFormValue] = useState<ArtistPostType>({
    name: "",
    image: "",
    artistType: "SOLO",
    hashtag: [],
  });
  const [handleNameChange] = useFormInput<ArtistPostType>(setFormValue, "name");
  const [handleImageChange] = useFormInput<ArtistPostType>(
    setFormValue,
    "image",
  );
  const [hashtag, handleHashtagChange, handleHashtagInputKeyDown] =
    useContinualInput<ArtistPostType>(
      formValue.hashtag,
      setFormValue,
      "hashtag",
    );

  const [artistType, setArtistType] = useState<string>("SOLO");

  useEffect(() => {
    setFormValue({
      name: "",
      image: "",
      artistType: "SOLO",
      hashtag: [],
    });
  }, [props.open]);

  const handleArtistSubmit = async () => {
    try {
      const params = {
        ...formValue,
        artistType,
      };

      const response = await postArtist<ArtistPostType>(params);

      if (response.ok) {
        toast({
          variant: "default",
          title: "아티스트 등록 성공",
          description: `${formValue.name} 아티스트가 등록되었습니다.`,
          className: "bg-hipzip-black text-hipzip-white",
        });

        setFormValue({
          name: "",
          image: "",
          artistType: "SOLO",
          hashtag: [],
        });

        props.setOpen(false);
      }
    } catch (e) {}
  };

  return (
    <>
      <Dialog open={props.open} onOpenChange={props.setOpen}>
        <DialogTrigger
          className={
            "p-3 fixed bg-hipzip-black bottom-10 left-10 text-sm rounded-lg border border-hipzip-white"
          }
        >
          아티스트 등록하기
        </DialogTrigger>
        <DialogContent className={"bg-hipzip-black text-hipzip-white"}>
          <DialogHeader>
            <DialogTitle className={"mb-3"}>아티스트 등록하기</DialogTitle>
            <DialogDescription>
              - 아티스트의 이름 입력시 본명이 아닌 A.K.A(활동명)으로
              작성해주세요.
            </DialogDescription>
            <DialogDescription>
              - 아티스트의 이미지 입력시 URL을 입력하셔야 합니다.
            </DialogDescription>
            <DialogDescription>
              - 검색 힌트 입력시 단어를 입력 후 엔터를 치시면 됩니다.
            </DialogDescription>
            <DialogDescription>
              - 키드밀리를 예로 들면 KID MILLI, 최원재 등으로 입력하시면 됩니다.
            </DialogDescription>
          </DialogHeader>
          <div className={"flex flex-col gap-3"}>
            <InputField
              label={"아티스트 이름"}
              placeholder={"Jvcki Wai"}
              onChange={handleNameChange}
              value={formValue.name}
            />
            <InputField
              label={"아티스트 이미지"}
              placeholder={
                "https://cdnimg.melon.co.kr/cm2/artistcrop/images/030/50/061/3050061_20231222114532_500.jpg?c31cf111d2073dd41ff3eb8fb8ec3ca2/melon/resize/416/quality/80/optimize"
              }
              onChange={handleImageChange}
              value={formValue.image}
            />
            <InputComboBoxField
              label={"솔로/그룹 구분"}
              key={"artistType"}
              onSelect={setArtistType}
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
              target={"아티스트"}
              ok={handleArtistSubmit}
              action={"등록"}
            />
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ArtistPostModal;
