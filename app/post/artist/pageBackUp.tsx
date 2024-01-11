// pages/your-page.js

// Import existing modules
"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import postSupabase from "@/app/hook/postSupabase";
import extractYoutubeEmbedLink from "@/app/common/extractYoutubeEmbedLink";

// Existing interface and export statement
export interface ArtistFormType {
  name: string;
  image: string;
  artistType: string;
  artistTags: Array<string>;
}

export default function PageBackUp() {
  // Existing state and router
  const [formValues, setFormValues] = useState<ArtistFormType>({
    name: "",
    image: "",
    artistType: "SOLO",
    artistTags: [],
  });
  const [hashTag, setHashTag] = useState<string>("");
  const router = useRouter();

  // Existing event handlers
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "hashTag") {
      setHashTag(value);
      return;
    }

    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));

    console.log("DD Console Check > ", formValues);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`${process.env.baseURL}/artists`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
      });

      if (response.ok) {
        alert("업로드 성공");
        router.push("/main");
      }
    } catch (e) {
      alert("양식을 다시 확인해주세요 !");
    }
  };

  const handleHashTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  const handleSubmitBlock = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();

      if (e.nativeEvent.isComposing) return;

      if (hashTag === "") {
        return;
      }

      setFormValues((prev) => ({
        ...prev,
        artistTags: [...prev.artistTags, hashTag],
      }));
      setHashTag("");
    }

    if (e.key === "Backspace" && hashTag === "") {
      setFormValues((prev) => ({
        ...prev,
        artistTags: prev.artistTags.slice(0, -1),
      }));
    }
  };

  // Modified JSX
  return (
    <div className="max-w-md h-screen flex justify-center items-center">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="w-96">
          <label
            htmlFor="name"
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
            className="mt-1 p-2 w-full border rounded-md text-black text-xl h-10"
          />
        </div>

        <div className="w-96">
          <label
            htmlFor="image"
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
            className="mt-1 p-2 w-full border rounded-md text-black text-xl h-10"
          />
        </div>

        <div className="w-96">
          <label
            htmlFor="hashTag"
            className="block text-base font-medium text-white-700"
          >
            해시태그
          </label>

          <div className="mt-1 p-2 bg-white rounded-md text-sm flex flex-wrap max-w-96">
            {formValues.artistTags.map((tag) => (
              <span
                key={tag}
                className="flex justify-center items-center bg-green-600 m-1 p-1 rounded-md"
              >
                {tag}
              </span>
            ))}
            <input
              type="text"
              id="hashTag"
              name="hashTag"
              placeholder="아티스트의 랩네임을 적어주세요"
              value={hashTag}
              onChange={handleChange}
              onKeyUp={handleHashTag}
              onKeyDown={handleSubmitBlock}
              className="rounded-md text-black inline-block bg-transparent w-60 h-10 focus:outline-none"
            />
          </div>
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
