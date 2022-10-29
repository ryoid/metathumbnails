import React from "react";
import cn from "clsx";

type HeaderElement = React.ElementRef<"div">;
type PrimitiveHeaderProps = React.ComponentPropsWithoutRef<"div">;
type HeaderProps = PrimitiveHeaderProps;

const NAME = "Header";

const Header = React.forwardRef<HeaderElement, HeaderProps>(
  (props, forwardedRef) => {
    return (
      <div
        {...props}
        className={cn(
          "container mx-auto flex flex-col py-8 px-4",
          props.className
        )}
        ref={forwardedRef}
      >
        <h1 className="text-center text-4xl font-semibold">Meta Thumbnails</h1>
      </div>
    );
  }
);

Header.displayName = NAME;

export default Header;
