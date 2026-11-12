import './App.css'
import React from "react";

type Quote = {
  id: string
  text: string
  author: string
}

type QuoteCardProps = {
  quote: Quote
  isSaved: boolean
  onToggleSave: (quoteId: string) => void
}

const quotes: Quote[] = [
  { id: 'q1', text: 'Simplicity is the ultimate sophistication.', author: 'Leonardo da Vinci' },
  { id: 'q2', text: 'Great things are done by a series of small things brought together.', author: 'Vincent van Gogh' },
  { id: 'q3', text: 'The secret of getting ahead is getting started.', author: 'Mark Twain' },
]

const QuoteCard = React.memo(function QuoteCard({ quote, isSaved, onToggleSave }: QuoteCardProps) {
  console.count(`QuoteCard render: ${quote.id}`)

  return (
    <article className="quote-card">
      <blockquote>“{quote.text}”</blockquote>
      <p className="quote-author">{quote.author}</p>
      <button type="button" onClick={() => onToggleSave(quote.id)}>
        {isSaved ? 'Saved' : 'Save quote'}
      </button>
    </article>
  )
})

function App() {
  const [name, setName] = React.useState<string>("") 
  const [searchQuery, setSearchQuery] = React.useState<string>("")
  const [nameInputUpperCase, setNameInputUpperCase] = React.useState<boolean>(false)
  const nameInputRef = React.useRef<HTMLInputElement>(null)
  const [savedQuoteIds, setSavedQuoteIds] = React.useState<string[]>([])
  const [previewRefreshCount, setPreviewRefreshCount] = React.useState(0)
  
  function handleChange(value: string) {
     setName(value)
  }
  
  function handleNameInputUpperCase(value: boolean) {
     setNameInputUpperCase(value)
  }

  const displayName = name.trim() || 'visitor'
  const normalGreeting = `Hello, ${displayName}!`
  const greeting = nameInputUpperCase ? normalGreeting.toUpperCase() : normalGreeting
    
  React.useEffect(() => {
    document.title = greeting
  }, [greeting])
  
  function resetNameField() {
     nameInputRef.current?.focus();
     setName("")
  }

  const handleToggleQuoteSave = React.useCallback((quoteId: string) => {
    setSavedQuoteIds((currentIds) =>
      currentIds.includes(quoteId)
        ? currentIds.filter((id) => id !== quoteId)
        : [...currentIds, quoteId]
    )
  }, [])
  
   const handleSearch = React.useCallback((value: string) => {
     setSearchQuery(value)
   }, [])
  
  return (
    <main className="greeting-page">
      <p className="eyebrow">React + TypeScript warm-up</p>
      <h1>Live greeting</h1>
      <p className="intro">
        A small exercise in controlled input and synchronizing the page title.
      </p>

      <section className="greeting-card" aria-label="Greeting form">
        <label htmlFor="name">Your name</label>
        <input 
          id="name"
          name="name"
          type="text"
          placeholder="Type your name"
          ref={nameInputRef}
          value={name}
          onChange={(event) => handleChange(event.currentTarget.value)}
        />
        <p className="greeting">{greeting}</p>
        <input 
          id="case"
          name="case"
          type="checkbox"
          checked={nameInputUpperCase}
          onChange={(event) => handleNameInputUpperCase(event.currentTarget.checked)}
        />
        <label htmlFor="case">Uppercase Greeting</label>
        <button onClick={() => nameInputRef.current?.focus()}>Focus Name Field</button>
        <button onClick={() => resetNameField()} disabled={name.length === 0}>Clear Name</button>
      </section>

      <section className="quote-shelf" aria-labelledby="quote-shelf-title">
        <div className="quote-shelf-heading">
          <div>
            <p className="eyebrow">A tiny collection</p>
            <h2 id="quote-shelf-title">Lines worth keeping</h2>
          </div>
          <div className="quote-shelf-controls">
            <span>Preview refreshes: {previewRefreshCount}</span>
            <button
              type="button"
              onClick={() => setPreviewRefreshCount((count) => count + 1)}
            >
              Refresh preview
            </button>
          </div>
        </div>
        <input
         id="search"
         name="search"
         value={searchQuery}
         onChange={(event) => handleSearch(event.currentTarget.value)} 
        />
        {/* put this below on the react.memo */}
        <p>{quotes.filter((quote) => quote.text  === searchQuery || quote.autor === searchQuery).length} quotes matching the search</p>
        {/* if zero make an empty state */}
        <div className="quote-grid">
          {quotes.filter((quote) => quote.text  === searchQuery || quote.autor === searchQuery).map((quote) => (
            <QuoteCard
              key={quote.id}
              quote={quote}
              isSaved={savedQuoteIds.includes(quote.id)}
              onToggleSave={handleToggleQuoteSave}
            />
          ))}
        </div>
      </section>
    </main>
  )
}

export default App
