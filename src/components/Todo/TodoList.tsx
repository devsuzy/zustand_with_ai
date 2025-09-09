"use client";
import useStore from "@/model/useStore";
import { StoreState } from "@/model/type";
import { MemoedTodoItem } from "./TodoItem";

const selectTodos = (state: StoreState) => state.todos;

export const TodoList = () => {
  const todos = useStore(selectTodos);
  return (
    <div className="w-60 flex-col">
      {todos.map((todo) => (
        <MemoedTodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
};
