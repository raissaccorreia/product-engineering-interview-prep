# Lazy image gallery practice

Implement an original React and TypeScript gallery exercise focused on scroll-triggered image loading. The starter intentionally renders the whole collection eagerly. The acceptance criteria describe the behavior; they do not prescribe the component or observer implementation.

## Exercise prompt

The gallery contains twelve image records. Update the gallery so it renders the first four images initially and appends the next four when a loading marker at the end of the gallery is at least 50% visible. Continue in batches until every image has been rendered.

Use the browser's `IntersectionObserver` API to detect the marker. Do not use `React.lazy` or a third-party observer library. Keep the existing image data, responsive grid, titles, and alt text.

## Acceptance criteria

- On initial render, only the first four image cards are present.
- When the end marker reaches the specified visibility, append the next batch of up to four cards.
- Each image appears once and keeps its stable key, title, and alt text.
- No more cards are appended after the full collection is visible.
- Stop observing when there is nothing left to load, and disconnect the observer when the effect is cleaned up.
- The gallery continues to work when the viewport is resized and on a narrow screen.

## Workspace

- Implement in `app/src/App.tsx`.
- The static data is in `app/src/images.ts`.
- Basic visual styling is provided in `app/src/App.css`.
- The runnable starter uses a separate Vite app and a fixed port, `5174`, so it can coexist with the countdown exercise on `5173`.
- An optional concept demo is available at `/demo`; it compares image visibility loading with `IntersectionObserver` and component-code loading with `React.lazy`. The exercise remains at `/`.

From `app/`, run `pnpm dev` and open `http://localhost:5174/`. The Vite config uses polling so hot reload continues to work in this workspace. Run `pnpm build` and `pnpm lint` after the implementation; they check TypeScript and linting but do not exercise scrolling behavior.

The exercise and examples in this folder are original to this learning archive. Preserve the attempt separately from any reference implementation after it is reviewed.
