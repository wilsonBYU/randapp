import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  root: "src/",
  base: "/randapp/"
  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        about: resolve(__dirname, "src/about/index.html"),
        details: resolve(__dirname, "src/activity_details/index.html"),
        category: resolve(__dirname, "src/category/index.html"),
        activities: resolve(__dirname, "src/my_activities/index.html"),
        status: resolve(__dirname, "src/site_status/index.html"),
        sitemap: resolve(__dirname, "src/sitemap/index.html")
      },
    },
  },
});
