import { ComponentProps } from "react";
import { cn } from "../helpers/cn";

const Button = ({
  children,
  className = "",
  ...props
}: ComponentProps<"button">) => {
  return (
    <button
      {...props}
      className={cn(`py-2 rounded-lg text-white ${className}`)}
    >
      {children}
    </button>
  );
};

export default Button;
