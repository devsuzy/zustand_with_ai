"use client";
import { useEffect, useState } from "react";
import useStore from "@/model/useStore";
import { NewTodo, TodoList } from "../Todo";
import LoadingSpinner from "./LoadingSpinner";
import TodayDate from "./TodayDate";

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
    <div className="flex flex-col gap-16 items-center">
      <TodayDate />
      <TodoList />
      <NewTodo />
    </div>
  );
}
