# Live greeting practice

A short React and TypeScript warm-up for controlled input, `useState`, derived values, and a small, appropriate use of `useEffect`. This exercise is separate from the music player.

## Exercise prompt

Complete the greeting form in `app/src/App.tsx`.

- Let the user enter their name in a controlled text input.
- Show a greeting that updates as the user types. If the input is empty or contains only whitespace, show the default greeting `Hello, visitor!`.
- Keep only the editable name in state. Derive the displayed greeting from that value during render.
- Use `useEffect` to keep the browser tab title synchronized with the current greeting.
- The tab title should also use the default greeting when the name is blank.

The supplied page already has the input and greeting layout. Keep the task focused on the data flow and React hooks. Do not add Context, timers, requests, or extra state for the greeting.

## Run

From `app/`, run `pnpm dev` and open `http://localhost:5176/`. The Vite server uses file polling for hot reload.

The first pass is complete. The session notes are in [review.md](./review.md).

## How to continue React practice

Use the same `app/src/App.tsx` for small, related increments instead of starting a new app for every hook. Each increment should take about 15–20 minutes to type and reason through. Give one requirement at a time, let the learner try it, then review correctness, edge cases, React patterns, and clarity before choosing the next increment. Keep each prompt, discussion, and review in the learning archive. Add a new app only when the next concept needs a different setup.
