import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import './LazyLoadingConcepts.css'
import { galleryImages } from './images'

// React.lazy defers this module's JavaScript until the component is rendered.
// The example module is separate so Vite can create a real dynamic-import chunk.
const ReactLazyGallery = lazy(() => import('./ReactLazyGalleryExample'))

const observerImages = galleryImages.slice(0, 6)

function IntersectionObserverGallery() {
  const [loadedImageIds, setLoadedImageIds] = useState<Set<string>>(() => new Set())
  const imageTargets = useRef(new Map<string, HTMLDivElement>())

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // This is a normal JavaScript callback passed to the browser API.
        // It does not need useCallback: it is created inside this Effect and
        // is not passed to a memoized child or used as an Effect dependency.
        for (const entry of entries) {
          if (!entry.isIntersecting) continue

          const imageId = entry.target.getAttribute('data-image-id')
          if (!imageId) continue

          setLoadedImageIds((currentIds) => {
            const nextIds = new Set(currentIds)
            nextIds.add(imageId)
            return nextIds
          })

          // Each target only needs to trigger image loading once.
          observer.unobserve(entry.target)
        }
      },
      {
        // Start loading a little before the target reaches the viewport.
        rootMargin: '120px 0px',
        threshold: 0.1,
      },
    )

    imageTargets.current.forEach((target) => observer.observe(target))

    // Disconnect every observed target when this Effect is cleaned up.
    return () => observer.disconnect()
  }, [])

  return (
    <ul className="concept-grid">
      {observerImages.map((image) => (
        <li className="concept-card" key={image.id}>
          <div
            className="concept-image-frame"
            data-image-id={image.id}
            ref={(element) => {
              if (element) imageTargets.current.set(image.id, element)
              else imageTargets.current.delete(image.id)
            }}
          >
            {loadedImageIds.has(image.id) ? (
              <img src={image.src} alt={image.alt} />
            ) : (
              <div className="image-placeholder">Scroll this image into view</div>
            )}
          </div>
          <h3>{image.title}</h3>
        </li>
      ))}
    </ul>
  )
}

export default function LazyLoadingConcepts() {
  const [showReactLazyGallery, setShowReactLazyGallery] = useState(false)

  return (
    <main className="concept-page">
      <a href="/">Back to the exercise</a>
      <header className="concept-header">
        <p className="eyebrow">Two different kinds of lazy loading</p>
        <h1>What gets loaded, and when?</h1>
        <p>
          React.lazy delays a component's JavaScript module. IntersectionObserver
          reports when an element approaches the viewport, so this example can
          delay assigning each image URL until its placeholder is near view.
        </p>
      </header>

      <section aria-labelledby="observer-title">
        <h2 id="observer-title">Image loading with IntersectionObserver</h2>
        <p>
          Scroll down. One observer watches all six placeholders; each image is
          requested once its placeholder intersects the expanded viewport.
        </p>
        <IntersectionObserverGallery />
      </section>

      <section className="react-lazy-section" aria-labelledby="react-lazy-title">
        <h2 id="react-lazy-title">Component loading with React.lazy</h2>
        <p>
          The gallery component's JavaScript is fetched only after you request
          it. When it renders, its image elements are all added together.
        </p>
        <button
          type="button"
          onClick={() => setShowReactLazyGallery(true)}
          disabled={showReactLazyGallery}
        >
          Load the React.lazy component
        </button>
        {showReactLazyGallery && (
          <Suspense fallback={<p role="status">Loading component code…</p>}>
            <ReactLazyGallery />
          </Suspense>
        )}
      </section>
    </main>
  )
}
