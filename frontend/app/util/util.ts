import { setVibrate, stopVibrate } from "@/app/store/useVibrateStore";

export const vibrate = () => {
  setVibrate();
  setTimeout(() => {
    stopVibrate();
  }, 200);
};
