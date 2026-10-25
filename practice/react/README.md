# React practice

This folder keeps small React and TypeScript exercises, original attempts, and reviews. The aim is to learn the behavior one piece at a time and to debug each piece without relying on a reference answer.

## Learning flow

Use one requirement per increment, usually small enough for about 15–20 minutes of focused work.

1. Explain the requirement and sketch the data flow before coding.
2. Implement only that behavior in the current exercise.
3. Check the relevant cases and debug the attempt.
4. Review the React and TypeScript mechanism, readability, and edge cases.
5. Save the attempt and review, then choose the next increment from the observed gap.

Keep editable state separate from derived values. Prefer direct, readable code. Add hooks, Context, memoization, or abstractions only when the current requirement needs them. A reference implementation belongs in a separate file and comes after the attempt.

## Exercises

- [October 22: work item tracker](2026-10-22/01-work-items/README.md), with a [short countdown timer follow-up](2026-10-22/02-countdown-timer/README.md).
- [October 25: quantity controls](2026-10-25/README.md).
- [October 26: countdown clock](2026-10-26/01-countdown-clock/README.md), including separate implementation stages and a reference.
- [October 28: lazy image gallery](2026-10-28/01-lazy-image-gallery/README.md), with a small browser API concept demo.
- [November 2: music player](2026-11-02/01-music-player/README.md), practiced through playlist selection and navigation behavior.
- [November 4: live greeting](2026-11-04/01-live-greeting/README.md), extended one interaction at a time in the same app.

## Continue

Read the review in the exercise folder before starting another increment. The latest work is in the live greeting exercise. Its review records the current implementation status and the next small behavior to revisit.

Each app has its own `package.json` and run instructions. Root-level scripts do not replace app-specific builds.
