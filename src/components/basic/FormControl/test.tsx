import React from "react";

type CompElement = React.ElementRef<"div">;
type PrimitiveCompProps = React.ComponentPropsWithoutRef<"div">;
type CompProps = PrimitiveCompProps;

const NAME = "Comp";

const Comp = React.forwardRef<CompElement, CompProps>((props, forwardedRef) => {
  return <div {...props} ref={forwardedRef} />;
});

Comp.displayName = NAME;

export default Comp;
