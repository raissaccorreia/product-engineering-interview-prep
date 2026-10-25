# React assessment practice environment

This isolated Vite + React + TypeScript app is a blank runtime for the work item tracker exercise. The prompt lives one directory above this app. `src/App.tsx` is the implementation entry point.

## Run

From this directory:

```sh
pnpm dev
```

Open the local URL printed by Vite. Keep the dev server running while you work. Vite updates the browser as you save.

## Check the implementation

```sh
pnpm build
pnpm lint
```

`build` runs the TypeScript project checks and creates a production bundle. `lint` runs Oxlint. There are no hidden tests or exercise-specific checks in this environment.
