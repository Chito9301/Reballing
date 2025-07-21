import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Challz",
    short_name: "Challz",
    description: "Desafía tu rutina. Reta tu mundo.",
    start_url: "/",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#8B5CF6",
    icons: [
      {
        src: "/challz-icon.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/challz-icon.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  }
}
