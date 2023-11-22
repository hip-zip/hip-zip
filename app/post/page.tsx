"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import postSupabase from "@/app/hooks/postSupabase";

export interface AlbumFormType {
  album_name: string;
  album_description: string;
  album_image: string;
  album_tracks: string[];
  album_release_date: string;
  music_video: string;
  artist_name: string;
  artist_image: string;
}

export default function Page() {
  const [formValues, setFormValues] = useState<AlbumFormType>({
    album_name: "",
    album_description: "",
    album_image: "",
    album_tracks: [],
    album_release_date: "",
    music_video: "",
    artist_name: "",
    artist_image: "",
  });

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  // 폼 제출 시 실행될 함수
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await postSupabase(formValues);
      router.push("/main");
    } catch (e) {
      console.log("DD Console Check > ", e);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* 각 입력 필드 */}
        <div>
          <label
            htmlFor="album_name"
            className="block text-base font-medium text-white-700"
          >
            앨범 이름
          </label>
          <input
            type="text"
            id="album_name"
            name="album_name"
            value={formValues.album_name}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md text-black text-xl"
          />
        </div>

        <div>
          <label
            htmlFor="album_description"
            className="block text-base font-medium text-white-700"
          >
            앨범 설명
          </label>
          <input
            type="text"
            id="album_description"
            name="album_description"
            value={formValues.album_description}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md text-black text-xl"
          />
        </div>

        <div>
          <label
            htmlFor="album_image"
            className="block text-base font-medium text-white-700"
          >
            앨범 이미지
          </label>
          <input
            type="text"
            id="album_image"
            name="album_image"
            value={formValues.album_image}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md text-black text-xl"
          />
        </div>

        {/*<div>*/}
        {/*  <label*/}
        {/*    htmlFor="albumTracks"*/}
        {/*    className="block text-base font-medium text-white-700"*/}
        {/*  >*/}
        {/*    앨범 트랙*/}
        {/*  </label>*/}
        {/*  <input*/}
        {/*    type="text"*/}
        {/*    id="albumTracks"*/}
        {/*    name="albumTracks"*/}
        {/*    value={formValues.albumTracks}*/}
        {/*    onChange={handleChange}*/}
        {/*    className="mt-1 p-2 w-full border rounded-md text-black text-xl"*/}
        {/*  />*/}
        {/*</div>*/}

        <div>
          <label
            htmlFor="album_release_date"
            className="block text-base font-medium text-white-700"
          >
            앨범 출시일
          </label>
          <input
            type="text"
            id="album_release_date"
            name="album_release_date"
            value={formValues.album_release_date}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md text-black text-xl"
          />
        </div>

        <div>
          <label
            htmlFor="music_video"
            className="block text-base font-medium text-white-700"
          >
            뮤직비디오
          </label>
          <input
            type="text"
            id="music_video"
            name="music_video"
            value={formValues.music_video}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md text-black text-xl"
          />
        </div>

        <div>
          <label
            htmlFor="artist_name"
            className="block text-base font-medium text-white-700"
          >
            아티스트 이름
          </label>
          <input
            type="text"
            id="artist_name"
            name="artist_name"
            value={formValues.artist_name}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md text-black text-xl"
          />
        </div>

        <div>
          <label
            htmlFor="artist_image"
            className="block text-base font-medium text-white-700"
          >
            아티스트 사진
          </label>
          <input
            type="text"
            id="artist_image"
            name="artist_image"
            value={formValues.artist_image}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md text-black text-xl"
          />
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-500 text-white mt-10 px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300 text-xl"
          >
            제출
          </button>
        </div>
      </form>
    </div>
  );
}
