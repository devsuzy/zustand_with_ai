"use client";

import useStore, { StoreState, Todo } from "@/store/store";
import { memo, useState } from "react";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <TodoList />
        </div>
        <NewTodo />
      </main>
    </div>
  );
}

const selectAddTodo = (state: StoreState) => state.addTodo;

const NewTodo = () => {
  const addTodo = useStore(selectAddTodo);
  const [text, setText] = useState("");
  const onAdd = () => {
    addTodo(text);
    setText("");
  };

  return (
    <div className="flex gap-2">
      <input
        className="border border-black rounded-xs"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        className="bg-blue-800 text-white p-2 rounded-sm disabled:opacity-60"
        onClick={onAdd}
        disabled={!text}
      >
        Add
      </button>
    </div>
  );
};

const selectTodos = (state: StoreState) => state.todos;

const TodoList = () => {
  const todos = useStore(selectTodos);
  return (
    <div className="w-3xs flex-col">
      {todos.map((todo) => (
        <MemoedTodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
};

const selectRemoveTodo = (state: StoreState) => state.removeTodo;
const selectToggleTodo = (state: StoreState) => state.toggleTodo;

const TodoItem = ({ todo }: { todo: Todo }) => {
  const removeTodo = useStore(selectRemoveTodo);
  const toggleTodo = useStore(selectToggleTodo);

  return (
    <div className="w-full flex justify-around gap-4 mb-2">
      <input type="checkbox" checked={todo.done} onChange={() => toggleTodo(todo.id)} />
      <span className={todo.done ? "line-through" : ""}>{todo.title}</span>
      <button className="bg-red-700 text-white p-1 rounded-md" onClick={() => removeTodo(todo.id)}>
        Delete
      </button>
    </div>
  );
};

const MemoedTodoItem = memo(TodoItem);
