"use client";

import { useEffect, useState } from "react";
import Artist, { ArtistType } from "@/app/components/atom/Images/Artist";

interface ManagementProps {
  type: string;
}

const Management = (props: ManagementProps) => {
  const [item, setItem] = useState<ArtistType>([]);

  const fetchData = async () => {
    if (props.type === "artists") {
      try {
        const response = await fetch(
          "http://hip-zip.ap-northeast-2.elasticbeanstalk.com/artists",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          },
        );
      } catch (e) {}
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return <div>test</div>;
};

export default Management;
