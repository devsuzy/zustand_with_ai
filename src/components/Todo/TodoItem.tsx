"use client";
import { memo } from "react";
import { StoreState, Todo } from "@/model/type";
import useStore from "@/model/useStore";

const selectRemoveTodo = (state: StoreState) => state.removeTodo;
const selectToggleTodo = (state: StoreState) => state.toggleTodo;

const TodoItem = ({ todo }: { todo: Todo }) => {
  const removeTodo = useStore(selectRemoveTodo);
  const toggleTodo = useStore(selectToggleTodo);

  return (
    <div className="w-full flex justify-between gap-4 mb-2">
      <input type="checkbox" checked={todo.done} onChange={() => toggleTodo(todo.id)} />
      <span className={todo.done ? "line-through" : ""}>{todo.title}</span>
      <button className="bg-red-700 text-white p-1 rounded-md" onClick={() => removeTodo(todo.id)}>
        Delete
      </button>
    </div>
  );
};

export const MemoedTodoItem = memo(TodoItem);
