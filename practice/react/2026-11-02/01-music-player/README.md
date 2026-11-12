# Music player practice

Build a small React and TypeScript music player. Start by explaining the state and component structure, then implement one behavior at a time.

## Exercise prompt

Create a music player for a fixed playlist. The player must let a listener select a track, play or pause the selected track, move to the previous or next track, and choose one of three repeat modes: off, repeat the playlist, or repeat the current track.

Use React Context to share the playback state and actions between the player controls and the playlist. Use a small local playlist with stable track IDs, a title, and an artist for each track. Real audio files and streaming are out of scope; represent playback state in the interface.

## Requirements

- Show the playlist and identify the currently selected track.
- Selecting a track makes it the current track and starts playback.
- Play and pause update the playback state and visible control label.
- Previous and next use the selected track's position and the active repeat mode to choose a track: `off` stays at the first/last boundary, `playlist` wraps around, and `track` keeps the current selection.
- The repeat control cycles through `off`, `playlist`, and `track` and exposes the current mode in the UI.
- Keep playback state in a React Context so both the playlist and player controls can use it.
- Handle an empty playlist without throwing.
- Keep components small and use stable keys for rendered tracks.

The first incomplete implementation is preserved in [attempt-before-implementation.tsx](./attempt-before-implementation.tsx). The working attempt and review keep the later reasoning separate.

## Current checkpoint

The app shows the state and navigation slice we discussed:

- Six local tracks are rendered in a styled `ul`/`li` playlist.
- Each row has a button that selects its track ID. The selected row is visibly active.
- The current selection starts empty. Previous/Next do nothing until a track is selected.
- The replay button cycles through three modes and displays the current mode above the controls.
- Previous/Next follow the mode rules described above.
- The working version is in [app/src/attempt.tsx](./app/src/attempt.tsx), mounted by `app/src/App.tsx`. The earlier unfinished code is preserved in [attempt-before-implementation.tsx](./attempt-before-implementation.tsx).

This slice does not add React Context or separate play/pause controls. Those parts can be discussed later if they are useful for the learning goal.

The playlist data is local; no network requests or audio files are needed. The recalled reasoning is in [attempt-notes.md](./attempt-notes.md), separate from the code snapshots.

The app is a separate Vite project on port `5175`, with file polling enabled for hot reload.

## Run

From `app/`, run `pnpm dev` and open `http://localhost:5175/`.

The prompt and sample playlist in this folder are written for this practice exercise. Keep the learner's attempt separate from a reference implementation after review.
