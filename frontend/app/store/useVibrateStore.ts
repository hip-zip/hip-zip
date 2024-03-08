import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface VibrateStoreType {
  vibrate: boolean;
}
export const useVibrateStore = create<VibrateStoreType>()(
  immer((set) => ({
    vibrate: false,
  })),
);

export const setVibrate = () => {
  useVibrateStore.setState((state) => {
    state.vibrate = true;
    return state;
  });
};

export const stopVibrate = () => {
  useVibrateStore.setState((state) => {
    state.vibrate = false;
    return state;
  });
};
