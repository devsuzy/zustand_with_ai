"use client";
import { memo, useEffect, useRef, useState } from "react";
import { StoreState, Todo } from "@/model/type";
import useStore from "@/model/useStore";

const selectRemoveTodo = (state: StoreState) => state.removeTodo;
const selectToggleTodo = (state: StoreState) => state.toggleTodo;
const selectUpdateTodo = (state: StoreState) => state.updatedTodo;

const TodoItem = ({ todo }: { todo: Todo }) => {
  const removeTodo = useStore(selectRemoveTodo);
  const toggleTodo = useStore(selectToggleTodo);
  const updateTodo = useStore(selectUpdateTodo);

  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.title);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleSave = () => {
    const trimmedText = editText.trim();
    if (trimmedText && trimmedText !== todo.title) {
      updateTodo(todo.id, trimmedText);
    }
    setIsEditing(false);
    setEditText(todo.title);
  };

  const handleCancel = () => {
    setEditText(todo.title);
    setIsEditing(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSave();
    } else if (e.key === "Escape") {
      handleCancel();
    }
  };

  return (
    <div className="w-full flex justify-between gap-4 mb-2">
      <input type="checkbox" checked={todo.done} onChange={() => toggleTodo(todo.id)} />

      {isEditing ? (
        <div className="flex-1 flex items-center gap-2">
          <input
            ref={inputRef}
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={handleKeyPress} // 키로 조작 가능
            onBlur={handleSave} // 포커스 잃으면 자동 저장
            className="flex-1 px-2 py-1 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSave}
            className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded text-base transition-colors"
            disabled={!editText.trim()}
          >
            ✓
          </button>
          <button
            onClick={handleCancel}
            className="bg-gray-500 hover:bg-gray-600 text-white px-2 py-1 rounded text-base transition-colors"
          >
            ✕
          </button>
        </div>
      ) : (
        <span className={todo.done ? "line-through text-gray-400" : "text-gray-900"}>
          {todo.title}
        </span>
      )}

      {!isEditing && (
        <div className="flex gap-1">
          <button
            onClick={!todo.done ? () => setIsEditing(true) : undefined}
            className={`text-white py-1 px-2 rounded text-base transition-colors ${
              !todo.done
                ? "bg-blue-400 hover:bg-blue-500 cursor-pointer"
                : "bg-gray-400 hover:bg-gray-500 cursor-not-allowed"
            }`}
            disabled={todo.done}
            title={todo.done ? "완료된 할 일은 편집할 수 없습니다" : "편집"}
          >
            ✏️
          </button>
          <button
            className="bg-red-400 hover:bg-red-500 text-white py-1 px-2 rounded text-base transition-colors"
            onClick={() => removeTodo(todo.id)}
            title="삭제"
          >
            🗑️
          </button>
        </div>
      )}
    </div>
  );
};

export const MemoedTodoItem = memo(TodoItem);
