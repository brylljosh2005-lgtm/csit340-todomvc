import { useState } from 'react'

function Todos() {
  const [text, setText] = useState('')
  const [todos, setTodos] = useState([])
  const [filter, setFilter] = useState('all') // 'all', 'active', 'completed'

  function handleSubmit(e) {
    e.preventDefault()
    const trimmed = text.trim()
    if (!trimmed) return

    const newTodo = { id: crypto.randomUUID(), text: trimmed, completed: false }
    setTodos([...todos, newTodo])
    setText('')
  }

  function handleToggle(id) {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    )
  }

  function handleDelete(id) {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  // A: Items left counter
  const itemsLeft = todos.filter((todo) => !todo.completed).length

  // B: Clear completed todos
  function handleClearCompleted() {
    setTodos(todos.filter((todo) => !todo.completed))
  }
  const hasCompleted = todos.some((todo) => todo.completed)

  // C: Toggle all todos
  const allCompleted = todos.length > 0 && todos.every((todo) => todo.completed)

  function handleToggleAll() {
    const newState = !allCompleted
    setTodos(todos.map((todo) => ({ ...todo, completed: newState })))
  }

  // D: Filtered todos
  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed
    if (filter === 'completed') return todo.completed
    return true
  })

  // Filter button styles specified in the lab
  const selectedClass = 'cursor-pointer rounded-[3px] border border-[#b83f45]/20 px-[7px] py-[3px]'
  const unselectedClass = 'cursor-pointer rounded-[3px] border border-transparent px-[7px] py-[3px] hover:border-[#b83f45]/10'

  return (
    <section className="mx-auto max-w-[550px]">
      <h1 className="text-center text-[80px] font-extralight text-[#b83f45]">
        todos
      </h1>
      <div className="relative bg-white shadow-[0_2px_4px_0_rgba(0,0,0,0.2),0_25px_50px_0_rgba(0,0,0,0.1)]">
        <form onSubmit={handleSubmit}>
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="h-[65px] w-full py-4 pr-4 pl-[60px] text-2xl shadow-[inset_0_-2px_1px_rgba(0,0,0,0.03)] placeholder:font-extralight placeholder:text-[#e6e6e6] focus:outline-none"
            placeholder="What needs to be done?"
          />
        </form>

        {todos.length > 0 && (
          <main className="relative border-t border-[#e6e6e6]">
            <input
              id="toggle-all"
              type="checkbox"
              checked={allCompleted}
              onChange={handleToggleAll}
              className="peer sr-only"
            />
            <label
              htmlFor="toggle-all"
              className={`absolute -top-[66px] left-0 flex h-[65px] w-[60px] cursor-pointer items-center justify-center text-2xl ${
                allCompleted ? 'text-[#111]' : 'text-[#737373]'
              }`}
            >
              <span className="rotate-90">&gt;</span>
            </label>

            <ul>
              {filteredTodos.map((todo) => (
                <li
                  key={todo.id}
                  className="group relative flex items-center border-b border-[#ededed] text-2xl"
                >
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => handleToggle(todo.id)}
                    className="ml-[15px] size-[30px] shrink-0 cursor-pointer accent-[#b83f45]"
                  />
                  <span
                    className={`flex-1 py-[15px] pr-[60px] pl-[15px] break-all ${
                      todo.completed ? 'text-[#7e7e7e] line-through' : ''
                    }`}
                  >
                    {todo.text}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleDelete(todo.id)}
                    className="absolute right-[10px] hidden size-10 cursor-pointer text-[#cc9a9a] hover:text-[#af5b5e] group-hover:block"
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
          </main>
        )}

        {todos.length > 0 && (
          <footer className="grid h-10 grid-cols-3 items-center border-t border-[#e6e6e6] px-4 text-sm text-[#777]">
            <span>
              <strong className="font-light">{itemsLeft}</strong> {itemsLeft === 1 ? 'item left' : 'items left'}
            </span>

            <ul className="flex justify-center gap-1">
              <li>
                <button
                  type="button"
                  onClick={() => setFilter('all')}
                  className={filter === 'all' ? selectedClass : unselectedClass}
                >
                  All
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setFilter('active')}
                  className={filter === 'active' ? selectedClass : unselectedClass}
                >
                  Active
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setFilter('completed')}
                  className={filter === 'completed' ? selectedClass : unselectedClass}
                >
                  Completed
                </button>
              </li>
            </ul>

            {hasCompleted ? (
              <button
                type="button"
                onClick={handleClearCompleted}
                className="cursor-pointer justify-self-end hover:underline"
              >
                Clear completed
              </button>
            ) : (
              <div></div>
            )}
          </footer>
        )}
      </div>
    </section>
  )
}

export default Todos