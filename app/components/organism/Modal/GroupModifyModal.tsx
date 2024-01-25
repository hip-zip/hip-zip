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
import HashtagInputField from "@/app/components/molecule/InputField/HashtagInputField";
import ConfirmDialog from "@/app/components/atom/ConfirmDialog/ConfirmDialog";
import { ArtistDetailType } from "@/app/components/atom/Images/Artist";
import { getArtistDetail, postArtist, putArtist } from "@/app/hook/util";
import { ArtistPostType } from "@/app/components/organism/Modal/ArtistPostModal";
import useFormInput from "@/app/hook/useFormInput";
import { ArtistFormType } from "@/app/admin/artist/trash";
import useContinualInput from "@/app/hook/useContinualInput";
import { toast } from "@/components/ui/use-toast";
import { ArtistModifyFormType } from "@/app/components/organism/Modal/ArtistModifyModal";
import GroupMemberInputField from "@/app/components/molecule/InputField/GroupMemberInputField";

interface ModifyModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  detailData: ArtistDetailType | undefined;
  id: number;
}

interface GroupModifyType extends ArtistModifyFormType {
  artistGroupMemberIds: number[];
}

export interface GroupMemberType {
  id: number;
  name: string;
  image: string;
}

const ArtistModifyModal = (props: ModifyModalProps) => {
  const [data, setData] = useState<ArtistDetailType | undefined>(
    props.detailData,
  );

  const [formValue, setFormValue] = useState<GroupModifyType>({
    id: 0,
    name: "",
    image: "",
    hashtag: [],
    artistGroupMemberIds: [],
  });

  const [handleNameChange] = useFormInput<GroupModifyType>(
    setFormValue,
    "name",
  );
  const [handleImageChange] = useFormInput<GroupModifyType>(
    setFormValue,
    "image",
  );

  const [hashtag, handleHashtagChange, handleHashtagInputKeyDown] =
    useContinualInput<GroupModifyType>(
      formValue.hashtag,
      setFormValue,
      "hashtag",
    );

  const [groupMembers, setGroupMembers] = useState<
    GroupMemberType[] | undefined
  >(props.detailData?.groupMembers);

  const handleGroupSubmit = async () => {
    try {
      const param = {
        ...formValue,
        artistGroupMemberIds: groupMembers?.map((member) => member.id),
      };
      const response = await putArtist<GroupModifyType>(param);

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
    setFormValue({
      id: props.id || 0,
      name: props.detailData?.name || "",
      image: props.detailData?.image || "",
      hashtag: props.detailData?.hashtag || [],
      artistGroupMemberIds: groupMembers.map((member) => member.id) || [],
    });
  }, [props.detailData]);

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
              defaultValue={props.detailData?.name || ""}
            />
            <InputField
              label={"그룹 이미지"}
              onChange={handleImageChange}
              defaultValue={props.detailData?.image || ""}
            />
            <GroupMemberInputField
              label={"그룹 멤버"}
              onChange={handleHashtagChange}
              onKeyDown={handleHashtagInputKeyDown}
              groupMembers={groupMembers}
              setGroupMembers={setGroupMembers}
            />
            <HashtagInputField
              label={"검색 힌트"}
              placeholder={"지코, ZICO, 우지호"}
              className={"m-0"}
              onChange={handleHashtagChange}
              onKeyDown={handleHashtagInputKeyDown}
              tagList={formValue.hashtag}
            />
          </div>
          <DialogFooter>
            <ConfirmDialog ok={handleGroupSubmit} action={"수정"} />
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ArtistModifyModal;
