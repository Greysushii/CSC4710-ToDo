import { BiError } from "react-icons/bi";

type FormErrorMessageProps = {
  message: string;
};

// * Responsible for displaying error messages in forms
const FormErrorMessage: React.FC<FormErrorMessageProps> = ({ message }) => {
  return (
    <div
      className="mt-2 flex items-center gap-2 text-lg text-red-500"
      role="alert"
    >
      <div className="text-lg">
        <BiError />
      </div>
      <p className="font-medium">{message}</p>
    </div>
  );
};

export default FormErrorMessage;
