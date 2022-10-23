import React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import cn from "clsx";

type LabelElement = React.ElementRef<typeof LabelPrimitive.Root>;
type PrimitiveLabelProps = React.ComponentPropsWithoutRef<
  typeof LabelPrimitive.Root
>;
type LabelProps = PrimitiveLabelProps;

const NAME = "Label";
const RootCn = "text-sm";

const Label = React.forwardRef<LabelElement, LabelProps>(
  (props, forwardedRef) => {
    return (
      <LabelPrimitive.Root
        {...props}
        className={cn(RootCn, props.className)}
        ref={forwardedRef}
      />
    );
  }
);

Label.displayName = NAME;

export default Label;
