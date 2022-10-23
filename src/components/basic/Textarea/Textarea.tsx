import React from "react";
import cn from "clsx";

type TextareaElement = React.ElementRef<"textarea">;
type PrimitiveTextareaProps = React.ComponentPropsWithoutRef<"textarea">;
type TextareaProps = PrimitiveTextareaProps;

const NAME = "Textarea";
const RootCn =
  "group flex items-center justify-center text-sm h-auto block rounded-lg py-2.5 pl-4 pr-3.5 text-sm ring-1 ring-gray-200 hover:ring-gray-300 bg-gray-800/75 ring-inset ring-white/5 hover:bg-gray-700/40 hover:ring-gray-500 w-full";

const Textarea = React.forwardRef<TextareaElement, TextareaProps>(
  (props, forwardedRef) => {
    return (
      <textarea
        {...props}
        className={cn(props.className, RootCn)}
        ref={forwardedRef}
      />
    );
  }
);

Textarea.displayName = NAME;

export default Textarea;
