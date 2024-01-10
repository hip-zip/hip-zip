"use client";

import React from "react";
import { useRouter } from "next/navigation";

interface RedirectButtonProps {
  redirectUrl: string;
}

const RedirectButton = (props: RedirectButtonProps) => {
  const router = useRouter();

  return (
    <button
      className="px-4 py-2 border border-sky-500 text-white text-sm bg-transparent rounded-md hover:bg-sky-500 hover:text-gray-800 transition-all"
      onClick={() => {
        if (document?.startViewTransition) {
          document.startViewTransition(() => {
            router.push(`/${props.redirectUrl}`);
          });
        } else {
          router.push(`/${props.redirectUrl}`);
        }
      }}
    >
      앨범 리스트를 확인하러 가봅시다 🔥
    </button>
  );
};

export default RedirectButton;
