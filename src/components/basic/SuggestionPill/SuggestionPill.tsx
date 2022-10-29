import React from "react";
import cn from "clsx";
import { CrossIcon } from "../../icons";

type SuggestionPillElement = React.ElementRef<"span">;
type PrimitiveSuggestionPillProps = React.ComponentPropsWithoutRef<"span">;
type SuggestionPillProps = PrimitiveSuggestionPillProps & {
  onRemove?: () => void;
};

const NAME = "SuggestionPill";
const RootCn =
  "group inline-flex items-center justify-center text-sm h-auto block rounded-lg py-2.5 px-2.5 text-sm ring-1 ring-gray-700 ring-inset ring-white/5 hover:ring-gray-600 cursor-default font-brand tracking-wide font-medium";

const SuggestionPill = React.forwardRef<
  SuggestionPillElement,
  SuggestionPillProps
>(({ onRemove, children, ...props }, forwardedRef) => {
  return (
    <span
      {...props}
      className={cn(
        RootCn,
        {
          "pr-1.5": !!onRemove,
        },
        props.className
      )}
      ref={forwardedRef}
    >
      {children}
      {onRemove && (
        <span
          onClick={onRemove}
          className="ml-1.5 h-5 w-5 cursor-pointer rounded text-gray-300/40 hover:text-white group-hover:bg-gray-700/40"
        >
          <CrossIcon />
        </span>
      )}
    </span>
  );
});

SuggestionPill.displayName = NAME;

export default SuggestionPill;
