import { useAutoAnimate } from "@formkit/auto-animate/react";
import { motion } from "framer-motion";
import { CgSpinner } from "react-icons/cg";

import { api } from "~/utils/api";
import CategoryTasksDisplay from "./CategoryTasksDisplay";

type CategoriesDisplayProps = {
  dateFilter?: string;
};

const CategoriesDisplay: React.FC<CategoriesDisplayProps> = ({
  dateFilter,
}) => {
  // Allow for animating tasks inside the task list
  const [parent] = useAutoAnimate({ duration: 250 });

  // Use categoryTasks to get all tasks from the database.
  const categories = api.todo.getAllCategories.useQuery();

  if (categories.isError) {
    return (
      <div className="flex flex-col items-center justify-center gap-4">
        <p className="text-xl font-semibold text-amber-500">
          There was an error fetching the categories.
        </p>
        <button
          className="text-xl text-amber-500 underline hover:text-amber-300"
          onClick={() => void categories.refetch()}
        >
          Try again?
        </button>
      </div>
    );
  }

  if (categories.isLoading) {
    return (
      <div className="flex flex-col items-center justify-center gap-2">
        <CgSpinner className="animate-spin text-white" size={80} />
        <p className="animate-pulse text-xl text-white">
          Loading categories...
        </p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.3 } }}
      id="todo-container"
      className="container w-2/6"
    >
      <h1 className="mb-4 text-center text-5xl font-semibold text-white">
        Categories
      </h1>
      {/* Allows smooth animaton while parent  */}
      <div ref={parent} className="flex flex-col gap-4">
        {categories.data.length > 0 ? (
          categories.data.map((category) => (
            // For each cateogory, pass the data into the CategoriesTaskDisplay component
            <CategoryTasksDisplay
              key={category.name}
              categoryName={category.name}
              dateFilter={dateFilter}
            />
          ))
        ) : (
          <p className="text-center text-lg text-white">
            You have no categories.
          </p>
        )}
      </div>
    </motion.div>
  );
};

export default CategoriesDisplay;
