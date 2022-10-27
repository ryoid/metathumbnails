import React from "react";
import cn from "clsx";

import { Color } from "../color";

type PrimitiveButtonProps = React.ComponentPropsWithoutRef<"button">;
type ButtonProps = PrimitiveButtonProps & {
  color?: Color;
};

const NAME = "Button";

const Button: React.FC<ButtonProps> = ({ color = "gray", ...props }) => {
  return (
    <button
      {...props}
      className={cn(
        "inline-flex select-none rounded  border px-4 py-2 font-brand font-medium",
        {
          "text-white": true,
          "border-indigo-500 bg-indigo-600 hover:border-indigo-400 hover:bg-indigo-500":
            color === "indigo",
          "border-gray-600 bg-gray-700 hover:border-gray-500 hover:bg-gray-600":
            color === "gray",
        },
        props.className
      )}
    />
  );
};

Button.displayName = NAME;

export default Button;
