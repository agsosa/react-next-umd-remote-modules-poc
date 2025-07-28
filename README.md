# UMD-based Microfrontends PoC

A proof-of-concept implementation of microfrontends using UMD (Universal Module Definition) format with Next.js and React, enabling remote component sharing between applications, similar to Module Federation.

## 🚀 Live deployment

- **Shell App**: https://umd-remote-modules-poc-shell.vercel.app/
- **MF1**: https://umd-remote-modules-poc-mf1.vercel.app/

## 🏗️ Architecture Overview

This solution implements **UMD-based Microfrontends** (not Module Federation), where:

- **Shell App**: A Next.js application that consumes remote components from MF1
- **MF1**: A Next.js application that also uses its own components internally AND exposes them as UMD bundles for remote consumption
- **Remote Loading**: Components are loaded dynamically via script tags
- **Dual Usage**: MF1 components work both as local components within MF1 and as remote components in Shell


## 🚀 How It Works

### 1. MF1 Dual Architecture

**MF1 as Next.js App**: MF1 runs as a standalone Next.js application that uses its own components locally (Header, Fulfilment, etc.) in its own pages.

**MF1 as Component Provider**: MF1 also uses Vite to compile the same React components into a UMD bundle for remote consumption:

```javascript
// vite.mf.ts
export default defineConfig({
  build: {
    rollupOptions: {
      input: './src/RemoteModules/RemoteModules.ts',
      output: {
        format: 'umd',
        name: 'MF1_RemoteModules',
        preserveEntrySignatures: 'strict'
      },
      external: ['react', 'react-dom'],
      globals: {
        react: 'React',
        'react-dom': 'ReactDOM'
      }
    }
  }
});
```

**Entry Point** (`RemoteModules.ts`):
```javascript
export { Header, Fulfilment, FulfilmentDetails };
```

The same components that MF1 uses in its own pages are packaged and exposed for Shell to consume remotely.

### 2. Shell App Remote Loading

The shell app uses a reusable hook to load and consume remote components:

```typescript
// useRemoteModule hook
const { component: Header, loading, error } = useRemoteModule({
  url: "http://localhost:3001/remote-modules/bundle.js",
  moduleName: "MF1_RemoteModules", 
  componentName: "Header"
});
```

### 3. Runtime Component Rendering

When a remote component is loaded:

1. **Script Loading**: Dynamic script tag injection loads the UMD bundle
2. **Global Access**: Components become available via `window.MF1_RemoteModules`
3. **React Integration**: Components are treated as normal React components
4. **Virtual DOM**: React renders them seamlessly into the shell's component tree

## 🏃‍♂️ Development

### Starting the Applications

1. **Start MF1** (Terminal 1):
```bash
cd mf-1
npm install
npm run dev        # Next.js development server + Vite watch mode for exported remote components
```

2. **Start Shell** (Terminal 2):
```bash
cd shell
npm install
npm run dev
```

### Local URLs

- **Shell App**: http://localhost:3000
- **MF1 Standalone**: http://localhost:3001
- **Remote Bundle**: http://localhost:3001/remote-modules/bundle.js (UMD bundle for Shell)

### Router Context Sharing

Since `useRouter` doesn't work in remote components, router state is passed as props:

```typescript
// In Shell
const router = useRouter();
return <Header appName="Shell App" router={router} />;
```

### Caching and Performance

The `useRemoteModule` hook implements:
- **Script caching**: Prevents duplicate loads
- **Component memoization**: Improves performance
- **Error handling**: Graceful fallbacks

The **mf-1** `next.config` also sets Cache-Control headers.

## ✅ Advantages of UMD based microfrontends

- **Framework Agnostic**: UMD works with any JavaScript environment
- **Simple Setup**: No complex module-federation configuration. The shell app only needs a `<script>` tag.
- **Standalone Development**: Each microfrontend can be developed independently
- **Component Reusability**: Same components can be used locally and exposed remotely
- **TypeScript Support**: Full type safety with shared interfaces
- **Performance**: Efficient caching and lazy loading

## ⚠️ Considerations

- **Global Namespace**: Each microfrontend needs unique global names
- **Dependency Management**: External dependencies must be managed carefully
- **Runtime Loading**: Components are loaded at runtime, not build time. SSR is not compatible.

---

This architecture provides a clean, maintainable solution for microfrontend development with React and Next.js, offering the benefits of component sharing without the complexity of Module Federation.