import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export interface UserInfo {
  email: string;
  image: string;
  nickName: string;
}
interface UseUserInfoStoreType {
  userInfo: UserInfo | undefined;
}

export const useUserInfoStore = create<UseUserInfoStoreType>()(
  immer((set) => ({
    userInfo: undefined,
  })),
);

export const setUserInfo = (userInfo: UserInfo | undefined) => {
  useUserInfoStore.setState((state) => {
    state.userInfo = userInfo;
    return state;
  });
};
