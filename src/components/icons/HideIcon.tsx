import React from "react";
import { IconElement, PrimitiveIconProps } from "./types";

const HideIcon = React.forwardRef<IconElement, PrimitiveIconProps>(
  (props, forwardedRef) => {
    return (
      <svg
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
        {...props}
        ref={forwardedRef}
      >
        <g
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        >
          <path d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178c.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"></path>
          <path d="M15 12a3 3 0 1 1-6 0a3 3 0 0 1 6 0Z"></path>
        </g>
      </svg>
    );
  }
);

HideIcon.displayName = "HideIcon";

export default HideIcon;
