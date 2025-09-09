"use client";
import { useEffect, useState } from "react";
import useStore from "@/model/useStore";
import { NewTodo, TodoList } from "../Todo";
import LoadingSpinner from "./LoadingSpinner";

export default function TodoComponents() {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const unsubscribe = useStore.persist.onFinishHydration(() => {
      setIsHydrated(true);
    });

    if (useStore.persist.hasHydrated()) {
      setIsHydrated(true);
    }

    return unsubscribe;
  }, []);

  if (!isHydrated) {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex flex-col gap-6 items-center">
      <h2 className="text-4xl text-center font-bold">📝할 일 목록</h2>
      <div className="flex gap-4 items-center flex-col sm:flex-row">
        <TodoList />
      </div>
      <div className="flex gap-4 items-center flex-col sm:flex-row">
        <NewTodo />
      </div>
    </div>
  );
}
