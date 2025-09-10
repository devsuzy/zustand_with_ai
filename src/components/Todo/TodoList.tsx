"use client";
import useStore from "@/model/useStore";
import { StoreState } from "@/model/type";
import { MemoedTodoItem } from "./TodoItem";

const selectTodos = (state: StoreState) => state.todos;

export const TodoList = () => {
  const todos = useStore(selectTodos);

  if (todos.length === 0) {
    return (
      <div className="w-full max-w-md text-center text-gray-500">
        <p className="text-lg font-medium">⚠️ 할 일이 없습니다.</p>
        <p className="text-sm mt-2">새로운 할 일을 추가해보세요!</p>
      </div>
    );
  }

  return (
    <div className="min-w-60 max-w-80 flex-col">
      {todos.map((todo) => (
        <MemoedTodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
};
