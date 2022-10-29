import React from "react";
import cn from "clsx";

type PrimitivePlaceholderProps = React.ComponentPropsWithoutRef<"div">;
type PlaceholderProps = PrimitivePlaceholderProps;

const NAME = "Placeholder";

const Placeholder: React.FC<PlaceholderProps> = (props) => {
  return (
    <div {...props} className={cn("block", props.className)}>
      PLACEHODLER
    </div>
  );
};

Placeholder.displayName = NAME;

export default Placeholder;
