import React from "react";
import cn from "clsx";

type ToggleElement = React.ElementRef<"input">;
type PrimitiveToggleProps = React.ComponentPropsWithoutRef<"input">;
type ToggleProps = Omit<PrimitiveToggleProps, "size"> & {
  size?: "xs" | "sm" | "md";
  label?: string;
};

const NAME = "Toggle";

const Toggle = React.forwardRef<ToggleElement, ToggleProps>(
  ({ size = "md", id, label, title, className, ...props }, forwardedRef) => {
    return (
      <label htmlFor={id} className={cn("", className)} title={title}>
        {label && <span className="text-sm font-medium">{label}</span>}

        <div className="relative">
          <input
            {...props}
            type="checkbox"
            id={id}
            className="peer sr-only"
            ref={forwardedRef}
          />
          <div
            className={cn(
              "peer rounded-full bg-gray-800 ring-1 ring-inset ring-white/5 after:absolute  after:top-[2px] after:left-[2px] after:rounded-full after:border after:border-gray-300 after:bg-gray-200 after:transition-all after:content-[''] peer-checked:bg-indigo-700 peer-checked:ring-indigo-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-hover:bg-gray-700 peer-hover:ring-gray-500 peer-hover:after:bg-white peer-hover:peer-checked:bg-indigo-600 peer-checked:peer-hover:ring-indigo-300 peer-focus:outline",
              {
                "h-6 w-11 after:h-5 after:w-5": size === "md",
                "h-5 w-9 after:h-4 after:w-4": size === "sm",
                "h-4 w-7 after:h-3 after:w-3": size === "xs",
              }
            )}
          />
        </div>
      </label>
    );
  }
);

Toggle.displayName = NAME;

export default Toggle;
