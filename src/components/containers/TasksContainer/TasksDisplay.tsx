import { IoMdArrowDropupCircle } from "react-icons/io";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { motion } from "framer-motion";
import { useState } from "react";
import { CgSpinner } from "react-icons/cg";
import clsx from "clsx";
import dynamic from "next/dynamic";

import { api } from "~/utils/api";
import TaskSkeleton from "../TaskSkeleton";
const Task = dynamic(() => import("../Task"), {
  ssr: false,
  loading: () => <TaskSkeleton />,
});

type TasksDisplayProps = {
  dateFilter?: string;
};

const TasksDisplay: React.FC<TasksDisplayProps> = ({ dateFilter }) => {
  const [showTasks, setShowTasks] = useState(false); // State for showing tasks:

  // Allow for animating tasks inside the task list
  const [parent] = useAutoAnimate({ duration: 250 });

  // Use allTasks to get all tasks from the database.
  const allTasks = api.todo.getAllTasks.useQuery(
    { dateFilter: dateFilter?.toLowerCase() },
    {
      staleTime: 3000,
    }
  );

  // ! Temp, will load UI for later
  if (allTasks.isError) {
    return (
      <div className="flex flex-col items-center justify-center gap-4">
        <p className="text-xl font-semibold text-amber-500">
          There was an error fetching the tasks.
        </p>
        <button
          className="text-xl text-amber-500 underline hover:text-amber-300"
          onClick={() => void allTasks.refetch()}
        >
          Try again?
        </button>
      </div>
    );
  }

  if (allTasks.isLoading) {
    return (
      <div className="flex flex-col items-center justify-center gap-2">
        <CgSpinner className="animate-spin text-white" size={80} />
        <p className="animate-pulse text-xl text-white">Loading Tasks...</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.3 } }}
      id="todo-container"
      className="container mb-14 w-2/6 bg-white/10"
    >
      {/* Allows smooth animaton while parent  */}
      <div
        className="relative flex h-full w-full items-center 
        justify-center rounded-md bg-violet-600 p-8 text-white"
      >
        <IoMdArrowDropupCircle
          size={40}
          className={clsx(
            "absolute left-4 transform text-white/80 transition-transform duration-300 ease-in-out hover:cursor-pointer",
            showTasks && "rotate-180"
          )}
          onClick={() => setShowTasks((oldVal) => !oldVal)}
        />
        <p className="text-4xl font-bold">All Tasks</p>
      </div>
      <ul ref={parent} className="flex flex-col gap-4 rounded-md p-4">
        {showTasks &&
          (allTasks.data.length > 0 ? (
            allTasks.data.map((task) => (
              // For each task, pass the data into the Task component
              <Task
                key={task.id}
                id={task.id}
                categoryName={task.category_name}
                name={task.name}
                description={task.description}
                priority={task.priority}
                status={task.status}
                dueDate={task.due_date}
              />
            ))
          ) : (
            <p className="text-lg text-white">You have no tasks!</p>
          ))}
      </ul>
    </motion.div>
  );
};

export default TasksDisplay;
