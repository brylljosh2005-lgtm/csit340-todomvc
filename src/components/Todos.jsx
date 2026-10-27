import { useState } from 'react'

function Todos() {
  const [text, setText] = useState('')
  const [todos, setTodos] = useState([])

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
            <ul>
              {todos.map((todo) => (
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
          </footer>
        )}
      </div>
    </section>
  )
}

export default Todos