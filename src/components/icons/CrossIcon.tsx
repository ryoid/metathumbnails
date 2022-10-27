import React from "react";
import { IconElement, PrimitiveIconProps } from "./types";

const CrossIcon = React.forwardRef<IconElement, PrimitiveIconProps>(
  (props, forwardedRef) => {
    return (
      <svg viewBox="0 0 20 20" {...props} ref={forwardedRef}>
        <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
      </svg>
    );
  }
);

CrossIcon.displayName = "CrossIcon";

export default CrossIcon;
