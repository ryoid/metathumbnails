import React from "react";
import { IconElement, PrimitiveIconProps } from "./types";

const RandomIcon = React.forwardRef<IconElement, PrimitiveIconProps>(
  (props, forwardedRef) => {
    return (
      <svg
        width="1.11em"
        height="1em"
        viewBox="0 0 520 472"
        {...props}
        ref={forwardedRef}
      >
        <path
          fill="currentColor"
          d="M70 365q74 0 118-57q0-4-5-7l-19-38q-13 27-38.5 43.5T70 323H21q-8 0-14.5 6.5T0 344t6.5 14.5T21 365h49zM442 9q-16-14-30 0q-15 15 0 30l27 28h-83q-73 0-117 57q0 3 4 7l19 38q13-27 38.5-43.5T356 109h83l-27 28q-15 15 0 30q6 6 15 6q7 0 15-6l64-64q13-15 0-30zm0 256q-16-14-30 0q-15 15 0 30l27 28h-83q-30 0-56-16.5T260 263l-23-47l-24-47l-10-19q-18-38-54-60.5T70 67H21q-8 0-14.5 6.5T0 88t6.5 14.5T21 109h49q64 0 96 60l24 47l23 47l11 19q20 38 55.5 60.5T358 365h84l-28 28q-15 15 0 30q6 6 15 6q8 0 15-6l64-64q13-15 0-30z"
        ></path>
      </svg>
    );
  }
);

RandomIcon.displayName = "RandomIcon";

export default RandomIcon;
