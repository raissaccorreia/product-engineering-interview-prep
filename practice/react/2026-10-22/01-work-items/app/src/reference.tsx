import { useState, type FormEvent } from 'react'
import './App.css'

type WorkItem = {
  id: string
  title: string
  completed: boolean
}

type Filter = 'all' | 'open' | 'completed'

const initialItems: WorkItem[] = [
  { id: 'w1', title: 'Review checkout copy', completed: false },
  { id: 'w2', title: 'Fix navigation label', completed: true },
  { id: 'w3', title: 'Check empty state', completed: false },
]

function ReferenceApp() {
  const [items, setItems] = useState<WorkItem[]>(initialItems)
  const [newTitle, setNewTitle] = useState('')
  const [filter, setFilter] = useState<Filter>('all')
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const openCount = items.filter((item) => !item.completed).length
  const visibleItems = items.filter((item) => {
    if (filter === 'open') return !item.completed
    if (filter === 'completed') return item.completed
    return true
  })
  const selectedItem = items.find((item) => item.id === selectedId)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const title = newTitle.trim()
    if (title.length === 0) return

    setItems((currentItems) => [
      ...currentItems,
      { id: crypto.randomUUID(), title, completed: false },
    ])
    setNewTitle('')
  }

  function toggleItem(id: string) {
    setItems((currentItems) =>
      currentItems.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item,
      ),
    )
  }

  return (
    <main>
      <h1>Work item tracker</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="new-item-title">New item</label>
        <input
          id="new-item-title"
          value={newTitle}
          onChange={(event) => setNewTitle(event.target.value)}
        />
        <button type="submit">Add item</button>
      </form>

      <fieldset>
        <legend>Filter items</legend>
        {(['all', 'open', 'completed'] as const).map((option) => (
          <button
            key={option}
            type="button"
            aria-pressed={filter === option}
            onClick={() => setFilter(option)}
          >
            {option === 'all' ? 'All' : option === 'open' ? 'Open' : 'Completed'}
          </button>
        ))}
      </fieldset>

      <p>
        Open: {openCount} / Total: {items.length}
      </p>

      {visibleItems.length === 0 ? (
        <p>No matching items</p>
      ) : (
        <ul>
          {visibleItems.map((item) => (
            <li key={item.id}>
              <input
                id={`completed-${item.id}`}
                type="checkbox"
                checked={item.completed}
                onChange={() => toggleItem(item.id)}
              />
              <label htmlFor={`completed-${item.id}`}>{item.title}</label>
              <button
                type="button"
                aria-pressed={selectedId === item.id}
                onClick={() => setSelectedId(item.id)}
              >
                Select
              </button>
            </li>
          ))}
        </ul>
      )}

      <section aria-live="polite">
        <h2>Selected item</h2>
        {selectedItem ? (
          <p>
            {selectedItem.title} ({selectedItem.completed ? 'Completed' : 'Open'})
          </p>
        ) : (
          <p>No item selected</p>
        )}
      </section>
    </main>
  )
}

export default ReferenceApp
