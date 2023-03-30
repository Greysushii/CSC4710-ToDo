import { type NextPage } from "next";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Head from "next/head";
import Link from "next/link";
import dynamic from "next/dynamic";

import Button from "~/components/Button";
import TasksDisplay from "~/components/containers/TasksContainer/TasksDisplay";
import CategoriesDisplay from "~/components/containers/CategoryContainer/CategoriesDisplay";
import LinksContainer from "~/components/containers/LinksContainer/LinksContainer";
import Navbar from "~/components/navigation/Navbar";
const TaskFormDialog = dynamic(
  () => import("~/components/modals/dialogs/TaskFormDialog"),
  { ssr: false }
);
const CategoryFormDialog = dynamic(
  () => import("~/components/modals/dialogs/CategoryFormDialog"),
  { ssr: false }
);

const Tomorrow: NextPage = () => {
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [showCategoryForm, setShowCategoryForm] = useState(false);

  useEffect(() => toast.dismiss(), []); // Dismiss toasts from other pages.

  return (
    <>
      <Head>
        <title>Todo App Tasks Due Tomorrow</title>
        <meta
          name="description"
          content="All Tasks Due Tomorrow will be shown on this page."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* Task form dialog */}
      <TaskFormDialog
        isShowing={showTaskForm}
        handleClose={() => setShowTaskForm(false)}
      />
      {/* Category form dialog */}
      <CategoryFormDialog
        isShowing={showCategoryForm}
        handleClose={() => setShowCategoryForm(false)}
      />
      <Navbar />
      <main className="flex min-h-screen flex-col items-center gap-4 bg-gradient-to-b from-[#2e026d] to-[#15162c] pb-40">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-4">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Tasks due <span className="text-[hsl(280,100%,70%)]">Tomorrow</span>
          </h1>
          <LinksContainer />
        </div>
        {/* Create a container for the add new task/add new category */}
        <div className="container flex items-center justify-center gap-12">
          <Button // Use default button class in components directory
            id="add-new-task"
            type="button"
            onClick={() => setShowTaskForm(true)}
          >
            Add task
          </Button>
          <Button
            id="add-new-category"
            type="button"
            onClick={() => setShowCategoryForm(true)}
          >
            Add category
          </Button>
          <Link href="/report">
            <Button>Generate Report</Button>
          </Link>
        </div>
        {/* Create a container for the task list */}
        <TasksDisplay dateFilter="tomorrow" />
        {/* Create a container for the category list */}
        <CategoriesDisplay dateFilter="tomorrow" />
      </main>
    </>
  );
};

export default Tomorrow;
