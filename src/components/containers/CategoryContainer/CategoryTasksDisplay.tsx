import { IoMdArrowDropupCircle } from "react-icons/io";
import { AiFillDelete } from "react-icons/ai";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { motion } from "framer-motion";
import { useState } from "react";
import { CgSpinner } from "react-icons/cg";
import dynamic from "next/dynamic";

import { AutoAnimate } from "~/components/AutoAnimate";
import { api } from "~/utils/api";
import toast from "react-hot-toast";
import clsx from "clsx";
import TaskSkeleton from "../TaskSkeleton";
const Task = dynamic(() => import("../Task"), {
  ssr: false,
  loading: () => <TaskSkeleton />,
});

type CategoryTasksDisplayProps = {
  categoryName: string;
  dateFilter?: string;
};

const CategoryTasksDisplay: React.FC<CategoryTasksDisplayProps> = ({
  categoryName,
  dateFilter,
}) => {
  // State for showing tasks:
  const [showTasks, setShowTasks] = useState(false);

  // Allow for animating tasks inside the task list
  const [parent] = useAutoAnimate({ duration: 250 });

  const utils = api.useContext();

  // Delete category procedure
  const deleteCategory = api.todo.deleteCategory.useMutation({
    onSuccess: async () => {
      await Promise.all([
        utils.todo.getAllCategories.invalidate(),
        utils.todo.getAllTasks.invalidate(),
      ]);
      toast.success("Category deleted successfully", { className: "text-xl" }); // Display a success toast
    },
    onError: () => {
      toast.error("An error occurred while deleting the category", {
        className: "text-xl",
      }); // Display an error toast
    },
  });

  // Use categoryTasks to get all tasks from the database.
  const categoryTasks = api.todo.getTasksByCategory.useQuery(
    { category_name: categoryName, dateFilter: dateFilter },
    {
      staleTime: 3000,
    }
  );

  if (categoryTasks.isError) {
    return (
      <div className="flex flex-col items-center justify-center gap-2">
        <p className="text-xl font-semibold text-amber-500">
          There was an error fetching the {categoryName} tasks.
        </p>
        <button
          className="text-xl text-amber-500 underline hover:text-amber-300"
          onClick={() => void categoryTasks.refetch()}
        >
          Try again?
        </button>
      </div>
    );
  }

  if (categoryTasks.isLoading) {
    return (
      <div className="flex flex-col items-center justify-center gap-2">
        <CgSpinner className="animate-spin text-white" size={60} />
        <p className="animate-pulse text-lg text-white">
          Loading {categoryName} tasks...
        </p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.3 } }}
      id="todo-container"
      className="container w-full"
    >
      {/* Allows smooth animaton while parent  */}
      <AutoAnimate>
        <div
          className="flex items-center justify-between rounded-md 
        bg-violet-600 p-4 text-white"
        >
          <div className="flex items-center gap-4">
            <IoMdArrowDropupCircle
              className={clsx(
                "transform text-4xl text-white/80 transition-transform duration-300 ease-in-out hover:cursor-pointer",
                showTasks && "rotate-180"
              )}
              onClick={() => setShowTasks((oldVal) => !oldVal)}
            />
            <p className="text-xl">{categoryName}</p>
          </div>
          <AiFillDelete
            size={27}
            className="text-gray-300 transition-all duration-200 hover:cursor-pointer hover:text-red-500/100 active:scale-90"
            onClick={() => deleteCategory.mutate({ name: categoryName })} // Call the deleteTask mutation and pass in the task id
          />
        </div>
        <ul
          ref={parent}
          className="flex flex-col gap-4 rounded-md bg-white/10 p-4"
        >
          {showTasks &&
            (categoryTasks.data.length > 0 ? (
              categoryTasks.data.map((task) => (
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
              <p className="text-lg text-white">
                You have no tasks with this category!
              </p>
            ))}
        </ul>
      </AutoAnimate>
    </motion.div>
  );
};

export default CategoryTasksDisplay;
