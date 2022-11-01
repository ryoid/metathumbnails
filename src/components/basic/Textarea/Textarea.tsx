import React from "react";
import cn from "clsx";

type TextareaElement = React.ElementRef<"textarea">;
type PrimitiveTextareaProps = React.ComponentPropsWithoutRef<"textarea">;
type TextareaProps = PrimitiveTextareaProps;

const NAME = "Textarea";

const Textarea = React.forwardRef<TextareaElement, TextareaProps>(
  (props, forwardedRef) => {
    return (
      <textarea
        {...props}
        className={cn(
          "`h-auto group block w-full items-center justify-center rounded-lg bg-gray-800/75 py-2.5 pl-4 pr-3.5 text-sm ring-1 ring-inset ring-white/5 hover:bg-gray-700/40 hover:ring-gray-500",
          props.className
        )}
        ref={forwardedRef}
      />
    );
  }
);

Textarea.displayName = NAME;

export default Textarea;
