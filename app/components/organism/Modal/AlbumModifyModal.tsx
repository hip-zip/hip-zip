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
import {
  getAlbumDetail,
  getArtistDetail,
  putAlbum,
  putArtist,
  searchArtist,
} from "@/app/api/fetch/requests";
import useFormInput from "@/app/hook/useFormInput";
import useContinualInput from "@/app/hook/useContinualInput";
import { toast } from "@/components/ui/use-toast";
import InputArtistField from "@/app/components/molecule/InputField/InputArtistField";
import useDebouncedSearch from "@/app/hook/useDebouncedSearch";
import { ArtistType } from "@/app/components/type";
import InputDateField from "@/app/components/molecule/InputField/InputDateField";
import { convertDate } from "@/lib/utils";
import { AlbumPostFormType } from "@/app/components/organism/Modal/AlbumPostModal";

export interface AlbumModifyType {
  id: number;
  name: string;
  image: string;
  releaseDate: string;
  musicVideo: string;
  artistId: number;
}

export interface AlbumModifyModalProps {
  id: number;
  open: boolean;
  setOpen: (open: boolean) => void;
  // detailData: ArtistDetailType;
}

const ArtistModifyModal = (props: AlbumModifyModalProps) => {
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

  const [formValue, setFormValue] = useState<AlbumModifyType>({
    id: 0,
    name: "",
    image: "",
    releaseDate: new Date().toString(),
    musicVideo: "",
    artistId: -1,
  });

  const [handleNameChange] = useFormInput<AlbumModifyType>(
    setFormValue,
    "name",
  );
  const [handleImageChange] = useFormInput<AlbumModifyType>(
    setFormValue,
    "image",
  );

  const [handleMusicVideoChange] = useFormInput<AlbumModifyType>(
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
  const handleArtistSubmit = async () => {
    try {
      const params = {
        ...formValue,
        artistId: artistInfo.id,
      };

      const response = await putAlbum<AlbumModifyType>(params);

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
          releaseDate: new Date().toString(),
          musicVideo: "",
          artistId: -1,
        });

        props.setOpen(false);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (props.id !== -1 && props.open) {
      getAlbumDetail(props.id).then((response) => {
        setFormValue({
          id: props.id,
          name: response?.name || "",
          image: response?.image || "",
          releaseDate: response?.releaseDate || "",
          musicVideo: response?.musicVideo || "",
          artistId: response?.artistResponse.id || -1,
        });
        setArtistInfo(response?.artistResponse);
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
              value={formValue.name}
              // defaultValue={props.detailData?.name || ""}
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
              date={formValue.releaseDate}
            />
            <InputField
              label={"앨범 이미지"}
              onChange={handleImageChange}
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
