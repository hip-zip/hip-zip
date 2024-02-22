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

import InputHashtagField from "@/app/components/molecule/InputField/InputHashtagField";
import ConfirmDialog from "@/app/components/atom/ConfirmDialog/ConfirmDialog";
import {
  getArtistDetail,
  postArtist,
  putArtist,
} from "@/app/api/Client/requests";
import useFormInput from "@/app/hook/useFormInput";
import useContinualInput from "@/app/hook/useContinualInput";
import { toast } from "@/components/ui/use-toast";
import {
  ArtistModifyFormType,
  ArtistModifyModalProps,
} from "@/app/components/organism/Modal/ArtistModifyModal";
import InputGroupMemberField from "@/app/components/molecule/InputField/InputGroupMemberField";

interface GroupModifyModalProps extends ArtistModifyModalProps {}

export interface GroupMemberType {
  id: number;
  name: string;
  image: string;
}
export interface GroupModifyFormType {
  id: number;
  name: string;
  image: string;
  hashtag: string[];
  artistGroupMemberIds: number[];
}

const ArtistModifyModal = (props: GroupModifyModalProps) => {
  const [formValue, setFormValue] = useState<GroupModifyFormType>({
    id: 0,
    name: "",
    image: "",
    hashtag: [],
    artistGroupMemberIds: [],
  });

  const [handleNameChange] = useFormInput<GroupModifyFormType>(
    setFormValue,
    "name",
  );
  const [handleImageChange] = useFormInput<GroupModifyFormType>(
    setFormValue,
    "image",
  );

  const [hashtag, handleHashtagChange, handleHashtagInputKeyDown] =
    useContinualInput<GroupModifyFormType>(
      formValue.hashtag,
      setFormValue,
      "hashtag",
    );

  const [groupMembers, setGroupMembers] = useState<GroupMemberType[]>([]);

  const handleGroupSubmit = async () => {
    try {
      const param = {
        ...formValue,
        artistGroupMemberIds: groupMembers?.map((member) => member.id),
      };
      const response = await putArtist<GroupModifyFormType>(param);

      if (response.ok) {
        toast({
          variant: "default",
          title: "아티스트 수정 성공",
          description: `${formValue.name} 아티스트가 수정되었습니다.`,
          className: "bg-hipzip-black text-hipzip-white",
        });

        setFormValue({
          id: -1,
          name: "",
          image: "",
          hashtag: [],
          artistGroupMemberIds: [],
        });

        props.setOpen(false);
      }
    } catch (e) {}
  };

  useEffect(() => {
    if (props.id !== -1 && props.open) {
      getArtistDetail(props.id).then((response) => {
        setFormValue({
          id: props.id,
          name: response?.name || "",
          image: response?.image || "",
          hashtag: response?.hashtag || [],
          artistGroupMemberIds:
            response?.groupMembers?.map((member) => member.id) || [],
        });
        setGroupMembers(response?.groupMembers || []);
      });
    }
  }, [props.open, props.id]);

  // useEffect(() => {
  //   setFormValue({
  //     id: props.id || 0,
  //     name: props.detailData?.name || "",
  //     image: props.detailData?.image || "",
  //     hashtag: props.detailData?.hashtag || [],
  //     artistGroupMemberIds: groupMembers?.map((member) => member.id) || [],
  //   });
  // }, [props.detailData]);

  return (
    <>
      <Dialog open={props.open} onOpenChange={props.setOpen}>
        <DialogContent className={"bg-hipzip-black text-hipzip-white"}>
          <DialogHeader>
            <DialogTitle className={"mb-3"}>그룹 수정하기</DialogTitle>
            <DialogDescription>
              - 그룹 멤버들의 입력방식은 검색 힌트 입력 방식과 동일합니다.
            </DialogDescription>
            <DialogDescription>
              - 검색 힌트 입력시 단어를 입력 후 엔터를 치시면 됩니다.
            </DialogDescription>
          </DialogHeader>
          <div className={"flex flex-col gap-3"}>
            <InputField
              label={"그룹 이름"}
              onChange={handleNameChange}
              value={formValue.name}
              defaultValue={formValue.name || ""}
            />
            <InputField
              label={"그룹 이미지"}
              onChange={handleImageChange}
              value={formValue.image}
              defaultValue={formValue.image || ""}
            />
            <InputGroupMemberField
              label={"그룹 멤버"}
              onChange={handleHashtagChange}
              onKeyDown={handleHashtagInputKeyDown}
              groupMembers={groupMembers}
              setGroupMembers={setGroupMembers}
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
              target={"그룹"}
              ok={handleGroupSubmit}
              action={"수정"}
            />
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ArtistModifyModal;
