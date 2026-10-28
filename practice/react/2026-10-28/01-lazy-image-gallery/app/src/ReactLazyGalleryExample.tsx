import { galleryImages } from './images'

export default function ReactLazyGalleryExample() {
  return (
    <ul className="concept-grid">
      {galleryImages.slice(6, 12).map((image) => (
        <li className="concept-card" key={image.id}>
          {/* React.lazy delayed this component's code, not these image requests. */}
          <img src={image.src} alt={image.alt} />
          <h3>{image.title}</h3>
        </li>
      ))}
    </ul>
  )
}
