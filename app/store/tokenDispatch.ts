import { useTokenStore } from "@/app/store/useTokenStore";

export const getToken = () => {
  return useTokenStore.getState().token;
};
