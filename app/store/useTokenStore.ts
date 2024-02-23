import { create } from "zustand";
import { cookies } from "next/headers";
import { immer } from "zustand/middleware/immer";

interface TokenStoreType {
  token: string;
}
export const useTokenStore = create<TokenStoreType>()(
  immer((set) => ({
    token: "",
  })),
);
