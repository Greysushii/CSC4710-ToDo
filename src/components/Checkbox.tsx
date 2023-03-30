import { AiOutlineCheck } from "react-icons/ai";

// The props that a Checkbox will take.
type CheckboxProps = {
  isChecked: boolean;
  handleClick: () => void; // Type is of void function
};

// Responsible for rendering a checkbox that can be toggled.
// The checkbox is a circle with a checkmark inside of it, and it is animated.
const Checkbox: React.FC<CheckboxProps> = ({ isChecked, handleClick }) => {
  return (
    <div
      className={`${
        isChecked ? "bg-green-400" : "bg-gray-400"
      } flex h-8 w-8 cursor-pointer items-center justify-center rounded-md transition-colors duration-200`}
      onClick={() => handleClick()}
    >
      {isChecked ? (
        <AiOutlineCheck className="h-9 w-9 rotate-[17] transform text-white opacity-100 transition-all duration-300" />
      ) : (
        <AiOutlineCheck className="h-9 w-9 rotate-45 transform text-white opacity-0 transition-all duration-300" />
      )}
    </div>
  );
};

export default Checkbox;
