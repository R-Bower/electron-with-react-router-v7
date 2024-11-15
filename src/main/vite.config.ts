import { resolve } from "path";
import { defineConfig } from "vite";
import { nodePolyfills } from "vite-plugin-node-polyfills";

export default defineConfig({
  plugins: [nodePolyfills()],
  build: {
    lib: {
      entry: resolve("src/main/index.ts"),
      formats: ["es"],
    },
    rollupOptions: {
      onwarn: (warning, defaultHandler) => {
        defaultHandler(warning);
      },
      external: [
        "electron",
        "node:fs", // without this, fs becomes null when imported. `import fs from "node:path"`
      ],
      output: {
        dir: "out",
        entryFileNames: "main/[name].mjs",
      },
    },
    minify: false,
    emptyOutDir: false,
  },
  esbuild: {
    platform: "node",
  },
});
