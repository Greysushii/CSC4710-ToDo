import { type ElementType, type HTMLAttributes } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";

interface Props extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
}

// AutoAnimate is a component that will automatically animate its children
export const AutoAnimate: React.FC<Props> = ({
  as: Tag = "div",
  children,
  ...rest
}) => {
  const [ref] = useAutoAnimate<HTMLElement>();
  return (
    <Tag ref={ref} {...rest}>
      {children}
    </Tag>
  );
};
