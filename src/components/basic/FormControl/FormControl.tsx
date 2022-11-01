import React from "react";
import cn from "clsx";

type PrimitiveComponentNameProps = React.ComponentPropsWithoutRef<"div">;
type ComponentNameProps = PrimitiveComponentNameProps;

const NAME = "ComponentName";

const ComponentName: React.FC<ComponentNameProps> = (props) => {
  return (
    <div {...props} className={cn("group flex flex-col", props.className)} />
  );
};

ComponentName.displayName = NAME;

export default ComponentName;
