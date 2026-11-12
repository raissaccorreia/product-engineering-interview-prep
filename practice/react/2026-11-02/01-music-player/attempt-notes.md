# Implementation notes

These notes describe the work in this folder's original music-player exercise.

- The initial version stored the selected track ID and repeat mode separately.
- The first navigation attempt found an array index, then handled boundaries and wraparound. It needed an explicit check for an empty or unknown selection.
- The reviewed attempt keeps the first and last boundaries fixed in `none` mode, wraps in `playlist` mode, and leaves the selection unchanged in `song` mode.
- The exercise uses local sample data and represents playback in the UI. It does not load audio or connect to a service.

The unfinished code is preserved in [attempt-before-implementation.tsx](./attempt-before-implementation.tsx). The current working code is in [app/src/attempt.tsx](./app/src/attempt.tsx).
