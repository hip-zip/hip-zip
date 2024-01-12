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
      className=""
      type={"button"}
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
      {props.message}
    </Button>
  );
};

export default React.memo(RedirectButton);
