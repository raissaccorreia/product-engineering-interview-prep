import './App.css'
import React from "react";

function App() {
  const [name, setName] = React.useState<string>("")
  const [nameInputUpperCase, setNameInputUpperCase] = React.useState<boolean>(false)
  const nameInputRef = React.useRef<HTMLInputElement>(null)
  
  function handleChange(value: string) {
     setName(value)
  }
  
  function handleNameInputUpperCase(value: boolean) {
     setNameInputUpperCase(value)
  }
  
  function exhibitGreeting() {
    return nameInputUpperCase ? `Hello, ${name.trim().toUpperCase() || 'visitor'}!` : `Hello, ${name.trim() || 'visitor'}!`
  }
  
  const greeting = `Hello, ${name.trim() || 'visitor'}!`
    
  React.useEffect(() => {
    document.title = exhibitGreeting()
  }, [exhibitGreeting])
  
  function resetNameField() {
     nameInputRef.current?.focus();
     setName("")
  }
  
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
       <p className="greeting">{exhibitGreeting()}</p>
        <input 
          id="case"
          name="case"
          type="checkbox"
          checked={nameInputUpperCase}
          onClick={(event) => handleNameInputUpperCase(event.currentTarget.value)}
        />
        <label for="case">Uppercase Greeting</label>
        <button onClick={() => nameInputRef.current?.focus()}>Focus Name Field</button>
        <button onClick={() => resetNameField()} disabled={name.length === 0}>Clear Name</button>
      </section>
    </main>
  )
}

export default App
