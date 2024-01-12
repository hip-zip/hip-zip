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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import InputField from "@/app/components/molecule/InputField/InputField";
interface ArtistModalProps {}

const ArtistModal = (props: ArtistModalProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Dialog open={true} onOpenChange={setOpen}>
        <DialogTrigger>
          <Button
            className={"p-3 fixed bottom-10 right-10"}
            message={"등록하기"}
            handleButtonClick={() => setOpen(true)}
          />
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
          <div className="grid gap-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <InputField label={"아티스트 이름"} />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <InputField label={"아티스트 이미지"} />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <InputField
                label={"검색 힌트"}
                placeholder={"최대 5개까지 입력 가능"}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ArtistModal;
