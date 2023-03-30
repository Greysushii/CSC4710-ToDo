import { AnimatePresence, motion } from "framer-motion";

const TaskSkeleton: React.FC = () => {
  return (
    <AnimatePresence>
      <motion.li
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="flex animate-pulse flex-col text-white"
      >
        <div
          className="container flex h-28 items-center justify-between 
        rounded-md bg-violet-500/60 px-4 py-4"
        />
      </motion.li>
    </AnimatePresence>
  );
};

export default TaskSkeleton;
