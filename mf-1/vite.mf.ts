import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
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
      outDir: "public/remote-modules", // Aprovechamos la carpeta /public de Next.js para servir nuestro bundle.js, pero podemos subirlo a cualquier otro lugar
      cssCodeSplit: false,
      emptyOutDir: true,
      copyPublicDir: false,
      rollupOptions: {
        input: "src/RemoteModules/RemoteModules.ts",
        preserveEntrySignatures: "strict",
        external: ["react", "react-dom"], // App shell debe proveer react/react-dom. Debemos coordinar mismas versiones. Tambien se podria incluir react en nuestro bundle.js pero no es lo mejor.
        output: {
          entryFileNames: "bundle.js",
          format: "umd",
          name: "MF1_RemoteModules", // DEBE SER UN NOMBRE UNICO. ESTO SE DEBE COORDINAR ENTRE EQUIPOS PARA NO PISARSE. PODRIA SER EL NOMBRE DE EQUIPO
          assetFileNames: ({ name }) =>
            name === "style.css" ? "web-components.css" : name || "asset", // No probado. No deberia ser necesario si no usamos archivos css y solo usamos styled-components.
          globals: { // Leer comment en prop external
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
