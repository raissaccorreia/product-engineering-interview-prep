import './App.css'
import { useState } from 'react'

function App() {
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const [time, setTime] = useState(0)

  function handleMinutesChange(nextMinutes: number) {
    setMinutes(nextMinutes)
    setTime(nextMinutes * 60 + seconds)
  }

  function handleSecondsChange(nextSeconds: number) {
    setSeconds(nextSeconds)
    setTime(minutes * 60 + nextSeconds)
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
      <p>Total time: {time} seconds</p>
    </main>
  )
}

export default App
