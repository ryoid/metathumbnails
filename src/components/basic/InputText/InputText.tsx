import React from "react";
import cn from "clsx";

type InputTextElement = React.ElementRef<"input">;
type PrimitiveInputTextProps = React.ComponentPropsWithoutRef<"input">;
type InputTextProps = PrimitiveInputTextProps & {
  size?: "xs" | "sm" | "md";
};

const NAME = "InputText";

const InputText = React.forwardRef<InputTextElement, InputTextProps>(
  ({ size = "md", ...props }, forwardedRef) => {
    return (
      <input
        {...props}
        className={cn(
          "group inline-flex h-auto w-full items-center justify-center rounded-lg bg-gray-800/75 text-sm ring-1 ring-inset ring-white/5 [color-scheme:dark] hover:bg-gray-700/40 hover:ring-gray-500 focus:bg-gray-800",
          {
            "py-2.5 pl-4 pr-3.5 ": size === "md",
            "py-1.5 px-3 text-sm": size === "sm",
            "px-2 py-0.5 text-xs": size === "xs",
            // "gap-0.5 px-2.5 py-1 text-sm": size === "sm",
            // "gap-0.5 px-2 py-0.5 text-xs": size === "xs",
          },
          props.className
        )}
        ref={forwardedRef}
      />
    );
  }
);

InputText.displayName = NAME;

export default InputText;
