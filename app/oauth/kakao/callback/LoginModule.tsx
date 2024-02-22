"use client";

import React, { useLayoutEffect } from "react";
import { getKakaoToken } from "@/app/api/Client/requests";
import { useRouter } from "next/navigation";
import { useTokenStore } from "@/app/store/useTokenStore";

interface LoginModuleProps {
  token?: string;
}

const LoginModule = (props: LoginModuleProps) => {
  const router = useRouter();
  const { setToken } = useTokenStore();
  const setCookie = async (token: string) => {
    const response = await fetch(
      "http://localhost:3000/api/oauth/kakao/callback?token=" + token,
    );
    if (response.ok) {
      setToken(token);
      router.push("/main");
    } else {
      router.push("/");
    }
  };

  useLayoutEffect(() => {
    if (props.token && props.token !== "") {
      setCookie(props.token);
    }
  }, [props.token]);

  return <div className={"h-screen"}></div>;
};

export default LoginModule;
