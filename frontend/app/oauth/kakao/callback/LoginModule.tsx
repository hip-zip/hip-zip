"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { setToken, useTokenStore } from "@/app/store/useTokenStore";
import { getUserInfo } from "@/app/api/Server/requests";
import { setUserInfo } from "@/app/store/useUserInfoStore";
import { useCookies } from "react-cookie";

interface LoginModuleProps {
  token: string;
}

const LoginModule = (props: LoginModuleProps) => {
  const router = useRouter();
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  const tokenValidation = async () => {
    try {
      setToken(props.token);
      const response = await getUserInfo();
      setCookie("token", props.token, { path: "/" });
      setUserInfo(response);
      router.push("/main");
    } catch (e) {
      router.push("/");
      console.log("LoginModule.tsx:21 -  = BackEnd Response Error");
    }
  };

  useEffect(() => {
    tokenValidation();
  }, []);

  return <div className={"h-screen"}></div>;
};

export default LoginModule;
