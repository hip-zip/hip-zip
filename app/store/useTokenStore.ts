import { create } from "zustand";
import { cookies } from "next/headers";

interface TokenStoreType {
  token: string;
  setToken: (token: string) => void;
}
export const useTokenStore = create<TokenStoreType>()((set) => ({
  token: "",
  setToken: (token: string) => set({ token: token }),
}));
