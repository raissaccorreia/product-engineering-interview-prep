import './App.css'
import { galleryImages } from './images'

function App() {
  return (
    <main className="gallery-page">
      <header className="gallery-header">
        <p className="eyebrow">Scroll behavior practice</p>
        <h1>Field Notes Gallery</h1>
        <p className="intro">
          Browse the collection. The gallery behavior is yours to implement.
        </p>
      </header>

      <ul className="gallery-grid">
        {galleryImages.map((image) => (
          <li className="gallery-card" key={image.id}>
            <img src={image.src} alt={image.alt} />
            <h2>{image.title}</h2>
          </li>
        ))}
      </ul>
    </main>
  )
}

export default App
