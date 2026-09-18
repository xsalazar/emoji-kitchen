import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(() => {
  return {
    // Served from https://<user>.github.io/emoji-kitchen/, so all asset and
    // fetch urls need that prefix. Set to "/" when hosting at a domain root.
    base: process.env.BASE_PATH ?? "/emoji-kitchen/",
    build: {
      outDir: "build",
    },
    plugins: [react()],
    server: {
      host: "127.0.0.1",
    },
  };
});
