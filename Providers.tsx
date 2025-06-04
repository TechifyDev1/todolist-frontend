"use client";

import { useEffect, useState } from "react";
import { TaskContext } from "@/contexts/TaskContext";
import { TaskBaseUrl } from "@/utils/baseUrl";
import { usePathname } from "next/navigation";
import { toast } from "sonner";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<any[]>([]);
  const [refetchTasks, setRefetchTasks] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const fetchTasks = async () => {
        // console.log("Fetching tasks...");
      const userId = localStorage.getItem("userid");
      if (!userId && pathname !== "/sign-up") {
        window.location.href = "/sign-up";
        return;
      }
      if (!userId) return;
      try {
        const res = await fetch(`${TaskBaseUrl}/all?userId=${userId}`);
        const data = await res.json();
        setTasks(data);
        // console.log("Tasks fetched successfully:", data);
        // toast.success("Your tasks are ready to go!");
      } catch (err) {
        console.error("fetch error:", err);
        if (err instanceof Error) {
          toast.error(`Error fetching tasks: ${err.message}`);
        } else {
          toast.error("Unexpected error occurred while fetching tasks");
        }
        // setTasks([]);
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
