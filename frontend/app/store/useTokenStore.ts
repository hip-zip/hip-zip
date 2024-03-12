import { create } from "zustand";
import { cookies } from "next/headers";
import { immer } from "zustand/middleware/immer";

interface TokenStoreType {
  token: string | undefined;
}
export const useTokenStore = create<TokenStoreType>()(
  immer((set) => ({
    token: undefined,
  })),
);

export const getToken = () => {
  return useTokenStore.getState().token;
};

export const setToken = (token: string | undefined) => {
  useTokenStore.setState((state) => {
    state.token = token;
    return state;
  });
};
