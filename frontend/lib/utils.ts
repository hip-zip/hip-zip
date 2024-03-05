import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const convertDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 1을 더해줍니다.
  const day = String(date.getDate()).padStart(2, "0"); // 일자가 한 자리 수인 경우 앞에 0을 붙입니다.

  return `${year}-${month}-${day}`;
};

export const extractYoutubeEmbedLink = (url: string): string => {
  const embedBaseUrl = "https://www.youtube.com/embed/";

  if (url.includes("youtu.be")) {
    // mobile youtube app case
    const match = url.match(/youtu\.be\/([^?]+)/);
    return match ? embedBaseUrl + match[1] : "";
  } else if (url.includes("youtube.com")) {
    // pc youtube web case
    const match = url.match(/[?&]v=([^?]+)/);
    return match ? embedBaseUrl + match[1] : "";
  } else {
    return "";
  }
};
