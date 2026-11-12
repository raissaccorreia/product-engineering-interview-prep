import './App.css'
import { useState, useEffect } from 'react'

function App() {
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const [time, setTime] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [pausedTime, setPausedTime] = useState(0)

  const displayedTime = isPaused ? pausedTime : time
  const displayedMinutes = Math.floor(displayedTime / 60)
  const displayedSeconds = displayedTime % 60

  useEffect(() => {
    if (isPaused || time <= 0) return

    const timeoutId = setTimeout(() => {
      setTime((currentTime) => currentTime - 1)
    }, 1000)

    return () => window.clearTimeout(timeoutId)
  }, [isPaused, time])

  function handleMinutesChange(nextMinutes: number) {
    setMinutes(nextMinutes)
  }

  function handleSecondsChange(nextSeconds: number) {
    setSeconds(nextSeconds)
  }

  function handleStart() {
    setTime(minutes * 60 + seconds)
  }

  function handlePauseResumeToggle() {
    if (isPaused) {
      setIsPaused(false)
      return
    }

    setPausedTime(time)
    setIsPaused(true)
  }

  function handleReset() {
    setMinutes(0)
    setSeconds(0)
    setTime(0)
    setPausedTime(0)
    setIsPaused(false)
  }

  return (
    <main>
      <h1>Countdown clock</h1>
      <div>
        <label htmlFor="minutes">Minutes</label>
        <input
          id="minutes"
          type="number"
          value={minutes}
          onChange={(event) => handleMinutesChange(Number(event.currentTarget.value))}
        />
      </div>
      <div>
        <label htmlFor="seconds">Seconds</label>
        <input
          id="seconds"
          type="number"
          value={seconds}
          onChange={(event) => handleSecondsChange(Number(event.currentTarget.value))}
        />
      </div>
      <button type="button" onClick={handleStart}>
        Start
      </button>
      <button type="button" onClick={handlePauseResumeToggle}>
        {isPaused ? 'Resume' : 'Pause'}
      </button>
      <button type="button" onClick={handleReset}>
        Reset
      </button>
      <p>
        Time: {displayedMinutes}:{String(displayedSeconds).padStart(2, '0')}
      </p>
    </main>
  )
}

export default App
