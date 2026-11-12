# Review of the recalled approach

## State and data model

Choosing separate state values instead of `useReducer` was a reasonable time-pressure decision. A reducer is not required for a player. The useful distinction is between the playlist (fixed input data) and the changing playback state, such as the selected song ID, whether playback is active, and the repeat mode.

Using the selected song ID as the current selection is also reasonable. The current song object and its position can be derived from the playlist when needed, so the list itself does not need to be mutated to move between songs. The app now reflects the recalled checkpoint: selecting a row updates its active styling, and Previous/Next are wired to named functions that are still empty.

## Finding the current position

The planned lookup needs an index. In JavaScript, `find` returns the matching song object (or `undefined`); `findIndex` returns its array position (or `-1`). Any navigation logic needs to account for the not-found case before calculating a neighboring position.

## Event handling

The recollection of `event.target.value` is still uncertain, so it is not treated as a confirmed part of the attempt. We can compare event-based selection with passing the song ID directly from the row after the rest of the implementation is recalled.

## Repeat behavior

The reference implementation now uses a `switch` for the three mutually exclusive modes. No-repeat stops at the playlist boundaries, playlist-repeat wraps, and single-track-repeat keeps the current track selected when Previous/Next is pressed. The replay-mode button changes the state and displays the active mode.

Keep the boundary check mode-aware. A universal early return at the first or last track would also block the wraparound required by playlist-repeat. In JavaScript, modulo can calculate the wrapped index; for the previous direction, add the playlist length before applying `%` so the result is not negative.

`findIndex` scans the playlist, so each navigation action is O(n) time and O(1) additional space. It returns `-1` if the selected ID is not found; the implementation exits without changing state in that case. The playlist is fixed and small here, so the straightforward lookup is easy to follow.

The implementation in `app/src/attempt.tsx` is intentionally limited to the discussed slice. It does not add Context, track-end events, or a separate play/pause state. The unfinished code from before this guided implementation is preserved in `attempt-before-implementation.tsx`.

## Suggested next step

Before implementing controls, agree on a small behavior table for the three modes: what happens at the first and last song when previous/next is clicked, and what happens when the current song ends. Then implement one transition at a time and keep the original attempt notes separate from any reference solution.
