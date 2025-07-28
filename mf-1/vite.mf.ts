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
    (acc: Record<string, string>, [key, val]) => {
      if (key.startsWith("VITE_") || key.startsWith("NEXT_PUBLIC_")) {
        acc[`process.env.${key}`] = JSON.stringify(val);
      }
      return acc;
    },
    {}
  );
  
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
        preserveEntrySignatures: "strict",
        
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
      },
    },
    define: {
      ...processEnvDefinitions,
      global: {},
      "process.env.NODE_ENV": JSON.stringify(mode),
    },
  };
});
