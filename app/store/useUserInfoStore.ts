import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export interface UserInfoType {
  email: string;
  nickname: string;
  image: string;
}

interface UserInfoStoreType {
  userInfo: UserInfoType;
}

export const useTokenStore = create<UserInfoStoreType>()(
  immer((set) => ({
    userInfo: {
      email: "",
      nickname: "",
      image: "",
    },
  })),
);

export const setUserInfo = (newState: UserInfoType) => {
  useTokenStore.setState((state) => {
    state.userInfo.email = newState.email;
    state.userInfo.nickname = newState.nickname;
    state.userInfo.image = newState.image;
    return state;
  });
};
