"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { setToken, useTokenStore } from "@/app/store/useTokenStore";
import { getUserInfo } from "@/app/api/Server/requests";

interface LoginModuleProps {
  token: string;
}

const LoginModule = (props: LoginModuleProps) => {
  const router = useRouter();

  useEffect(() => {
    setToken(props.token);
    router.push("/main");
  }, []);

  return <div className={"h-screen"}></div>;
};

export default LoginModule;
