# Countdown clock practice

Build a small configurable countdown clock in React and TypeScript, with minute and second inputs and Start, Pause, Resume, and Reset controls. This original exercise has a contract we will clarify before implementation.

## Current stage

The working `App.tsx` records the learner's incremental implementation from her explanation. The current in-progress `useEffect` attempt is preserved in [stages/04-user-use-effect-attempt.tsx](stages/04-user-use-effect-attempt.tsx). The separate [solution.tsx](app/src/solution.tsx) is a reference implementation using a reducer, a single remaining-seconds value, a four-state clock status, and a cleaned-up timeout. It is intentionally separate from `App.tsx`, which remains the study workspace.

Earlier stages are preserved in [stages/01-input-state.tsx](stages/01-input-state.tsx), [stages/02-start-button.tsx](stages/02-start-button.tsx), and [stages/03-pause-resume-reset.tsx](stages/03-pause-resume-reset.tsx). This is guided practice with no completion time limit.

## Environment

Edit [app/src/App.tsx](app/src/App.tsx). This environment is separate from the previous exercises.

From `app/`, run `pnpm dev` if the server is not already running. Open `http://localhost:5173/`. Keep one server active; the configuration fixes the port and uses file polling for hot reload.

`pnpm build` checks TypeScript and builds the app, including the separate solution module. `pnpm lint` checks the project. These checks do not exercise countdown behavior in a browser.

After an implementation is submitted, preserve it separately from the reference and record the explanation, feedback, and observed checks in Markdown.
