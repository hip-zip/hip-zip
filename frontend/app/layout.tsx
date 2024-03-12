"use client";

import "@/public/css/globals.css";
import "@/public/css/font.css";
import React, { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import Header from "@/app/components/organism/Header/Header";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CookiesProvider, useCookies } from "react-cookie";
import { setToken, useTokenStore } from "@/app/store/useTokenStore";
import { getUserInfo } from "@/app/api/Server/requests";
import { setUserInfo } from "@/app/store/useUserInfoStore";
import { useVibrateStore } from "@/app/store/useVibrateStore";
import { useRouter } from "next/navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient();
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const globalToken = useTokenStore((state) => state.token);
  const vibrate = useVibrateStore((state) => state.vibrate);
  const router = useRouter();

  const tokenValidation = async () => {
    try {
      setToken(cookies.token);
      const response = await getUserInfo();
      setUserInfo({
        email: response.email,
        nickName: response.nickName,
        image: response.image,
      });
    } catch (e) {
      setToken(undefined);
      removeCookie("token");
      console.log("layout.tsx:51 - e = ", e);
    }
  };

  useEffect(() => {
    if (cookies.token) {
      tokenValidation();
      return;
    } // first logic - if token is in cookies
  }, []);

  return (
    <html>
      <link rel="apple-touch-icon" href="/icon-192x192.png"></link>
      <meta name="theme-color" content="#1c1c2e" />
      <link
        href="/splashscreens/iphone5_splash.png"
        media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)"
        rel="apple-touch-startup-image"
      />
      <link
        href="/splashscreens/iphone6_splash.png"
        media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)"
        rel="apple-touch-startup-image"
      />
      <link
        href="/splashscreens/iphoneplus_splash.png"
        media="(device-width: 621px) and (device-height: 1104px) and (-webkit-device-pixel-ratio: 3)"
        rel="apple-touch-startup-image"
      />
      <link
        href="/splashscreens/iphonex_splash.png"
        media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)"
        rel="apple-touch-startup-image"
      />
      <link
        href="/splashscreens/iphonexr_splash.png"
        media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2)"
        rel="apple-touch-startup-image"
      />
      <link
        href="/splashscreens/iphonexsmax_splash.png"
        media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3)"
        rel="apple-touch-startup-image"
      />
      <link
        href="/splashscreens/ipad_splash.png"
        media="(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2)"
        rel="apple-touch-startup-image"
      />
      <link
        href="/splashscreens/ipadpro1_splash.png"
        media="(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2)"
        rel="apple-touch-startup-image"
      />
      <link
        href="/splashscreens/ipadpro3_splash.png"
        media="(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2)"
        rel="apple-touch-startup-image"
      />
      <link
        href="/splashscreens/ipadpro2_splash.png"
        media="(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2)"
        rel="apple-touch-startup-image"
      />
      <body className={`h-full min-h-screen`}>
        <QueryClientProvider client={queryClient}>
          <CookiesProvider defaultSetOptions={{ path: "/" }}>
            <div
              className={
                "text-hipzip-white font-bold text-4xl s-core-medium bg-gradient-to-r from-hipzip-black to-hipzip-darkgray " +
                `${vibrate === true ? "animate-vibrate" : ""}`
              }
            >
              <Header />
              {children}
              <Toaster />
            </div>
          </CookiesProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
