# Live greeting: attempt and review

## Exercise

Build a controlled name input, show a greeting derived from the input, and synchronize the browser tab title with that greeting. An empty or whitespace-only name uses `Hello, visitor!`.

## the learner's implementation

The implementation is in `app/src/App.tsx`. It uses `React.useState<string>('')` for the editable name, a controlled input, a `handleChange` function, and `React.useEffect` to update `document.title`.

The first version used an unbound `event` in the `onChange` callback and set the tab title to the raw name. During review, the learner changed the callback to pass `event.currentTarget.value`, derived one `greeting` string with `name.trim()`, and used that same string in the page and the effect. The effect now depends on `[greeting]`.

## Review

- State choice is appropriate: the name is editable, while the greeting is derived during render rather than stored in another state variable.
- The input is controlled because `value` comes from React state and `onChange` updates that state.
- `event.currentTarget.value` reads the value from the input that owns the handler. The `handleChange(value: string)` wrapper is clear; directly calling `setName` from the callback would also be reasonable.
- `name.trim()` makes empty and whitespace-only input use the fallback.
- `useEffect` is appropriate here because `document.title` is browser state outside the rendered React tree. The effect writes the derived greeting, and `[greeting]` names the value it reads.
- No cleanup is needed for this small page-level title synchronization.
- `useState<string>('')` is valid, though TypeScript can infer `string` from the initial value. Using named imports for `useState` and `useEffect` is a style option, not a correctness requirement.

## Verification

Reviewed the final source after the learner's edit. No build or automated tests were run after that final edit. Suggested manual cases are an empty value, a name, and a value containing only spaces; check that the visible greeting and tab title match in each case.

## Future practice format

- Continue in the same `App.tsx` for related React concepts.
- Keep each coding increment small enough for about 15–20 minutes.
- Give one instruction at a time in English; wait for the learner's attempt before feedback or a reference implementation.
- Review correctness, edge cases, verification, readability, and React patterns in Portuguese.
- Record each instruction and the resulting discussion in this archive before moving to the next increment.

## Increment 1: focus the name field

Target duration: 15–20 minutes.

### Prompt

Add a button labeled "Focus name field" to the existing greeting card. When clicked, it should move keyboard focus to the name input so the user can type immediately. This action must not change the greeting or the browser tab title. Implement only this interaction in the existing `app/src/App.tsx`.

Wait for the learner's attempt before giving feedback or a reference implementation. In the review, discuss which React value needs to be stored, if any, and why this interaction is separate from the greeting state.

### Attempt and review

The learner first added an inline button callback that called `document.getElementById("name").focus()`. After discussing refs, the current version uses `React.useRef<HTMLInputElement>(null)`, attaches it to the input, and calls `nameInputRef.current?.focus()` from the button. The intended behavior and the React pattern are now correct. A separate named function is optional for this one-line action.

Focus is an imperative DOM action; it does not belong in greeting state and does not need an effect. The ref is scoped to this input and accounts for the fact that it is initially `null`. The button can add `type="button"` as an explicit HTML behavior, though it is not inside a form here.

No build or browser interaction check was run for this increment; this review is based on the source.

## Increment 2: clear the name

Target duration: 15–20 minutes.

### Prompt

Add a "Clear name" button to the greeting card. When clicked, it should empty the name input and move focus back to that input. The greeting and browser tab title should update to their existing default greeting. Disable the button when the input contains zero characters. Implement this in the existing `app/src/App.tsx`.

Before editing, briefly explain which existing value the click needs to change and which UI values should follow from it. Keep the implementation within this increment; do not add another feature yet.

### Attempt and review

The learner added `resetNameField`, which focuses the input through its ref and resets `name` to an empty string. The greeting is already derived from `name`, and the existing effect updates the tab title from the greeting, so no extra state is needed. The button's `disabled={name.length === 0}` condition is derived from the same state and follows the requirement. Grouping the two related actions in a named handler is clear; the button could use `onClick={resetNameField}` without the extra arrow wrapper. Add `type="button"` to both buttons as a small HTML/React convention. They are not inside a form, so this is not blocking behavior here.

The learner reported that this increment felt easy and was completed without web research or outside help. No precise elapsed time was reported. This supports moving the next step slightly up in difficulty while keeping it small.

## Increment 3: uppercase greeting option

Target duration: 15–20 minutes.

### Prompt

Add a checkbox labeled "Uppercase greeting" to the greeting card. When checked, the greeting shown on the page and the browser tab title should use uppercase letters. When unchecked, both should return to the normal greeting. Keep the name input, focus button, and Clear Name button working. Implement only this increment in the existing `app/src/App.tsx`.

Before editing, briefly explain what changes when the checkbox is toggled and which displayed values should follow from that change.

### Increment 3 review (2026-11-06)

The learner reported that the page now renders and manually checked the behavior. Review of the saved `app/src/App.tsx` and `pnpm build` shows that the increment is not complete in the source currently on disk: TypeScript reports an unused `greeting`, a string passed where the checkbox handler expects a boolean, and `for` used instead of React's `htmlFor`.

The checkbox handler reads `event.currentTarget.value`; for a checkbox, the boolean state is `event.currentTarget.checked`, and a controlled checkbox should update from `onChange`. The label currently uses `for="nameInputUpperCase"`, which is not valid React JSX and does not match the checkbox id `case`; use `htmlFor` with the matching id. The `greeting` value currently does not apply `nameInputUpperCase`, while the JSX and title effect separately call `exhibitGreeting()`. Derive one formatted greeting value from `name` and `nameInputUpperCase`, then use it for both the visible greeting and the effect. Depending on the freshly created `exhibitGreeting` function makes the effect run after every render; depending on the derived string tracks the actual external value being synchronized.

The production build failed with these three TypeScript diagnostics. No correction was applied by the reviewer; the learner's attempt remains in `app/src/App.tsx`. Revisit the checkbox increment before moving on to another exercise.

### Guided correction

At the learner's request, the pre-correction source was preserved as `attempt-increment-03-before-guided-fix.tsx`, and the current `app/src/App.tsx` was updated together:

- A checkbox exposes its boolean state through `event.currentTarget.checked`. The handler uses `onChange` and passes that boolean to `setNameInputUpperCase`; `.value` is a string and is not the checked state.
- `normalGreeting` is derived from the trimmed name and fallback. `greeting` then applies `toUpperCase()` to the complete sentence only when the option is enabled. The same derived string renders in the card and synchronizes `document.title`.
- The effect depends on `[greeting]`, the actual value it reads. A function declared in the component body gets a new identity on each render; depending on that function would rerun the effect after every render.
- The checkbox label uses `htmlFor="case"` to match the input's `id="case"`.

`pnpm build` passed after these changes. This confirms TypeScript compilation and the production Vite build; the visible behavior should still be manually checked for unchecked, checked, empty-name, and Clear Name states.

## Increment 4: stable callbacks for memoized quote cards

Target duration: 20–25 minutes.

### Prompt

The page now includes a small quote shelf. Each quote card is wrapped in `React.memo`, and the cards log their renders in the browser console. Saving and unsaving quotes already works. The parent also has a "Refresh preview" button that updates its own counter.

Improve the quote shelf so refreshing the preview does not cause unchanged quote cards to render again. Use `useCallback` for the callback passed to the memoized cards. Keep the save and unsave behavior working, and make sure saving one quote does not change the saved state of another.

After implementing it, explain what makes the callback's identity stable, which values its body reads, and why its dependency list is correct. Use the browser console to compare card renders when refreshing the preview versus saving a quote. The development environment may log an initial render more than once; focus on whether later parent-only refreshes add card renders.

### Starting point

The complete, working greeting from increment 3 was preserved in `solution-increment-03.tsx`. The running exercise remains in `app/src/App.tsx`: `QuoteCard` is memoized, quote data is module-scoped, save state uses a functional update, and `handleToggleQuoteSave` is currently recreated inside `App`. This intentionally leaves the callback-identity problem for the learner to address.

The quote shelf styling is in `app/src/App.css`. Keep the existing greeting interactions working while completing this increment.

### Learner's first attempt and diagnosis (2026-11-06)

The learner tried to create `handleSaveQuote` with `React.useCallback`, have it call the existing `handleToggleQuoteSave`, and pass the wrapper to `QuoteCard`. This is a reasonable direction, but the current code has two compiler errors: the `quoteId` callback parameter is implicitly `any`, and the dependency list refers to nonexistent `saveQuoteIds` instead of `savedQuoteIds`.

The misspelled identifier also explains the blank page: JavaScript evaluates the dependency array during render, so referencing the undeclared `saveQuoteIds` throws a `ReferenceError` before the component can finish rendering. The build reports this as `TS2552`.

The simpler pattern to study is to memoize the save-toggle handler itself and pass that same function to each card. Its state update already uses the functional updater form, so the callback body can work from the latest saved IDs without reading the `savedQuoteIds` variable from a render. `useCallback` preserves the function identity while its dependencies remain `Object.is`-equal; it does not preserve state or prevent the callback from running when clicked. No code correction was applied during this diagnosis; the current attempt remains in `app/src/App.tsx`.

### How this memoization example works

`Refresh preview` calls `setPreviewRefreshCount`, so React renders `App` again and updates the visible counter. It does not reload the browser document or clear component state. A full browser reload recreates the app and clears in-memory state such as `savedQuoteIds`; durable state would require persistence such as storage or a server. The button is a deliberate way to cause a parent-only render for this exercise; in a product, another independent parent state or prop could cause the same situation.

On each `App` render, the quote data remains the same module-level objects, `isSaved` stays the same for each quote unless that quote is toggled, and `handleToggleQuoteSave` has a stable function identity from `useCallback`. `React.memo` compares each prop with its previous value using `Object.is`. When all props match, React can skip rendering that `QuoteCard`. Saving one quote changes that card's `isSaved` prop; the other cards' props remain equal and can be skipped.

`useCallback` does not stop JavaScript from creating the function expression during render. It returns the prior function reference when the dependencies compare equal; otherwise it returns the new one. The hook does not call the function—the card calls it on a click. In this handler, `setSavedQuoteIds` uses a functional updater, so the callback receives the latest state as `currentIds` and does not close over `savedQuoteIds`; the state setter is stable, so the dependency list can be empty.

This project does not have React Compiler configured: `vite.config.ts` uses the standard Vite React plugin. Here `React.memo` and `useCallback` are manual runtime memoization. React Compiler is a separate build-time tool that can automatically memoize components and values when installed and configured. Sources: [React `useCallback`](https://react.dev/reference/react/useCallback), [React `memo`](https://react.dev/reference/react/memo), [React Compiler](https://react.dev/learn/react-compiler).

## Session plan: 2026-11-09 (60 minutes)

The current `app/src/App.tsx` now memoizes `handleToggleQuoteSave` with `React.useCallback` and passes it directly to each `QuoteCard`. This session starts with a 20-minute observation exercise to consolidate the behavior, not with re-implementing the same handler.

### Increment 5: observe callback identity and memoized renders

Target duration: 20 minutes.

#### Prompt

Use the existing quote shelf and browser console. Do not change the save behavior.

1. With `handleToggleQuoteSave` currently wrapped in `useCallback`, clear the console and click **Refresh preview** three times. Note whether the `QuoteCard render` counters change.
2. Temporarily replace that callback with an equivalent ordinary function, leaving its state update logic unchanged. Click **Refresh preview** three times again and compare the counters.
3. Restore the `useCallback` version. Save one quote and note which card counters change.
4. Explain which component consumes the callback, what `React.memo` compares, why the parent render preserves `savedQuoteIds`, and why a full browser reload resets it.

In this development app, React Strict Mode can make render counters advance more than once for a render. Compare whether the counters advance after each parent-only refresh; do not rely on their absolute initial values. If Hot Module Replacement resets the UI while switching the function, save the quote again before the last observation.

The purpose is to observe why a stable callback prop helps a memoized child. The three quote cards are intentionally small; treat this as a focused learning example, not a claim that this optimization is needed for every production list.

### Why not stabilize every function?

Function identity matters only when some consumer compares or otherwise depends on that identity. Most local functions are called during render or used as ordinary event handlers; recreating them is generally cheap and does not alter the UI. `useCallback` is useful when a function is passed to a `memo` component or is a dependency whose identity must stay stable. Using it everywhere adds dependency bookkeeping and makes code harder to read; missing a dependency can also leave a callback closing over an old render's value.

In this quote shelf, `QuoteCard` is the consumer: it receives `onToggleSave`, and `React.memo` compares that function prop along with `quote` and `isSaved`. The card invokes the callback when its button is clicked. The callback is not a store for quote IDs; `savedQuoteIds` state stores the selection. Ordinary functions are also useful directly, for example as a helper that formats a label or as an event handler that does not cross a memoized boundary.

React Compiler is a separate build-time optimization, not a runtime default that makes all JavaScript function identities permanent. It can automatically memoize React components and hooks when configured, while standalone functions are not universally memoized. In this app's Vite setup, no React Compiler plugin is configured. Sources: [React `useCallback`](https://react.dev/reference/react/useCallback), [React Compiler introduction](https://react.dev/learn/react-compiler/introduction).

#### The learner's first observations

The learner noticed the render behavior in step 1. For step 2, the learner asked whether the ordinary function should work and whether a terminal restart was needed for state to save; step 3 is pending that comparison. Clarification: no terminal restart is needed for the experiment. Vite hot reloads the edited source; clicking **Refresh preview** updates React state and re-renders the parent. The quote save state remains during that render. A full browser reload is different and resets in-memory React state.

To complete the observation, temporarily use the ordinary handler, click **Refresh preview** several times, and check whether each `QuoteCard render` counter increases. Then restore `useCallback`, click **Refresh preview** again, and compare. Finally toggle one quote and note which card's `isSaved` prop changed. Do not treat a successful click as proof that memoization worked; compare the render counters.

The learner then shared a console screenshot showing that, with the ordinary function active, all three `QuoteCard` counters increased after the parent update. The paired render entries are consistent with this app's `<StrictMode>` development behavior. This confirms the ordinary-function side of the comparison. Restoring `useCallback` and observing one quote toggle is still pending.

The learner later reported restoring the callback and observing fewer calls, then explained that `useCallback` stores both the function reference and its result (the saved quote IDs). The reduction in calls is the expected observation, but the result is not cached by `useCallback`: `savedQuoteIds` remains in `useState`, while `useCallback` keeps the handler reference stable. The handler still runs when a quote button is clicked. `console.count` logs how often the `QuoteCard` component function runs; it does not log which IDs are saved. The saved/unsaved label comes from the `isSaved` prop.

This completes the callback-identity observation. The precise render count after toggling a quote was not reported; the expected check is that the card whose `isSaved` value changed renders, while other cards with unchanged props can be skipped.

### Increment 6: search and select quote cards

Target duration: 25–30 minutes.

#### Prompt

Extend the existing quote shelf in `app/src/App.tsx`:

- Add a controlled search field that filters quotes by their text or author, without regard to letter case.
- Keep each quote's Save/Unsave button working. A quote must remain saved when it is filtered out and later appears again.
- Show a clear empty state when the search has no matches.
- Show how many quotes are saved out of the total number of quotes.
- Keep the greeting controls and the quote-card render optimization working.

Before coding, explain which data belongs in state and which values should be derived from the quote list and saved IDs. Use the existing quote data; do not add an API or another app.

#### Review checklist

Check an empty search, a case-insensitive match in an author or quote, a query with no matches, saving then filtering a quote out and back in, and the saved count. Also compare whether typing a query changes render counts for quote cards that remain visible with unchanged props.

#### The learner's explanation and review

The learner observed that the difference is visible in the terminal console rather than in the rendered page. The explanation was that without the callback, memo has to run again because it cannot know which IDs are current, and that the callback and memo together store the value across renders.

The observation is right, but the cause and storage model need refinement. In this exercise, the normal handler is a new function object on each `App` render. `React.memo` sees that the `onToggleSave` prop has a different identity and cannot skip the `QuoteCard` render. The IDs are not hidden: `quote.id` is in the stable quote object, and the card receives its `isSaved` boolean as another prop. `savedQuoteIds` state is what stores which items are saved. `useCallback` caches the handler's function reference, while `React.memo` can skip rendering a card when its props are unchanged; neither one stores the selected IDs.

For clearer technical English, name the exact thing that runs again: `QuoteCard` re-renders, while `React.memo` compares props. Avoid saying that "memo reruns" or that the callback and memo "store the value," because both phrases blur rendering optimization with state storage.

### Next short increment (after Increment 5)

Plan a 25–30 minute interactive list with a search field and selectable items. Focus on controlled input, filtering derived from the source list, per-item selection, and the empty-results case. Present its prompt only after Increment 5 is reviewed so the training continues one exercise at a time.

#### The learner's first attempt and direction review

The attempt is preserved in `attempt-increment-06-search-in-progress.tsx`; the working `app/src/App.tsx` remains untouched by the review.

Correct direction so far: `searchQuery` is state for the controlled input, and filtered quotes should be derived from `quotes` and that query. The filter result should not become separate state.

Corrections and next steps:

- `useCallback` caches a function reference; it does not cache the filtered list or the count. `handleSearch` only calls a state setter and is not passed to a memoized child, so it does not need `useCallback` here.
- The current conditions use exact equality (`quote.text === searchQuery`), so partial text will not match. `String.prototype.includes` is the method for checking whether a string contains a substring. To ignore case, compare normalized lowercase strings; use `trim()` on the query so whitespace-only input behaves like an empty query.
- The property is `author`, not `autor`.
- The current code runs `filter` twice, once for the count and once for rendering. Derive a single `filteredQuotes` value during render, then use it for both the count and `map`. With only three quotes, `useMemo` is not needed to make this calculation performant; using one derived value is enough.
- Add the required empty state and saved-count display. Keep `savedQuoteIds` as the source of truth so a quote remains saved while filtered out.

No full solution was provided; the learner can continue implementing these pieces in `app/src/App.tsx`.

#### Second attempt review (2026-11-12)

The updated attempt is preserved in `attempt-increment-06-search-second-attempt.tsx`. `pnpm build` reports TypeScript errors in the new helper:

- `search` declares `quote: string` but reads `quote.text`, and callers pass a `Quote` object.
- `const author = author.trim()` references the local variable in its own initializer; the value should come from the quote object.
- The helper's second match condition checks `text.includes(author)`, which compares quote text to the author text instead of checking whether the author contains the query.
- The displayed count and rendered list currently use separate filter expressions, so they can disagree.

The JSX is parseable, so the reported failure is not a JSX parser error. The conditional is not currently a ternary expression: only the count is inside `{}`, while `?` and `:` are JSX text. Wrap the full `condition ? result : fallback` expression in JSX braces. The empty-state paragraph currently appears unconditionally.

Suggested editing sequence for this exercise: first give the matcher a correct type and make it return the right boolean; next derive one `filteredQuotes` array; then render the count, list, or empty state from that single array; finally add the saved count and check edge cases. `String.prototype.includes` is correct for substring matching; normalize both sides for case-insensitive search and trim the query. No solution was applied by the reviewer.
