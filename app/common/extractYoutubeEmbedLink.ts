const extractYoutubeEmbedLink = (url: string): string => {
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

export default extractYoutubeEmbedLink;
