"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Button from "@/app/components/atom/Button/Button";

interface RedirectButtonProps {
  redirectUrl: string;
  message: string;
}

const RedirectButton = (props: RedirectButtonProps) => {
  const router = useRouter();

  return (
    <Button
      className="w-72 h-10"
      type={"button"}
      message={props.message}
      handleButtonClick={() => {
        if (document?.startViewTransition) {
          document.startViewTransition(() => {
            router.push(`/${props.redirectUrl}`);
          });
        } else {
          router.push(`/${props.redirectUrl}`);
        }
      }}
    />
  );
};

export default React.memo(RedirectButton);
