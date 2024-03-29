import React from "react";
import cn from "clsx";
import Link from "next/link";

type FooterElement = React.ElementRef<"footer">;
type PrimitiveFooterProps = React.ComponentPropsWithoutRef<"footer">;
type FooterProps = PrimitiveFooterProps;

const NAME = "Footer";

const Footer = React.forwardRef<FooterElement, FooterProps>(
  (props, forwardedRef) => {
    return (
      <footer
        {...props}
        className={cn("container mx-auto", props.className)}
        ref={forwardedRef}
      >
        <div className="flex flex-col items-center justify-center gap-4 py-8 px-4 md:flex-row">
          <Link href="/gmail" passHref>
            <a>
              <div className="text-gray-500">Meta Thumbnails</div>
            </a>
          </Link>
          <Link href="/product/api" passHref>
            <a>
              <div className="text-gray-500">API</div>
            </a>
          </Link>
          <Link href="https://twitter.com/ry_oid" passHref>
            <a>
              <div className="text-gray-500">Contact</div>
            </a>
          </Link>
        </div>
      </footer>
    );
  }
);

Footer.displayName = NAME;

export default Footer;
