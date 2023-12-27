"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import postSupabase from "@/app/hooks/postSupabase";
import extractYoutubeEmbedLink from "@/app/common/extractYoutubeEmbedLink";

export interface ArtistFormType {
  name: string;
  image: string;
}

export default function Page() {
  const [formValues, setFormValues] = useState<ArtistFormType>({
    name: "",
    image: "",
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

    // try {
    //   await postSupabase(formValues);
    //   router.push("/main");
    // } catch (e) {
    //   alert("양식을 다시 확인해주세요 !");
    // }
    try {
      await fetch(`${process.env.baseURL}/artist`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
      });
    } catch (e) {
      alert("양식을 다시 확인해주세요 !");
    }
  };

  return (
    <div className="max-w-md h-screen flex justify-center items-center">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="album_name"
            className="block text-base font-medium text-white-700"
          >
            아티스트 이름
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formValues.name}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md text-black text-xl"
          />
        </div>

        <div>
          <label
            htmlFor="album_description"
            className="block text-base font-medium text-white-700"
          >
            아티스트 이미지
          </label>
          <input
            type="text"
            id="image"
            name="image"
            value={formValues.image}
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
