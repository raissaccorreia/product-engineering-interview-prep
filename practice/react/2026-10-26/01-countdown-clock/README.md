# Countdown clock practice

Build a small configurable countdown clock in React and TypeScript, with minute and second inputs and Start, Pause, Resume, and Reset controls. This is an original learning exercise with a contract we will clarify together, independent of the assessment.

## Current stage

At the learner's request, the assistant implemented the model she described: separate `minutes`, `seconds`, and `time` states, two controlled inputs, and `time = minutes * 60 + seconds` updated when either input changes. The displayed total makes this relationship visible. This is a study draft written from her explanation, not her original submitted code or a complete reference solution.

The current stage is preserved in [stages/01-input-state.tsx](stages/01-input-state.tsx). Timer behavior and controls will be discussed next. No effect or timeout has been implemented. This is guided practice with no completion time limit.

## Environment

Edit [app/src/App.tsx](app/src/App.tsx). This environment is separate from the previous exercises.

From `app/`, run `pnpm dev` if the server is not already running. Open `http://localhost:5173/`. Keep one server active; the configuration fixes the port and uses file polling for hot reload.

`pnpm build` checks TypeScript and builds the app. `pnpm lint` checks the code. Setup checks validate the empty starter only, not countdown behavior.

After an implementation is submitted, preserve it separately from the reference and record the explanation, feedback, and observed checks in Markdown.
