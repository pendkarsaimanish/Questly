"use client";

import { Meteors } from "@/components/magicui/meteors";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import confetti from "canvas-confetti";
import { CheckCheck, Plus, Trash } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useLocalStorage } from "usehooks-ts";

interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: string;
}

interface TodoState {
  tasks: Todo[];
  deletedTasks: Todo[];
  completedTasks: Todo[];
}

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);
  const [value, setValue] = useLocalStorage<TodoState>("questly", {
    tasks: [],
    deletedTasks: [],
    completedTasks: [],
  });
  const [inputValue, setInputValue] = useState("");

  // Fix hydration issues
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Add new todo
  const addTodo = () => {
    if (inputValue.trim()) {
      const newTodo: Todo = {
        id: crypto.randomUUID(), // More reliable than Date.now()
        text: inputValue.trim(),
        completed: false,
        createdAt: new Date().toISOString(),
      };

      setValue((prev) => ({
        ...prev,
        tasks: [...prev.tasks, newTodo],
      }));

      toast.success("Todo created");

      setInputValue("");
    }
  };

  // Delete todo
  const deleteTodo = (id: string) => {
    const todoToDelete = value.tasks.find((todo) => todo.id === id);
    if (todoToDelete) {
      setValue((prev) => ({
        ...prev,
        tasks: prev.tasks.filter((todo) => todo.id !== id),
        deletedTasks: [...prev.deletedTasks, todoToDelete],
      }));
      toast.error("Task Deleted");
    }
  };

  // Toggle todo completion
  const toggleTodo = (id: string) => {
    setValue((prev) => {
      const updatedTasks = prev.tasks.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      );

      const completedTodo = updatedTasks.find(
        (todo) => todo.id === id && todo.completed
      );

      toast.info("Task completed");

      return {
        ...prev,
        tasks: updatedTasks.filter((todo) => !todo.completed),
        completedTasks: completedTodo
          ? [...prev.completedTasks, completedTodo]
          : prev.completedTasks.filter((todo) => todo.id !== id),
      };
    });
  };

  // Don't render until mounted to avoid hydration mismatch
  if (!isMounted) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-pulse">Loading your tasks...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 justify-center items-center py-8">
      <div className="flex gap-2 w-full px-16 max-md:px-8">
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTodo()}
          required
          placeholder="Add new task"
          className="w-full font-medium h-12"
        />
        <Button className="h-12 w-12" onClick={addTodo}>
          <Plus />
        </Button>
      </div>

      <div className="h-16 max-sm:max-w-sm max-md:max-w-md relative overflow-hidden w-full flex justify-center items-center">
        <Meteors />
        <h1 className="font-bold">YOUR TASKS</h1>
      </div>

      <div className="w-full px-16 max-md:px-8 leading-8 flex flex-col gap-4">
        {value.tasks.length === 0 ? (
          <Card className="w-full p-6 py-2 text-center">
            <CardContent>No tasks yet. Add one above!</CardContent>
          </Card>
        ) : (
          value.tasks.map((todo) => (
            <Card className="w-full p-2" key={todo.id}>
              <CardContent className="px-2 flex gap-2 items-center">
                <Button
                  onClick={() => {
                    toggleTodo(todo.id);
                    confetti();
                  }}
                  className="w-12"
                >
                  <CheckCheck color="green" />
                </Button>
                <p className={todo.completed ? "line-through opacity-50" : ""}>
                  {todo.text}
                </p>
                <Button
                  variant="ghost"
                  size="icon"
                  className="ml-auto hover:bg-red-100 hover:text-red-500"
                  onClick={() => deleteTodo(todo.id)}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {(value.completedTasks.length > 0 || value.deletedTasks.length > 0) && (
        <div className="flex gap-4 text-sm text-gray-600">
          {value.completedTasks.length > 0 && (
            <Link href={"/history"}>
              Completed: {value.completedTasks.length}
            </Link>
          )}
          {value.deletedTasks.length > 0 && (
            <Link href={"/history"}>Deleted: {value.deletedTasks.length}</Link>
          )}
        </div>
      )}
    </div>
  );
}
