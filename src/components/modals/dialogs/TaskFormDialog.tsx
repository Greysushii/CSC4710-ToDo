import { AnimatePresence, motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { TiDelete } from "react-icons/ti";
import { useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";

import type { DateValueType } from "../../../types/react-datepicker-types";
import { api } from "~/utils/api";
import { AutoAnimate } from "~/components/AutoAnimate";
import Button from "~/components/Button";
import Modal from "../Modal";
import FormErrorMessage from "~/components/FormErrorMessage";

// * Props for the task form
type TaskFormDialogProps = {
  isShowing: boolean;
  handleClose: () => void; // Type is of void function
};

// * Category form data
type TaskFormData = {
  name: string;
  category?: string;
  description: string;
  priority: string;
};

// * Responsible for loading the task form and allowing users to create tasks.
const TaskFormDialog: React.FC<TaskFormDialogProps> = ({
  isShowing,
  handleClose,
}) => {
  const CURRENT_DATE = new Date(); // Get the current date and set dateValue state
  const [dateValue, setDateValue] = useState<DateValueType>({
    startDate: CURRENT_DATE,
    endDate: CURRENT_DATE,
  });
  const utils = api.useContext(); // For invalidating queries

  const categories = api.todo.getAllCategories.useQuery(); // Get all categories from the database

  // react-hook-form for form validation
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<TaskFormData>();

  // Procedure to create tasks in the database
  const createTask = api.todo.createTask.useMutation({
    onSuccess: async () => {
      const potentialCategory = getValues("category"); // Get the category name from the form
      if (potentialCategory) {
        // ! If the task has a category, invalidate the cache for both the category and all tasks
        // ! concurrently.
        await Promise.all([
          utils.todo.getTasksByCategory.invalidate({
            category_name: potentialCategory,
          }),
          utils.todo.getAllTasks.invalidate(),
        ]);
      } else {
        await utils.todo.getAllTasks.invalidate();
      }
      reset(); // Reset the form state
      setDateValue({ startDate: CURRENT_DATE, endDate: CURRENT_DATE }); // Reset the date picker
      handleClose(); // Close the form
      toast.success("Task created successfully", { className: "text-xl" }); // Display a success toast
    },
    onError: () => {
      toast.error("An error occurred while creating the task", {
        className: "text-xl",
      }); // Display an error toast
    },
  });

  return (
    // ! Must be placed to place exit animations,
    <AnimatePresence>
      {/* Only render the form if isShowing prop is true (this indicates that the parent will keep 
      control of the state of the form's visibility) */}
      {isShowing && (
        <Modal>
          <motion.div
            className="min-w-screen fixed inset-0 z-10 flex min-h-screen 
            items-center justify-center bg-gray-600 bg-opacity-75"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.3 } }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
          >
            <div
              className="relative flex h-fit w-2/5 items-center justify-center rounded-md border
              border-gray-700 bg-gradient-to-b from-purple-700 via-violet-800 to-purple-900 p-6"
            >
              <TiDelete
                size={35}
                className="absolute -top-4 -right-4 text-white transition duration-150
                ease-in-out hover:cursor-pointer active:scale-90"
                onClick={() => {
                  reset();
                  setDateValue({
                    startDate: CURRENT_DATE,
                    endDate: CURRENT_DATE,
                  }); // Reset the date picker
                  handleClose();
                }}
              />
              <form
                className="container"
                // ! Disable error as react-hook-form does not use synchronous onSubmit handlers
                // eslint-disable-next-line @typescript-eslint/no-misused-promises
                onSubmit={handleSubmit((data) => {
                  const input = {
                    ...data,
                    priority: parseInt(data.priority),
                    due_date: dateValue?.startDate
                      ? dateValue.startDate
                      : CURRENT_DATE,
                  };
                  createTask.mutate(input);
                })}
              >
                <div className="flex flex-col gap-4">
                  <div>
                    <label
                      htmlFor="task-name"
                      className="mb-2 block text-lg font-medium text-white dark:text-white"
                    >
                      Task Name
                    </label>
                    <input
                      type="task-name"
                      id="task-name"
                      className="block w-full rounded-lg p-2.5 text-lg outline-none"
                      placeholder="Ex. Pay taxes"
                      {...register("name", {
                        required: "Task name is required",
                      })}
                    />
                    <AutoAnimate>
                      {errors.name?.message && (
                        <FormErrorMessage message={errors.name.message} />
                      )}
                    </AutoAnimate>
                  </div>
                  <div className="flex flex-col gap-4 lg:flex-row">
                    <div className="w-1/2">
                      {/* Render the */}
                      {categories.data && (
                        <>
                          <label
                            htmlFor="task-category"
                            className="mb-2 block text-lg font-medium text-white dark:text-white"
                          >
                            Category (Optional)
                          </label>
                          <select
                            id="task-category"
                            className="block w-full rounded-lg p-2.5 text-lg outline-none"
                            {...register("category", {
                              validate: (value) => {
                                if (typeof value === "string") value.trim();
                                return true; // Remove whitespace
                              },
                            })}
                          >
                            <option value="">None</option>
                            {categories.data.map((category) => {
                              const { name } = category;
                              return (
                                <option key={name} value={name}>
                                  {name}
                                </option>
                              );
                            })}
                          </select>
                        </>
                      )}
                    </div>
                    <div className="w-1/2">
                      <label
                        htmlFor="task-priority"
                        className="mb-2 block text-lg font-medium text-white dark:text-white"
                      >
                        Task Priority (1 = Highest, Optional)
                      </label>
                      <select
                        id="task-priority"
                        defaultValue="5"
                        className="block w-full rounded-lg p-2.5 text-lg outline-none"
                        {...register("priority")}
                      >
                        <option value="5">None</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="task-description"
                      className="mb-2 block text-lg font-medium text-white dark:text-white"
                    >
                      Task Description
                    </label>
                    <textarea
                      id="task-description"
                      className="block h-40 w-full rounded-lg p-2.5 text-lg outline-none"
                      placeholder="Ex. Must pay taxes before due date..."
                      {...register("description", {
                        required: "Task description is required",
                      })}
                    />
                    <AutoAnimate>
                      {errors.description?.message && (
                        <FormErrorMessage
                          message={errors.description.message}
                        />
                      )}
                    </AutoAnimate>
                  </div>
                  {/* Must be separated from react-hook-form */}
                  <div>
                    <label
                      htmlFor="task-due-date"
                      className="mb-2 block text-lg font-medium text-white dark:text-white"
                    >
                      Task Due Date (MM/DD/YYYY)
                    </label>
                    <Datepicker
                      primaryColor="violet"
                      inputClassName="font-normal outline-none text-black text-xl p-2.5 bg-white dark:bg-white"
                      readOnly={true}
                      asSingle={true}
                      useRange={false}
                      value={dateValue}
                      onChange={(newValue) => {
                        setDateValue(newValue);
                      }}
                      displayFormat="MM/DD/YYYY"
                    />
                  </div>
                  <div className="flex w-full flex-col justify-end gap-4 lg:flex-row">
                    <Button
                      disabled={isSubmitting}
                      type="button"
                      onClick={() => {
                        reset(); // Reset the form state
                        setDateValue({
                          startDate: CURRENT_DATE,
                          endDate: CURRENT_DATE,
                        }); // Reset the date picker
                        handleClose(); // Close the form
                      }}
                    >
                      Cancel
                    </Button>
                    <Button disabled={isSubmitting} type="submit">
                      Submit
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </motion.div>
        </Modal>
      )}
    </AnimatePresence>
  );
};

export default TaskFormDialog;
