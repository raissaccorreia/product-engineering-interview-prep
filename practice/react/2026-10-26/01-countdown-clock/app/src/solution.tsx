import { useEffect, useReducer } from 'react'

type ClockStatus = 'idle' | 'running' | 'paused' | 'finished'

type CountdownState = {
  minutesInput: string
  secondsInput: string
  remainingSeconds: number
  status: ClockStatus
}

type CountdownAction =
  | { type: 'minuteChanged'; value: string }
  | { type: 'secondChanged'; value: string }
  | { type: 'start' }
  | { type: 'togglePause' }
  | { type: 'reset' }
  | { type: 'tick' }

const initialState: CountdownState = {
  minutesInput: '0',
  secondsInput: '0',
  remainingSeconds: 0,
  status: 'idle',
}

function countdownReducer(
  state: CountdownState,
  action: CountdownAction,
): CountdownState {
  switch (action.type) {
    case 'minuteChanged':
      return { ...state, minutesInput: action.value }

    case 'secondChanged':
      return { ...state, secondsInput: action.value }

    case 'start': {
      const totalSeconds = Math.max(
        0,
        Number(state.minutesInput || 0) * 60 + Number(state.secondsInput || 0),
      )

      return {
        ...state,
        remainingSeconds: totalSeconds,
        status: totalSeconds === 0 ? 'finished' : 'running',
      }
    }

    case 'togglePause':
      if (state.status === 'running') {
        return { ...state, status: 'paused' }
      }

      if (state.status === 'paused') {
        return { ...state, status: 'running' }
      }

      return state

    case 'reset':
      return initialState

    case 'tick': {
      if (state.status !== 'running') return state

      const remainingSeconds = Math.max(0, state.remainingSeconds - 1)

      return {
        ...state,
        remainingSeconds,
        status: remainingSeconds === 0 ? 'finished' : 'running',
      }
    }
  }
}

function formatTime(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60

  return `${minutes}:${String(seconds).padStart(2, '0')}`
}

export default function CountdownClockSolution() {
  const [state, dispatch] = useReducer(countdownReducer, initialState)

  useEffect(() => {
    if (state.status !== 'running') return

    const timeoutId = window.setTimeout(() => {
      dispatch({ type: 'tick' })
    }, 1000)

    return () => window.clearTimeout(timeoutId)
  }, [state.status, state.remainingSeconds])

  return (
    <main>
      <h1>Countdown clock</h1>

      <div>
        <label htmlFor="solution-minutes">Minutes</label>
        <input
          id="solution-minutes"
          type="number"
          min="0"
          step="1"
          value={state.minutesInput}
          onChange={(event) =>
            dispatch({ type: 'minuteChanged', value: event.currentTarget.value })
          }
        />
      </div>

      <div>
        <label htmlFor="solution-seconds">Seconds</label>
        <input
          id="solution-seconds"
          type="number"
          min="0"
          max="59"
          step="1"
          value={state.secondsInput}
          onChange={(event) =>
            dispatch({ type: 'secondChanged', value: event.currentTarget.value })
          }
        />
      </div>

      <button type="button" onClick={() => dispatch({ type: 'start' })}>
        Start
      </button>
      <button
        type="button"
        onClick={() => dispatch({ type: 'togglePause' })}
        disabled={state.status !== 'running' && state.status !== 'paused'}
      >
        {state.status === 'paused' ? 'Resume' : 'Pause'}
      </button>
      <button type="button" onClick={() => dispatch({ type: 'reset' })}>
        Reset
      </button>

      <p aria-live="polite">Time: {formatTime(state.remainingSeconds)}</p>
      {state.status === 'finished' && <p role="status">Time is up.</p>}
    </main>
  )
}
