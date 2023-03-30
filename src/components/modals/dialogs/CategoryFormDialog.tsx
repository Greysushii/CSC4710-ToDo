import { AnimatePresence, motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { TiDelete } from "react-icons/ti";
import toast from "react-hot-toast";

import { api } from "~/utils/api";
import { AutoAnimate } from "~/components/AutoAnimate";
import Button from "~/components/Button";
import Modal from "../Modal";
import FormErrorMessage from "~/components/FormErrorMessage";

// * Props for the Category form
type CategoryFormDialogProps = {
  isShowing: boolean;
  handleClose: () => void; // Type is of void function
};

// * Category form data
type CategoryFormData = {
  name: string;
};

// * Responsible for loading the Category form and allowing users to create Categorys.
const CategoryFormDialog: React.FC<CategoryFormDialogProps> = ({
  isShowing,
  handleClose,
}) => {
  const utils = api.useContext();

  // * Procedure to create Categorys in the database
  const createCategory = api.todo.createCategory.useMutation({
    onSuccess: async () => {
      reset(); // Reset the form state
      handleClose(); // Close the form
      await utils.todo.getAllCategories.invalidate(); // Invalidate the cache
      toast.success("Category created successfully", { className: "text-xl" }); // Display a success toast
    },
    onError: (error) => {
      // Display an error toast depending on error.
      if (error.message === "Category already exists") {
        toast.error("This category already exists", {
          className: "text-xl",
        });
      } else {
        toast.error("An error occurred while creating the category", {
          className: "text-xl",
        });
      }
    },
  });

  // react-hook-form for form validation
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CategoryFormData>();

  return (
    // ! Must be placed to place exit animations,
    <AnimatePresence>
      {/* Only render the form if isShowing prop is true (this indicates that the parent will keep 
      control of the state of the form's visibility) */}
      {isShowing && (
        <Modal>
          <motion.div
            className="min-w-screen fixed inset-0 z-10 flex 
            min-h-screen items-center justify-center bg-gray-600 bg-opacity-75"
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
                  handleClose();
                }}
              />
              <form
                className="container"
                // ! Disable error as react-hook-form does not use synchronous onSubmit handlers
                // eslint-disable-next-line @typescript-eslint/no-misused-promises
                onSubmit={handleSubmit((data) => {
                  createCategory.mutate(data);
                })}
              >
                <div className="flex flex-col gap-4">
                  <label
                    htmlFor="category-name"
                    className="mb-2 block text-lg font-medium text-white dark:text-white"
                  >
                    Category Name
                  </label>
                  <input
                    id="category-name"
                    className="block w-full rounded-lg p-2.5 text-lg outline-none"
                    placeholder="Ex. Personal"
                    {...register("name", {
                      required: "Category name is required",
                      validate: (value) => !!value.trim(), // Trim off trailing and leading spaces
                    })}
                  />
                  <AutoAnimate>
                    {errors.name?.message && (
                      <FormErrorMessage message={errors.name.message} />
                    )}
                  </AutoAnimate>
                  <div className="flex w-full flex-col justify-end gap-4 lg:flex-row">
                    <Button
                      type="button"
                      onClick={() => {
                        reset();
                        handleClose();
                      }}
                      disabled={isSubmitting}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" disabled={isSubmitting}>
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

export default CategoryFormDialog;
