import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import viteTsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(() => {
  return {
    build: {
      outDir: "build",
    },
    plugins: [react(), viteTsconfigPaths()],
    server: {
      headers: {
        "X-Frame-Options": "DENY", // Stops your site being used as an iframe
      },
    },
  };
});
