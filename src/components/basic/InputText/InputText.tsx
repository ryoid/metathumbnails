import React from "react";
import cn from "clsx";

type InputTextElement = React.ElementRef<"input">;
type PrimitiveInputTextProps = React.ComponentPropsWithoutRef<"input">;
type InputTextProps = PrimitiveInputTextProps;

const NAME = "InputText";
const RootCn =
  "group flex items-center justify-center text-sm h-auto block rounded-lg py-2.5 pl-4 pr-3.5 text-sm ring-1 ring-gray-200 hover:ring-gray-300 bg-gray-800/75 ring-inset ring-white/5 hover:bg-gray-700/40 hover:ring-gray-500 w-full";

const InputText = React.forwardRef<InputTextElement, InputTextProps>(
  (props, forwardedRef) => {
    return (
      <input
        {...props}
        className={cn(RootCn, props.className)}
        ref={forwardedRef}
      />
    );
  }
);

InputText.displayName = NAME;

export default InputText;
