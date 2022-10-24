import React from "react";

type PrimitiveComponentNameProps = React.ComponentPropsWithoutRef<"div">;
type ComponentNameProps = PrimitiveComponentNameProps;

const NAME = "ComponentName";

const ComponentName: React.FC<ComponentNameProps> = (props) => {
  return <div {...props} />;
};

ComponentName.displayName = NAME;

export default ComponentName;
