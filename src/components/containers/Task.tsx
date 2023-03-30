import { useState } from "react";
import { TiDelete } from "react-icons/ti";
import { IoMdArrowDropupCircle } from "react-icons/io";
import toast from "react-hot-toast";
import dayjs from "dayjs";
import clsx from "clsx";

import { AutoAnimate } from "../AutoAnimate";
import { api } from "~/utils/api";
import Checkbox from "~/components/Checkbox";

// The props that a Task will take
type TaskProps = {
  id: number;
  name: string;
  categoryName: string | null;
  description: string;
  priority: number;
  status: string;
  dueDate: Date;
};

// Pass the props into the React.FC (functional component) generic.
const Task: React.FC<TaskProps> = (
  {
    id,
    name,
    description,
    priority,
    categoryName,
    dueDate,
    status,
  } /* Destructure props */
) => {
  const [showDetails, setShowDetails] = useState(false); // State for showing task details

  const utils = api.useContext();
  // Procedure to delete tasks in the database
  const deleteTask = api.todo.deleteTask.useMutation({
    onSuccess: async () => {
      if (categoryName !== null) {
        // If the task has a category, invalidate the cache for both the category and all tasks
        // concurrently.
        await Promise.all([
          utils.todo.getTasksByCategory.invalidate({
            category_name: categoryName,
          }),
          utils.todo.getAllTasks.invalidate(),
        ]);
      } else {
        await utils.todo.getAllTasks.invalidate();
      }
      toast.success("Task deleted successfully", { className: "text-xl" }); // Display a success toast
    },
    onError: () => {
      toast.error("An error occurred while deleting the task", {
        className: "text-xl",
      }); // Display an error toast
    },
  });

  // Procedure to update the task status
  const changeStatus = api.todo.changeStatus.useMutation({
    onSuccess: async () => {
      if (categoryName) {
        // If the task has a category, invalidate the cache for both the category and all tasks
        // concurrently.
        await Promise.all([
          utils.todo.getTasksByCategory.invalidate({
            category_name: categoryName,
          }),
          utils.todo.getAllTasks.invalidate(),
        ]);
      } else {
        await utils.todo.getAllTasks.invalidate();
      }
    },
    onError: () => {
      toast.error("An error occurred while updating this task's status", {
        className: "text-xl",
      }); // Display an error toast
    },
  });

  return (
    <li
      className={clsx(
        "flex flex-col text-white transition-all duration-200",
        status === "completed" && "line-through opacity-50"
      )}
    >
      <div
        className="container flex items-center justify-between rounded-md 
      bg-violet-500/60 px-4 py-4"
      >
        <IoMdArrowDropupCircle
          className={clsx(
            "min-h-[2.25rem] min-w-[2.25rem] transform text-white/80 transition-transform duration-300 ease-in-out hover:cursor-pointer",
            showDetails && "rotate-180"
          )}
          onClick={() => setShowDetails((oldVal) => !oldVal)}
        />
        <div className="flex flex-col gap-4 overflow-hidden px-4 text-center">
          <h1 className="truncate text-2xl font-bold">{name}</h1>
          {dayjs().isAfter(dayjs(dueDate)) && status === "active" ? (
            <p className="text-xl font-semibold text-[#ff9966]">
              OVERDUE: {dayjs(dueDate).format("MMM DD, YYYY")}
            </p>
          ) : (
            <p className="text-xl">
              Complete by: {dayjs(dueDate).format("MMM DD, YYYY")}
            </p>
          )}
        </div>
        <div className="flex items-center gap-8">
          <TiDelete
            size={50}
            className="text-gray-400 transition-all duration-200 ease-in-out hover:cursor-pointer hover:text-red-500/100 active:scale-90"
            onClick={() => deleteTask.mutate({ taskId: id })} // Call the deleteTask mutation and pass in the task id
          />
          <Checkbox
            isChecked={status === "completed"}
            handleClick={() =>
              changeStatus.mutate({ taskId: id, currentStatus: status })
            }
          />
        </div>
      </div>
      <AutoAnimate className="container w-11/12 self-center rounded-b-md bg-violet-500/30">
        {showDetails && (
          <div className="flex flex-col gap-4 p-4">
            <div className="flex flex-col">
              {[
                {
                  title: "Priority",
                  value: priority !== 5 ? priority : "none",
                },
                { title: "Status", value: status },
                { title: "Category", value: categoryName ?? "none" },
              ].map(({ title, value }, index) => (
                <h2 key={index} className="text-xl font-semibold">
                  {title} &#8212; {value}
                </h2>
              ))}
            </div>
            <div className="flex flex-col">
              <h2 className="text-xl font-semibold underline underline-offset-2">
                Description
              </h2>
              <p className="text-lg">{description}</p>
            </div>
          </div>
        )}
      </AutoAnimate>
    </li>
  );
};

export default Task;
