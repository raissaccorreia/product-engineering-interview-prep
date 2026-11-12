import { useState } from 'react'
import './App.css'

type Track = {
  id: string
  title: string
}

type ReplayTypes = "none" | "song" | "playlist"

const tracks: Track[] = [
  { id: 'track-01', title: 'After the Rain' },
  { id: 'track-02', title: 'Small Hours' },
  { id: 'track-03', title: 'Paper Satellites' },
  { id: 'track-04', title: 'Low Tide' },
  { id: 'track-05', title: 'City in Blue' },
  { id: 'track-06', title: 'Last Light' },
]

function App() {
  const [playingTrackId, setPlayingTrackId] = useState('')
  const [replayType, setReplayType] = useState<ReplayTypes>("none")

  function playTrack(trackId: string) {
    setPlayingTrackId(trackId)
  }

  function previousSong() {
    // Navigation is the next step of the exercise.
  }

  function nextSong() {
     const oldIndex = tracks.findIndex((track) => track.id === playingTrackId);
     
     if replayType === "none"
        setPlayingTrackId(tracks[oldIndex + 1].id)
     else if replayType === "song"
        setPlayingTrackId(tracks[oldIndex].id)
     else
        if oldIndex + 1 > tracks.length
          setPlayingTrackId(tracks[0].id)
        else 
       setPlayingTrackId(tracks[oldIndex + 1].id)
  }

  return (
    <main className="practice-page">
      <header className="page-header">
        <p className="eyebrow">React + TypeScript practice</p>
        <h1>Music player</h1>
        <p className="intro">
          Select a song, then work on the previous and next controls.
        </p>
      </header>

      <section className="player" aria-label="Music player">
        <div className="now-playing">
          <span className="note-mark" aria-hidden="true">♫</span>
          <div>
            <p className="section-label">Now playing</p>
            <p className="current-track">
              {tracks.find((track) => track.id === playingTrackId)?.title ?? 'Choose a song'}
            </p>
          </div>
        </div>

        <div className="player-controls" aria-label="Track navigation">
          <button className="control-button" type="button" onClick={previousSong}>
            Previous
          </button>
          <button className="control-button" type="button" onClick={nextSong}>
            Next
          </button>
        </div>

        <ul className="track-list" aria-label="Playlist">
          {tracks.map((track) => {
            const isActive = track.id === playingTrackId

            return (
              <li className={`track-row${isActive ? ' active' : ''}`} key={track.id}>
                <button
                  className="track-button"
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => playTrack(track.id)}
                >
                  <span className="track-number">{track.id.slice(-2)}</span>
                  <span className="track-title">{track.title}</span>
                  <span className="track-action">{isActive ? 'Playing' : 'Play'}</span>
                </button>
              </li>
            )
          })}
        </ul>
      </section>
    </main>
  )
}

export default App
