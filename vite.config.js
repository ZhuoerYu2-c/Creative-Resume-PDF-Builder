import { resolve } from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    {
      name: "portfolio-directory-index",
      configureServer(server) {
        server.middlewares.use((request, _response, next) => {
          if (request.url === "/portfolio/") request.url = "/portfolio/index.html";
          if (request.url === "/en/portfolio/") request.url = "/en/portfolio/index.html";
          next();
        });
      }
    }
  ],
  build: {
    rollupOptions: {
      input: {
        resumeZh: resolve(import.meta.dirname, "index.html"),
        resumeEn: resolve(import.meta.dirname, "en/index.html")
      }
    }
  }
});
