"use client";

import React, { useState } from "react";
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
import TagInputField from "@/app/components/molecule/InputField/TagInputField";
import useFormInput from "@/app/hook/useFormInput";
import useContinualInput from "@/app/hook/useContinualInput";
import { postArtist } from "@/app/hook/util";
import ConfirmDialog from "@/app/components/atom/ConfirmDialog/ConfirmDialog";
import { useToast } from "@/components/ui/use-toast";
import InputComboBoxField from "@/app/components/molecule/InputField/InputComboBoxField";
interface ArtistModalProps {}

export interface ArtistPostType {
  name: string;
  image: string;
  artistType: string;
  hashtag: Array<string>;
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
  const [open, setOpen] = useState<boolean>(false);

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

        setOpen(false);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
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
            <InputField label={"아티스트 이름"} onChange={handleNameChange} />
            <InputField
              label={"아티스트 이미지"}
              onChange={handleImageChange}
            />
            <InputComboBoxField
              label={"솔로/그룹 구분"}
              key={"artistType"}
              onSelect={setArtistType}
            />
            <TagInputField
              label={"검색 힌트"}
              placeholder={"지코, ZICO, 우지호"}
              className={"m-0"}
              onChange={handleHashtagChange}
              onKeyDown={handleHashtagInputKeyDown}
              tagList={formValue.hashtag}
            />
          </div>
          <DialogFooter>
            <ConfirmDialog ok={handleArtistSubmit} action={"등록"} />
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ArtistPostModal;
