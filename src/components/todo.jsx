import { useState } from "react";
import "./Todo.css";

export default function TodoApp() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState("");
  const [filter, setFilter] = useState("all");

  function addTask() {
    if (text === "") return;
    setTasks([
      ...tasks,
      { id: Date.now(), text, completed: false }
    ]);
    setText("");
  }

  function toggleTask(id) {
    setTasks(
      tasks.map(t =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  }

  function deleteTask(id) {
    setTasks(tasks.filter(t => t.id !== id));
  }

  const completed = tasks.filter(t => t.completed).length;
  const pending = tasks.filter(t => !t.completed).length;

  const filtered = tasks.filter(t => {
    if (filter === "completed") return t.completed;
    if (filter === "pending") return !t.completed;
    return true;
  });

  return (
    <div className="page">
      <div className="todo-box">
        <h2>Todo List</h2>

        <p className="stats">
          <span>Completed: {completed}</span>
          <span>Pending: {pending}</span>
        </p>

        <div className="input-row">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter task"
          />
          <button onClick={addTask}>Add</button>
        </div>

        <div className="filters">
          <button onClick={() => setFilter("all")}>All</button>
          <button onClick={() => setFilter("pending")}>Pending</button>
          <button onClick={() => setFilter("completed")}>Completed</button>
        </div>

        <ul className="task-list">
          {filtered.map(t => (
            <li key={t.id} className={t.completed ? "completed" : ""}>
              <input
                type="checkbox"
                checked={t.completed}
                onChange={() => toggleTask(t.id)}
              />
              <span>{t.text}</span>
              <button className="del-btn" onClick={() => deleteTask(t.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
