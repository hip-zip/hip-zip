"use client";

import React, { useLayoutEffect } from "react";
import { getKakaoToken } from "@/app/api/Client/requests";
import { useRouter } from "next/navigation";
import { useTokenStore } from "@/app/store/useTokenStore";
import { Get } from "@/app/api/Client/wrapper";

interface LoginModuleProps {
  token?: string;
}

const LoginModule = (props: LoginModuleProps) => {
  const router = useRouter();
  const setModule = (token: string) => {
    useTokenStore.setState((state) => {
      state.token = token;
      return;
    });
  };
  const setCookie = async (token: string) => {
    const response = await fetch(
      "http://localhost:3000/api/oauth/kakao/callback?token=" + token,
    ); // TODO: 이 방식 말고 그냥 useCookie 같은걸로 set 하는 것이 좋을 것 같음
    if (response.ok) {
      // const response = await Get("/me", {
      //   authorization: `Bearer ${token}`,
      // });
      // console.log("LoginModule.tsx:27 - response = ", response);
      setModule(props.token || "");
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
