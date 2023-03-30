import clsx from "clsx";

// * This is a default implementation for the button. It will will apply the default
// * stylings, and will also add the className to the button. You can override the stylings
// * in here or via className when you call the component in the tsx.
const Button: React.FC<React.ComponentPropsWithoutRef<"button">> = (props) => {
  const { className, disabled, ...rest } = props;
  return (
    <button
      className={clsx(
        "min-w-[10rem] rounded-lg bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 px-5 py-2.5 text-center text-sm font-medium text-white duration-100 hover:cursor-pointer hover:opacity-90 active:scale-90 active:opacity-60",
        className,
        disabled &&
          "opacity-50 hover:cursor-not-allowed hover:opacity-60 active:scale-100"
      )}
      {...rest}
    />
  );
};

export default Button;
