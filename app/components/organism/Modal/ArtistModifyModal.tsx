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
import { getArtistDetail } from "@/app/hook/util";
import { ArtistPostType } from "@/app/components/organism/Modal/ArtistPostModal";

interface ModifyModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  detailData: ArtistDetailType | undefined;
}

export interface ArtistModifyType extends ArtistPostType {
  artistGroupMemberIds: number[];
}

const ArtistModifyModal = (props: ModifyModalProps) => {
  const [data, setData] = useState<ArtistDetailType | undefined>(
    props.detailData,
  );

  const [formValue, setFormValue] = useState<ArtistModifyType>({
    name: props.detailData?.name || "",
    image: props.detailData?.image || "",
    artistType: props.detailData?.artistType.toLowerCase() || "SOLO",
    artistGroupMemberIds: [],
    hashtag: [],
  });

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
              defaultValue={props.detailData?.name || ""}
            />
            <InputField
              label={"아티스트 이미지"}
              defaultValue={props.detailData?.image || ""}
            />
            <InputComboBoxField label={"솔로/그룹 구분"} key={"artistType"} />
            <TagInputField
              label={"검색 힌트"}
              placeholder={"지코, ZICO, 우지호"}
              className={"m-0"}
            />
          </div>
          <DialogFooter>
            <ConfirmDialog ok={() => {}} action={"수정"} />
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ArtistModifyModal;
