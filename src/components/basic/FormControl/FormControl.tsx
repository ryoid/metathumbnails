import React from "react";
import cn from "clsx";

type FormControlElement = React.ElementRef<"div">;
type PrimitiveFormControlProps = React.ComponentPropsWithoutRef<"div">;
type FormControlProps = PrimitiveFormControlProps;

const NAME = "FormControl";
const RootCn = "form-control flex flex-col gap-1.5 w-full";

const FormControl = React.forwardRef<FormControlElement, FormControlProps>(
  (props, forwardedRef) => {
    return (
      <div
        {...props}
        className={cn(RootCn, props.className)}
        ref={forwardedRef}
      />
    );
  }
);

FormControl.displayName = NAME;

export default FormControl;
