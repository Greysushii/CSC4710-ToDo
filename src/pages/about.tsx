import { type NextPage } from "next";
import { useEffect } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import Head from "next/head";
import Navbar from "~/components/navigation/Navbar";

const About: NextPage = () => {
  useEffect(() => toast.dismiss(), []); // Dismiss toasts from other pages.

  return (
    <>
      <Head>
        <title>ToDo App About Page</title>
        <meta name="description" content="Project Description" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main className="flex min-h-screen flex-col items-center gap-8 bg-gradient-to-b from-[#2e026d] to-[#15162c] pb-40 text-white">
        <div className="container px-4 py-4 text-center">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            About the <span className="text-[hsl(280,100%,70%)]">ToDo</span> App
          </h1>
        </div>
        <div className="flex flex-col items-center gap-16">
          <motion.div
            id="project-description"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="flex h-4/5 w-3/5 flex-col gap-4 rounded-lg border-2 border-white bg-white/10 p-16"
          >
            <h2 className="text-center text-4xl font-bold">
              Project Description
            </h2>
            <p className="text-xl text-white">
              The purpose of the project is to create a web application that
              allows users to create a list of to-do tasks in which they can
              filter, complete, and delete. The application will also allow
              users to create categories for tasks, delete categories, and
              generate reports.
            </p>
          </motion.div>
          <motion.div
            id="project-requirements"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="flex h-4/5 w-3/5 flex-col gap-8 rounded-lg border-2 border-white bg-white/10 p-16"
          >
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="text-center text-4xl font-bold"
            >
              Project Requirements
            </motion.h2>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="flex flex-col gap-4"
            >
              <h3 className="text-left text-3xl font-semibold underline">
                Basic Characteristics
              </h3>
              <ol className="flex list-inside list-decimal flex-col gap-1 text-xl">
                <li className="list-item">No user identification needed.</li>
                <li className="list-item">
                  The current user can see all tasks.
                </li>
              </ol>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="mt-8 text-left text-4xl font-bold"
            >
              Data
            </motion.h2>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="flex flex-col gap-4"
            >
              <h3 className="text-left text-3xl font-semibold underline">
                Tasks
              </h3>
              <p className="text-left text-xl text-white">
                Each task consists of
              </p>
              <ol className="flex list-inside list-decimal flex-col gap-1 text-xl">
                <li className="list-item">Task description (required)</li>
                <li className="list-item">Due date (required)</li>
                <li className="list-item">Task cateogry (optional)</li>
                <li className="list-item">
                  Priority level (optional) (Values: 1-4, where 1 is the highest
                  priority)
                </li>
                <li className="list-item">Status (active or completed)</li>
              </ol>
              <p className="text-left text-lg text-amber-500">
                (Optional) means that the attribute is optional to the user. So,
                the user does not have to provide the information. However, the
                database must store that information if it is provided.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="flex flex-col gap-4"
            >
              <h3 className="text-left text-3xl font-semibold underline">
                Categories
              </h3>
              <p className="text=left text-xl text-white">
                Each category consists of
              </p>
              <ol className="list-inside list-decimal text-xl">
                <li className="list-item">Name</li>
              </ol>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="flex flex-col gap-4"
            >
              <h3 className="text-left text-3xl font-semibold underline">
                Functionalities
              </h3>
              <ol className="flex list-inside list-decimal flex-col gap-1 text-xl">
                <li className="list-item">Current user can create tasks.</li>
                <li className="list-item">Current user can delete tasks.</li>
                <li className="list-item">
                  Current user can mark a task as completed.
                </li>
                <li className="list-item">
                  Current user can create categories.
                </li>
                <li className="list-item">
                  Current user can delete categories.
                </li>
                <li className="list-item">
                  When removing a category, all the tasks under this category
                  will have no category.
                </li>
              </ol>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="flex flex-col gap-4"
            >
              <h3 className="text-left text-3xl font-semibold underline">
                Views or reports
              </h3>
              <ol className="flex list-inside list-decimal flex-col gap-1 text-xl">
                <li className="list-item">
                  The default list view of the application will show overdue
                  tasks and due-today tasks. Tasks will be sorted by priority.
                </li>
                <li className="list-item">
                  The user can select other views based on the day:
                  <ul className="flex list-inside flex-col gap-1 text-xl">
                    <li className="list-item pl-10">
                      a. Due-today tasks. Tasks will be sorted by priority.
                    </li>
                    <li className="list-item pl-10">
                      b. Due-tomorrow tasks. Tasks will be sorted by priority.
                    </li>
                    <li className="list-item pl-10">
                      c. Due within in the next 7 days. Tasks will be sorted by
                      day and priority.
                    </li>
                  </ul>
                </li>
                <li className="list-item">
                  The user can select a report for a specific week. This report
                  will show the day and the number of the task completed per
                  each day and in total.
                </li>
              </ol>
            </motion.div>
          </motion.div>
          <motion.div
            id="sql"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="flex h-4/5 w-3/5 flex-col gap-8 rounded-lg border-2 border-white bg-white/10 p-16"
          >
            <h2 className="text-center text-4xl font-bold">
              SQL Statements for CRUD functionality
            </h2>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="flex flex-col gap-4"
            >
              <h3 className="text-left text-3xl font-semibold underline">
                Main table views for tasks and categories
              </h3>
              <ul className="flex list-inside  flex-col gap-1 text-lg">
                <li className="list-item">
                  <span className="italic text-amber-500">(For tasks)</span>{" "}
                  SELECT * FROM Task ORDER BY priority ASC;
                </li>
                <li className="list-item">
                  <span className="italic text-amber-500">
                    (For category views)
                  </span>{" "}
                  SELECT * FROM Task WHERE category_name =
                  $&#123;input.category_name&#125; ORDER BY priority ASC;
                </li>
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="flex flex-col gap-4"
            >
              <h3 className="text-left text-3xl font-semibold underline">
                Views by due date:
              </h3>
              <ul className="flex list-inside flex-col gap-1 text-lg">
                <li className="list-item">
                  <span className="italic text-amber-500">(Due today)</span>{" "}
                  SELECT * FROM Task WHERE due_date =
                  $&#123;CURRENT_DATE.endOf(&quot;day&quot;).toDate()&#125; ORDER BY
                  priority ASC;
                </li>
                <li className="list-item">
                  <span className="italic text-amber-500">(Due tomorrow)</span>{" "}
                  SELECT * FROM Task WHERE due_date = $&#123;CURRENT_DATE.add(1,
                  &quot;day&quot;).endOf(&quot;day&quot;).toDate()&#125; ORDER BY
                  priority ASC;
                </li>
                <li className="list-item">
                  <span className="italic text-amber-500">
                    (Due within 7 days)
                  </span>{" "}
                  SELECT * FROM Task WHERE due_date &lt;=
                  $&#123;CURRENT_DATE.add(7, &quot;day&quot;).endOf(
                  &quot;day&quot;).toDate()&#125; <br /> AND due_date &gt;=
                  $&#123;CURRENT_DATE.startOf(&quot;day&quot;).toDate()&#125; ORDER BY
                  priority ASC, due_date DESC;
                </li>
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="flex flex-col gap-4"
            >
              <h3 className="text-left text-3xl font-semibold underline">
                Category views by due date:
              </h3>
              <ul className="flex list-inside flex-col gap-1 text-lg">
                <li className="list-item">
                  <span className="italic text-amber-500">(Due today)</span>{" "}
                  SELECT * FROM Task WHERE category_name =
                  $&#123;input.category_name&#125; AND <br />
                  due_date = $&#123;CURRENT_DATE.endOf(&quot;day&quot;).toDate()&#125;
                  ORDER BY priority ASC;
                </li>
                <li className="list-item">
                  <span className="italic text-amber-500">(Due tomorrow)</span>{" "}
                  SELECT * FROM Task WHERE category_name =
                  $&#123;input.category_name&#125; AND <br /> due_date =
                  $&#123;CURRENT_DATE.add(1,
                  &quot;day&quot;).endOf(&quot;day&quot;).toDate()&#125; ORDER BY
                  priority ASC;
                </li>
                <li className="list-item">
                  <span className="italic text-amber-500">
                    (Due within 7 days)
                  </span>{" "}
                  SELECT * FROM Task WHERE category_name =
                  $&#123;input.category_name&#125; AND <br />
                  due_date &lt;= $&#123;CURRENT_DATE.add(7,
                  &quot;day&quot;).endOf(&quot;day&quot;).toDate()&#125; AND due_date
                  &gt;= $&#123;CURRENT_DATE.startOf(&quot;day&quot;).toDate()&#125; ORDER
                  BY priority ASC, due_date DESC;
                </li>
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="flex flex-col gap-4"
            >
              <h3 className="text-left text-3xl font-semibold underline">
                Create, Update, and Delete Tasks
              </h3>
              <ul className="flex list-inside flex-col gap-1 text-lg">
                <li className="list-item">
                  <span className="italic text-amber-500">
                    (Create task with category)
                  </span>{" "}
                  INSERT INTO Task(name, description, priority, due_date,
                  category_name) VALUES ($&#123;input.name&#125;,
                  $&#123;input.description&#125;, $&#123;input.priority&#125;,
                  $&#123;FORMATTED_DATE&#125;, $&#123;input.category&#125;);
                </li>
                <li className="list-item">
                  <span className="italic text-amber-500">
                    (Create task without category)
                  </span>{" "}
                  INSERT INTO Task(name, description, priority, due_date) VALUES
                  ($&#123;input.name&#125;, $&#123;input.description&#125;,
                  $&#123;input.priority&#125;, $&#123;FORMATTED_DATE&#125;);
                </li>
                <li className="list-item">
                  <span className="italic text-amber-500">
                    (Update task status)
                  </span>{" "}
                  UPDATE Task SET status = $&#123;NEW_STATUS&#125; WHERE id =
                  $&#123;input.taskId&#125;;
                </li>
                <li className="list-item">
                  <span className="italic text-amber-500">
                    (Update task category to null after deleting category)
                  </span>{" "}
                  UPDATE Task SET category_name = null WHERE category_name =
                  $&#123;input.name&#125;;
                </li>
                <li className="list-item">
                  <span className="italic text-amber-500">(Delete task)</span>{" "}
                  DELETE FROM Task WHERE id = $&#123;input.taskId&#125;;
                </li>
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="flex flex-col gap-4"
            >
              <h3 className="text-left text-3xl font-semibold underline">
                Create and Delete Categories
              </h3>
              <ul className="flex list-inside flex-col gap-1 text-lg">
                <li className="list-item">
                  <span className="italic text-amber-500">
                    (Create category)
                  </span>{" "}
                  INSERT INTO Category(name) VALUES ($&#123;input.name&#125;);
                </li>
                <li className="list-item">
                  <span className="italic text-amber-500">
                    (Delete Category)
                  </span>{" "}
                  INSERT INTO Task(name, description, priority, due_date) VALUES
                  ($&#123;input.name&#125;, $&#123;input.description&#125;,
                  $&#123;input.priority&#125;, $&#123;FORMATTED_DATE&#125;);
                </li>
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="flex flex-col gap-4"
            >
              <h3 className="text-left text-3xl font-semibold underline">
                Query to Generate Report
              </h3>
              <ul className="flex list-inside  flex-col gap-1 text-lg">
                <li className="list-item">
                  <span className="italic text-amber-500">
                    (Get all tasks within time frame)
                  </span>{" "}
                  SELECT * FROM Task WHERE due_date &gt;=
                  $&#123;FORMATTED_START_DATE&#125; AND due_date &lt;=
                  $&#123;FORMATTED_END_DATE&#125;;
                </li>
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </main>
    </>
  );
};

export default About;
