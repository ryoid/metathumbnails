import React from "react";
import cn from "clsx";

import { Color } from "../color";

type PrimitiveButtonProps = React.ComponentPropsWithoutRef<"button">;
type ButtonProps = PrimitiveButtonProps & {
  color?: Color;
  variant?: "solid" | "outline";
  size?: "xs" | "sm" | "md";
  center?: boolean;
};

const NAME = "Button";

const Button: React.FC<ButtonProps> = ({
  color = "gray",
  variant = "solid",
  type = "button",
  size = "md",
  center,
  disabled,
  ...props
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      {...props}
      className={cn(
        "inline-flex select-none items-center rounded border font-brand font-medium",
        {
          "justify-center": center,
        },
        {
          "gap-2 px-4 py-2": size === "md",
          "gap-0.5 px-2.5 py-1 text-sm": size === "sm",
          "gap-0.5 px-2 py-0.5 text-xs": size === "xs",
        },
        {
          "text-white": true,
          "border-indigo-500 bg-indigo-600 hover:border-indigo-400 hover:bg-indigo-500":
            color === "indigo",
          "border-gray-600 bg-gray-700 hover:border-gray-500 hover:bg-gray-600":
            color === "gray",
        },
        {
          "bg-transparent": variant === "outline",
        },
        {
          "cursor-not-allowed text-gray-500 hover:bg-transparent": disabled,
        },
        props.className
      )}
    />
  );
};

Button.displayName = NAME;

export default Button;
