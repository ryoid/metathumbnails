import React from "react";
import cn from "clsx";

type FooterElement = React.ElementRef<"footer">;
type PrimitiveFooterProps = React.ComponentPropsWithoutRef<"footer">;
type FooterProps = PrimitiveFooterProps;

const NAME = "Footer";

const Footer = React.forwardRef<FooterElement, FooterProps>(
  (props, forwardedRef) => {
    return (
      <footer
        {...props}
        className={cn(
          "container mx-auto flex flex-col py-8 px-4",
          props.className
        )}
        ref={forwardedRef}
      >
        <h1 className="text-center text-4xl font-semibold">Meta Thumbnails</h1>
      </footer>
    );
  }
);

Footer.displayName = NAME;

export default Footer;
