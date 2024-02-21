import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import InputField from "@/app/components/molecule/InputField/InputField";
import InputHashtagField from "@/app/components/molecule/InputField/InputHashtagField";
import ConfirmDialog from "@/app/components/atom/ConfirmDialog/ConfirmDialog";
import { getArtistDetail, putArtist } from "@/app/api/fetch/requests";
import useFormInput from "@/app/hook/useFormInput";
import useContinualInput from "@/app/hook/useContinualInput";
import { toast } from "@/components/ui/use-toast";

export interface ArtistModifyFormType {
  id: number;
  name: string;
  image: string;
  hashtag: Array<string>;
  artistGroupMemberIds: [];
}

export interface ArtistModifyModalProps {
  id: number;
  open: boolean;
  setOpen: (open: boolean) => void;
  // detailData: ArtistDetailType;
}

const ArtistModifyModal = (props: ArtistModifyModalProps) => {
  const [formValue, setFormValue] = useState<ArtistModifyFormType>({
    id: 0,
    name: "",
    image: "",
    hashtag: [],
    artistGroupMemberIds: [],
  });

  const [handleNameChange] = useFormInput<ArtistModifyFormType>(
    setFormValue,
    "name",
  );
  const [handleImageChange] = useFormInput<ArtistModifyFormType>(
    setFormValue,
    "image",
  );
  const [hashtag, handleHashtagChange, handleHashtagInputKeyDown] =
    useContinualInput<ArtistModifyFormType>(
      formValue.hashtag,
      setFormValue,
      "hashtag",
    );

  const handleArtistSubmit = async () => {
    try {
      const response = await putArtist<ArtistModifyFormType>(formValue);

      if (response.ok) {
        toast({
          variant: "default",
          title: "아티스트 수정 성공",
          description: `${formValue.name} 아티스트가 수정되었습니다.`,
          className: "bg-hipzip-black text-hipzip-white",
        });

        setFormValue({
          id: 0,
          name: "",
          image: "",
          hashtag: [],
          artistGroupMemberIds: [],
        });

        props.setOpen(false);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (props.id !== -1 && props.open) {
      getArtistDetail(props.id).then((response) => {
        console.log("ArtistModifyModal.tsx:84 - response = ", response);

        setFormValue({
          id: props.id,
          name: response?.name || "",
          image: response?.image || "",
          hashtag: response?.hashtag || [],
          artistGroupMemberIds: [],
        });
      });
    }
  }, [props.open, props.id]);

  // useEffect(() => {
  //   setFormValue({
  //     id: props.id || 0,
  //     name: props.detailData?.name || "",
  //     image: props.detailData?.image || "",
  //     hashtag: props.detailData?.hashtag || [],
  //   });
  // }, [props.detailData]);

  return (
    <>
      <Dialog open={props.open} onOpenChange={props.setOpen}>
        <DialogContent className={"bg-hipzip-black text-hipzip-white"}>
          <DialogHeader>
            <DialogTitle className={"mb-3"}>아티스트 수정하기</DialogTitle>
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
              onChange={handleNameChange}
              value={formValue.name}
              // defaultValue={props.detailData?.name || ""}
            />
            <InputField
              label={"아티스트 이미지"}
              onChange={handleImageChange}
              value={formValue.image}
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
              action={"수정"}
              ok={handleArtistSubmit}
            />
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ArtistModifyModal;
