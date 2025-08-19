"use client";

import { useLocalStorage } from "usehooks-ts";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronsUpDown, Trash } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";

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

export default function History() {
  const [isMounted, setIsMounted] = useState(false);
  const [value, setValue] = useLocalStorage<TodoState>("questly", {
    tasks: [],
    deletedTasks: [],
    completedTasks: [],
  });
  const [isCOpen, setIsCOpen] = useState(false);
  const [isDOpen, setIsDOpen] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const clearHistory = () => {
    setValue((prev) => ({
      ...prev,
      deletedTasks: [],
      completedTasks: [],
    }));

    toast.error("History Cleared");
  };

  if (!isMounted) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-pulse">Loading history...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4 py-4 px-4">
      <div className="flex justify-between w-full max-w-2xl items-center">
        <h1 className="text-2xl font-bold">History</h1>
        <Button variant="destructive" onClick={clearHistory} size="sm">
          <Trash className="h-4 w-4 mr-2" />
          Clear History
        </Button>
      </div>
      <Collapsible
        open={isCOpen}
        onOpenChange={setIsCOpen}
        className="w-full max-w-2xl flex flex-col gap-2"
      >
        <div className="flex items-center justify-between gap-4 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-md">
          <h4 className="text-sm font-semibold">Completed Tasks</h4>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="icon" className="size-8">
              <ChevronsUpDown />
              <span className="sr-only">Toggle</span>
            </Button>
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent className="flex flex-col gap-2">
          {value.completedTasks.length > 0 ? (
            value.completedTasks.map((task) => (
              <Card className="p-0" key={task.id}>
                <CardContent className="p-3">{task.text}</CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="p-3 text-center text-gray-500">
                No completed tasks.
              </CardContent>
            </Card>
          )}
        </CollapsibleContent>
      </Collapsible>

      <Collapsible
        open={isDOpen}
        onOpenChange={setIsDOpen}
        className="w-full max-w-2xl flex flex-col gap-2"
      >
        <div className="flex items-center justify-between gap-4 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-md">
          <h4 className="text-sm font-semibold">Deleted Tasks</h4>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="icon" className="size-8">
              <ChevronsUpDown />
              <span className="sr-only">Toggle</span>
            </Button>
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent className="flex flex-col gap-2">
          {value.deletedTasks.length > 0 ? (
            value.deletedTasks.map((task) => (
              <Card className="p-0" key={task.id}>
                <CardContent className="p-3">{task.text}</CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="p-3 text-center text-gray-500">
                No deleted tasks.
              </CardContent>
            </Card>
          )}
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
