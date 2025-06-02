"use client";

import { useEffect, useState } from "react";
import { TaskContext } from "@/contexts/TaskContext";
import { TaskBaseUrl } from "@/utils/baseUrl";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<any[]>([]);
  const [refetchTasks, setRefetchTasks] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
        console.log("Fetching tasks...");
      const userId = localStorage.getItem("userid");
      if (!userId) {
        window.location.href = "/sign-up";
        return;
      }
      try {
        const res = await fetch(`${TaskBaseUrl}/all?userId=${userId}`);
        const data = await res.json();
        setTasks(data);
        console.log("Tasks fetched successfully:", data);
      } catch (err) {
        console.error("fetch error:", err);
      }
    };
    fetchTasks();
  }, [refetchTasks]);

  const handleRefetch = () => setRefetchTasks(!refetchTasks);

  return (
    <TaskContext.Provider value={{ tasks, refetchTasks: handleRefetch }}>
      {children}
    </TaskContext.Provider>
  );
}
