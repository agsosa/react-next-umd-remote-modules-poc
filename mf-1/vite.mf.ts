// Ejemplo mas optimizado
// https://github.com/bmomberger-bitovi/web-components-example/blob/main/vite-build.mjs

import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import typescript from "@rollup/plugin-typescript";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  // Esto carga las variables de entorno que comienzan con VITE_ o NEXT_PUBLIC_ y las reemplaza despues en el código
  // TODO: TENEMOS QUE BUSCAR UNA FORMA DE QUE SE PUEDAN INYECTAR LAS VARIABLES DE ENTORNO RUNTIME EN LOS PODS DE KUBERNETES. COMPILAR EN EL NPM START?
  const processEnvDefinitions = Object.entries(env).reduce(
    (acc, [key, val]) => {
      if (key.startsWith("VITE_") || key.startsWith("NEXT_PUBLIC_")) {
        acc[`process.env.${key}`] = JSON.stringify(val);
      }
      return acc;
    },
    {}
  );

  const entryFile = resolve("src/web-components/wc-definitions.ts");

  return {
    plugins: [react(), typescript()],
    css: {
      postcss: {
        plugins: [],
      },
    },
    build: {
      outDir: "public/remote-components",
      cssCodeSplit: false,
      emptyOutDir: true,
      copyPublicDir: false,
      rollupOptions: {
        input: "src/components/entry.ts",
        preserveEntrySignatures: "exports-only",
        external: ["react", "react-dom"],
        output: {
          entryFileNames: "bundle.js",
          format: "umd",
          name: "RemoteModule",
          assetFileNames: ({ name }) =>
            name === "style.css" ? "web-components.css" : name || "asset",
          globals: {
            react: "React",
            "react-dom": "ReactDOM",
          },
        },
      },
    },
    resolve: {
      alias: {
        "@/*": "./src/*", // Se podria generar automaticamente sacando la info de tsconfig.json

        // Polyfills opcionales, pero ayuda a evitar problemas con imports de Next.js
        // El de getconfig podria permitirnos usar variables de entorno de la app shell desde el web component
        /*  "next/config": resolve(
          __dirname,
          "src/components/web-components/getConfig_polyfill.ts"
        ),
        "next/image": resolve(
          __dirname,
          "src/components/web-components/next-image-polyfill.tsx"
        ),*/
      },
    },
    define: {
      ...processEnvDefinitions,
      global: {},
      "process.env.NODE_ENV": JSON.stringify(mode),
    },
  };
});
