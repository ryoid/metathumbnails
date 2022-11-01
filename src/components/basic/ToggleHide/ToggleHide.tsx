import React from "react";
import cn from "clsx";

import { HideIcon, UnhideIcon } from "@/components/icons";

type ToggleHideElement = React.ElementRef<"input">;
type PrimitiveToggleHideProps = React.ComponentPropsWithoutRef<"input">;
type ToggleHideProps = Omit<PrimitiveToggleHideProps, "size"> & {
  size?: "xs" | "sm" | "md";
  label?: string;
};

const NAME = "ToggleHide";

const ToggleHide = React.forwardRef<ToggleHideElement, ToggleHideProps>(
  ({ size = "md", id, label, title, className, ...props }, forwardedRef) => {
    return (
      <label htmlFor={id} className={cn("", className)} title={title}>
        {label && <span className="text-sm font-medium">{label}</span>}

        <div className="relative cursor-pointer text-gray-500 hover:text-gray-400">
          <input
            {...props}
            type="checkbox"
            id={id}
            className="peer sr-only"
            ref={forwardedRef}
          />
          <HideIcon className={cn("block peer-checked:hidden", {})} />
          <UnhideIcon
            className={cn("hidden text-rose-300 peer-checked:block", {})}
          />
        </div>
      </label>
    );
  }
);

ToggleHide.displayName = NAME;

export default ToggleHide;
