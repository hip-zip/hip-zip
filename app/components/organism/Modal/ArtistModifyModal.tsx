import React, { useEffect, useLayoutEffect, useState } from "react";
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
import InputComboBoxField from "@/app/components/molecule/InputField/InputComboBoxField";
import TagInputField from "@/app/components/molecule/InputField/TagInputField";
import ConfirmDialog from "@/app/components/atom/ConfirmDialog/ConfirmDialog";
import { ArtistDetailType } from "@/app/components/atom/Images/Artist";
import { getArtistDetail, postArtist, putArtist } from "@/app/hook/util";
import { ArtistPostType } from "@/app/components/organism/Modal/ArtistPostModal";
import useFormInput from "@/app/hook/useFormInput";
import { ArtistFormType } from "@/app/admin/artist/trash";
import useContinualInput from "@/app/hook/useContinualInput";
import { toast } from "@/components/ui/use-toast";

interface ModifyModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  detailData: ArtistDetailType | undefined;
  id: number;
}

interface ArtistModifyType extends ArtistPostType {
  id: number;
}

const ArtistModifyModal = (props: ModifyModalProps) => {
  const [data, setData] = useState<ArtistDetailType | undefined>(
    props.detailData,
  );

  const [formValue, setFormValue] = useState<ArtistModifyType>({
    id: 0,
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

  const handleArtistSubmit = async () => {
    try {
      const params = {
        ...formValue,
        artistType,
      };

      const response = await putArtist<ArtistPostType>(params);

      if (response.ok) {
        toast({
          variant: "success",
          title: "아티스트 수정 성공",
          description: `${formValue.name} 아티스트가 수정되었습니다.`,
        });

        setFormValue({
          id: 0,
          name: "",
          image: "",
          artistType: "SOLO",
          artistTags: [],
        });

        props.setOpen(false);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    setFormValue({
      id: props.id || 0,
      name: props.detailData?.name || "",
      image: props.detailData?.image || "",
      artistType: props.detailData?.artistType || "SOLO",
      hashtag: props.detailData?.hashtag || [],
    });
  }, [props.detailData]);

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
              defaultValue={props.detailData?.name || ""}
            />
            <InputField
              label={"아티스트 이미지"}
              onChange={handleImageChange}
              defaultValue={props.detailData?.image || ""}
            />
            <InputComboBoxField
              label={"솔로/그룹 구분"}
              key={"artistType"}
              onSelect={setArtistType}
              defaultValue={formValue.artistType}
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
            <ConfirmDialog ok={handleArtistSubmit} action={"수정"} />
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ArtistModifyModal;
