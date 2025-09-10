"use client";
import { useState } from "react";
import useStore from "@/model/useStore";
import { StoreState } from "@/model/type";

const selectAddTodo = (state: StoreState) => state.addTodo;

export const NewTodo = () => {
  const addTodo = useStore(selectAddTodo);
  const [text, setText] = useState("");

  const onAdd = () => {
    addTodo(text);
    setText("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onAdd();
    }
  };

  return (
    <div className="flex gap-2">
      <input
        className="border border-black rounded-xs"
        value={text}
        placeholder="할 일을 입력하세요."
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button
        className="text-lg bg-violet-500 hover:bg-violet-600 text-white py-2 px-3 rounded-sm disabled:opacity-60"
        onClick={onAdd}
        disabled={!text}
      >
        Add
      </button>
    </div>
  );
};
