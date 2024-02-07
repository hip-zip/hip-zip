import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "hip_zip",
    short_name: "hip_zip",
    description: "Hip-Hop SupabaseAlbum List",
    start_url: "/",
    display: "fullscreen",
    background_color: "#fff",
    theme_color: "#fff",
    icons: [
      {
        src: "/pwa/icon-48x48.png",
        sizes: "48x48",
        type: "image/png",
      },
      {
        src: "/pwa/icon-72x72.png",
        sizes: "72x72",
        type: "image/png",
      },
      {
        src: "/pwa/icon-96x96.png",
        sizes: "96x96",
        type: "image/png",
      },
      {
        src: "/pwa/icon-128x128.png",
        sizes: "128x128",
        type: "image/png",
      },
      {
        src: "/pwa/icon-144x144.png",
        sizes: "144x144",
        type: "image/png",
      },
      {
        src: "/pwa/icon-152x152.png",
        sizes: "152x152",
        type: "image/png",
      },
      {
        src: "/pwa/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/pwa/icon-384x384.png",
        sizes: "384x384",
        type: "image/png",
      },
      {
        src: "/pwa/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/manifest/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/manifest/icon-256x256.png",
        sizes: "256x256",
        type: "image/png",
      },
      {
        src: "/manifest/icon-384x384.png",
        sizes: "384x384",
        type: "image/png",
      },
      {
        src: "/manifest/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
