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

## 📁 Project Structure

```
react-next-ecmascript-remote-modules-poc/
├── shell/                  # Next.js Shell Application
│   ├── src/
│   │   ├── components/     # Remote component wrappers
│   │   ├── hooks/          # Reusable hooks (useRemoteModule)
│   │   ├── pages/          # Application pages
│   │   └── types/          # TypeScript definitions
│   ├── next.config.js      # Next.js configuration
│   └── .env.local          # Environment variables
└── mf-1/                   # Next.js Microfrontend Application
    ├── src/
    │   ├── pages/          # Next.js pages (uses components locally)
    │   ├── components/     # Regular Next.js components
    │   └── RemoteModules/  # Components exported for remote consumption
    ├── vite.mf.ts          # Vite config for UMD bundle generation
    ├── next.config.js      # Next.js configuration
    └── public/             # Static assets and compiled UMD bundles
```

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

## 🛠️ Available Components

### Remote Components (from MF1)

| Component | Purpose | Props |
|-----------|---------|-------|
| `Header` | Navigation header | `appName`, `router`, `onMount` |
| `Fulfilment` | Order fulfillment operations | `onFulfil`, `onTrack` |
| `FulfilmentDetails` | Detailed fulfillment view | `orderId`, `onStatusChange` |

### Shell App Features

- **Order Management System (OMS)**
  - Order listing page
  - Order detail view with tabs
  - Integration with remote fulfillment components

- **Remote Component Integration**
  - Type-safe remote component loading
  - Error handling and loading states
  - Router context sharing

## 🔧 Configuration

### Environment Variables

```bash
# .env.local
MF1_BASE_URL=http://localhost:3001
```

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

### URLs

- **Shell App**: http://localhost:3000
- **MF1 Standalone**: http://localhost:3001
- **Remote Bundle**: http://localhost:3001/remote-modules/bundle.js (UMD bundle for Shell)

## 🔍 Key Implementation Details

### TypeScript Integration

Remote component interfaces are shared via TypeScript definition files:

```typescript
// mf1-remote-components.d.ts
export interface HeaderProps {
  appName: string;
  router?: NextRouter;
  onMount?: () => void;
}

declare global {
  interface Window {
    MF1_RemoteModules: MF1_RemoteComponents;
  }
}
```

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

## ✅ Advantages of UMD based microfrontends

- **Framework Agnostic**: UMD works with any JavaScript environment
- **Simple Setup**: No complex build federation configuration
- **Standalone Development**: Each microfrontend can be developed independently
- **Component Reusability**: Same components can be used locally and exposed remotely
- **TypeScript Support**: Full type safety with shared interfaces
- **Performance**: Efficient caching and lazy loading

## ⚠️ Considerations

- **Global Namespace**: Each microfrontend needs unique global names
- **Manual Dependency Management**: External dependencies must be managed carefully (or can be bundled)
- **Runtime Loading**: Components are loaded at runtime, not build time. No SSR.
- **Browser Compatibility**: Requires modern browser features for dynamic imports

---

This architecture provides a clean, maintainable solution for microfrontend development with React and Next.js, offering the benefits of component sharing without the complexity of Module Federation.