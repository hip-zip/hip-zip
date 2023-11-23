import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'hip_zip',
    short_name: 'hip_zip',
    description: 'hiphop album lists',
    start_url: '/',
    display: 'standalone',
    background_color: '#fff',
    theme_color: '#fff',
    icons: [
      {
        src: '/public/manifest/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
      {
        src: "/public/manifest/icon-192x192.png",
        sizes: "192x192",
        type: "image/png"
      },
      {
        src: "/public/manifest/icon-256x256.png",
        sizes: "256x256",
        type: "image/png"
      },
      {
        src: "/public/manifest/icon-384x384.png",
        sizes: "384x384",
        type: "image/png"
      },
      {
        src: "/public/manifest/icon-512x512.png",
        sizes: "512x512",
        type: "image/png"
      }
    ],
  }
}