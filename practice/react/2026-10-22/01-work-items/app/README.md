# React assessment practice environment

This isolated Vite + React + TypeScript app is a blank runtime for the work item tracker exercise. The prompt lives one directory above this app. `src/App.tsx` is the implementation entry point.

## Run

From this directory:

```sh
pnpm dev
```

Open `http://localhost:5173/` and keep this single dev server running while you work. The Vite config fixes the port so a second server cannot silently switch to 5174. File polling is enabled at 500 ms because native file change events were not reaching the dev server reliably in this workspace. Hot reload was confirmed by editing `src/App.tsx` and observing the page update without a reload.

## Check the implementation

```sh
pnpm build
pnpm lint
```

`build` runs the TypeScript project checks and creates a production bundle. `lint` runs Oxlint. There are no hidden tests or exercise-specific checks in this environment.
