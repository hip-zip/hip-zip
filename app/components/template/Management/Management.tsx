"use client";

import React, { useEffect, useState } from "react";
import { ArtistType } from "@/app/components/atom/Images/Artist";
import { useFetch } from "usehooks-ts";
import Input from "@/app/components/atom/Input/Input";

interface ManagementProps {
  type: string;
}

const Management = (props: ManagementProps) => {
  // const [item, setItem] = useState<ArtistType>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const { data } = useFetch<ArtistType[]>(
    process.env.baseURL + `/artists?name=${inputValue}`,
  );

  const fetchData = async () => {
    // if (props.type === "artists") {
    //   try {
    //     const response = await fetch(
    //       "http://hip-zip.ap-northeast-2.elasticbeanstalk.com/artists",
    //       {
    //         method: "GET",
    //         headers: {
    //           "Content-Type": "application/json",
    //         },
    //       },
    //     );
    //     console.log("DD CONSOLE CHECK > response", response);
    //   } catch (e) {}
    // }
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    fetchData();
    console.log("DD CONSOLE CHECK > data", data);
  }, [data]);

  return (
    <>
      <Input
        className={"text-center"}
        type={"text"}
        placeholder={"아티스트를 입력하세요"}
        onChange={onInputChange}
      />
    </>
  );
};

export default Management;
