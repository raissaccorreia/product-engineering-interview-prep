# Diagnostic 2: countdown timer

Time limit: 15 minutes. Use the same local React + TypeScript environment from [the first exercise](../01-work-items/app/README.md); implement in `app/src/App.tsx`. Styling is not assessed.

Build a countdown timer that starts at 15 seconds.

## Requirements

- Show the remaining time in seconds. Initially, show 15.
- Provide Start, Pause, and Reset controls.
- Start begins a one-second countdown. Repeated clicks on Start must not make it count down faster.
- Pause freezes the timer. Start after Pause resumes from the displayed value.
- At zero, the countdown stops and the value remains zero.
- Reset returns to 15 and stops the countdown.
- Release the interval when the timer stops and when the component unmounts.

## Submit

Report your elapsed time and explain the behavior in English. Include checks for pause/resume, repeated Start clicks, zero, and reset. State whether you ran the component and what you observed. Stop at 15 minutes and send the attempt as it stands.

The reference solution and review will be recorded after your attempt.
