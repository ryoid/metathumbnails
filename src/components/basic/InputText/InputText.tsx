import React from "react";
import cn from "clsx";

type InputTextElement = React.ElementRef<"input">;
type PrimitiveInputTextProps = React.ComponentPropsWithoutRef<"input">;
type InputTextProps = Omit<PrimitiveInputTextProps, "size"> & {
  size?: "xs" | "sm" | "md";
};

const NAME = "InputText";

const InputText = React.forwardRef<InputTextElement, InputTextProps>(
  ({ size = "md", disabled, ...props }, forwardedRef) => {
    return (
      <input
        {...props}
        className={cn(
          "group inline-flex h-auto w-full items-center justify-center rounded-lg text-sm ring-1 ring-inset [color-scheme:dark] focus:bg-gray-800",
          {
            "py-2.5 pl-4 pr-3.5 ": size === "md",
            "py-1.5 px-3 text-sm": size === "sm",
            "px-2 py-0.5 text-xs": size === "xs",
            // "gap-0.5 px-2.5 py-1 text-sm": size === "sm",
            // "gap-0.5 px-2 py-0.5 text-xs": size === "xs",
          },
          {
            "bg-gray-800/75 text-gray-100 ring-white/5 hover:bg-gray-700/40 hover:ring-gray-500":
              !disabled,
            "cursor-not-allowed bg-gray-800/20 text-gray-500 ring-white/5":
              disabled,
          },
          props.className
        )}
        disabled={disabled}
        ref={forwardedRef}
      />
    );
  }
);

InputText.displayName = NAME;

export default InputText;
