"use client";

import React, { useEffect, useState } from "react";
import { RocketIcon } from "@radix-ui/react-icons";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import InputField from "@/app/components/molecule/InputField/InputField";
import TagInputField from "@/app/components/molecule/InputField/TagInputField";
import useFormInput from "@/app/hook/useFormInput";
import useInput from "@/app/hook/useInput";
import useContinualInput from "@/app/hook/useContinualInput";
import InputDropDownField from "@/app/components/molecule/InputField/InputDropDownField";
import { postArtist } from "@/app/hook/util";
import ConfirmDialog from "@/app/components/atom/ConfirmDialog/ConfirmDialog";
interface ArtistModalProps {}

export interface ArtistFormType {
  name: string;
  image: string;
  artistType: string;
  artistTags: Array<string>;
}

const ArtistModal = (props: ArtistModalProps) => {
  const [formValue, setFormValue] = useState<ArtistFormType>({
    name: "",
    image: "",
    artistType: "SOLO",
    artistTags: [],
  });
  const [handleNameChange] = useFormInput<ArtistFormType>(setFormValue, "name");
  const [handleImageChange] = useFormInput<ArtistFormType>(
    setFormValue,
    "image",
  );
  const [tag, handleTagChange, handleTagInputKeyDown] =
    useContinualInput<ArtistFormType>(
      formValue.artistTags,
      setFormValue,
      "artistTags",
    );

  const [open, setOpen] = useState<boolean>(false);
  const handleArtistSubmit = async () => {
    try {
      const response = await postArtist<ArtistFormType>(formValue);

      if (response.ok) {
        setFormValue({
          name: "",
          image: "",
          artistType: "SOLO",
          artistTags: [],
        });
        setOpen(false);
        // return (
        //   <Alert>
        //     <RocketIcon className="h-4 w-4" />
        //     <AlertTitle>Heads up!</AlertTitle>
        //     <AlertDescription>
        //       You can add components to your app using the cli.
        //     </AlertDescription>
        //   </Alert>
        // );
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger className={"p-3 fixed bottom-10 right-10 text-sm"}>
          아티스트 등록하기
        </DialogTrigger>
        <DialogContent className={"bg-hipzip-black text-hipzip-white"}>
          <DialogHeader>
            <DialogTitle className={"mb-3"}>아티스트 등록하기</DialogTitle>
            <DialogDescription>
              - 아티스트의 이름 입력시 활동명으로 작성해주세요. 재키와이보다는
              Jvcki Wai 🔥
            </DialogDescription>
            <DialogDescription>
              - 아티스트의 이미지 입력시 URL을 입력하셔야 합니다. 이미지 업로드
              기능을 추가 할 예정입니다.
            </DialogDescription>
            <DialogDescription>
              - 검색 힌트 입력시 단어를 입력 후 엔터를 치시면 됩니다. 검색용
              태그로 활용되며, 키드밀리를 예로 들면 KID MILLI, 최원재 등으로
              입력하시면 됩니다.
            </DialogDescription>
          </DialogHeader>
          <div className={"flex flex-col gap-3"}>
            <InputField label={"아티스트 이름"} onChange={handleNameChange} />
            <InputField
              label={"아티스트 이미지"}
              onChange={handleImageChange}
            />
            <InputDropDownField label={"솔로/그룹 구분"} onChange={() => {}} />
            <TagInputField
              label={"검색 힌트"}
              placeholder={"지코, ZICO, 우지호"}
              className={"m-0"}
              onChange={handleTagChange}
              onKeyDown={handleTagInputKeyDown}
              tagList={formValue.artistTags}
            />
          </div>
          <DialogFooter>
            {/*<Button onClick={handleArtistSubmit}>등록하기</Button>*/}
            <ConfirmDialog ok={handleArtistSubmit} />
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ArtistModal;
