import React from "react";
import { IconElement, PrimitiveIconProps } from "./types";

const UnhideIcon = React.forwardRef<IconElement, PrimitiveIconProps>(
  (props, forwardedRef) => {
    return (
      <svg
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
        {...props}
        ref={forwardedRef}
      >
        <path
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12c1.292 4.338 5.31 7.5 10.066 7.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 0 1-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
        ></path>
      </svg>
    );
  }
);

UnhideIcon.displayName = "UnhideIcon";

export default UnhideIcon;
