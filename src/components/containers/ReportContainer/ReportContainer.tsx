import { AnimatePresence, motion } from "framer-motion";
import type { RouterOutputs } from "~/utils/api";
import dayjs from "dayjs";

type ReportContainerProps = {
  startDate: Date;
  endDate: Date;
  tasks: RouterOutputs["todo"]["generateReport"];
};

const ReportContainer: React.FC<ReportContainerProps> = ({
  startDate,
  endDate,
  tasks,
}) => {
  const dates: Date[] = [];

  for (let i = startDate; i <= endDate; i = dayjs(i).add(1, "day").toDate()) {
    dates.push(i);
  }

  return (
    <AnimatePresence>
      <motion.table
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.5 }}
        className="table-auto rounded-md bg-gray-600 text-white"
      >
        <thead className="text-md w-full text-left text-xl">
          <tr>
            <th scope="col" className="px-6 py-3">
              Date
            </th>
            <th scope="col" className="px-6 py-3">
              Completed Tasks
            </th>
          </tr>
        </thead>
        <tbody className="text-lg">
          {dates.map((date, index) => (
            <tr key={index}>
              <th className="whitespace-nowrap px-6 py-4">
                {dayjs(date).format("MMM DD, YYYY")}
              </th>
              <td className="px-6 py-4 text-center font-semibold">
                {
                  tasks.filter(
                    (task) =>
                      dayjs(task.due_date).isSame(date, "day") &&
                      task.status === "completed"
                  ).length
                }
              </td>
            </tr>
          ))}
        </tbody>
      </motion.table>
    </AnimatePresence>
  );
};

export default ReportContainer;
