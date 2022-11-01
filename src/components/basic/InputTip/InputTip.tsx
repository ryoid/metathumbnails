import React from "react";
import cn from "clsx";

type InputTipElement = React.ElementRef<"div">;
type PrimitiveInputTipProps = React.ComponentPropsWithoutRef<"div">;
type InputTipProps = PrimitiveInputTipProps & {
  description?: string;
};

const NAME = "InputTip";

const InputTip = React.forwardRef<InputTipElement, InputTipProps>(
  ({ description, children, ...props }, forwardedRef) => {
    return (
      <div
        {...props}
        className={cn(
          "absolute mt-2 flex flex-col gap-2 rounded border border-white/5 bg-gray-900 px-2 py-1.5 text-xs text-gray-400 opacity-0 transition-opacity group-focus-within:opacity-100",
          props.className
        )}
        ref={forwardedRef}
      >
        <div className="flex gap-2">{children}</div>
        {description && <span className="italic">{description}</span>}
      </div>
    );
  }
);

InputTip.displayName = NAME;

export default InputTip;
