import React from "react";
import cn from "clsx";
import Header from "../Header";
import Footer from "../Footer";

type LayoutElement = React.ElementRef<"div">;
type PrimitiveLayoutProps = React.ComponentPropsWithoutRef<"div">;
type LayoutProps = PrimitiveLayoutProps;

const NAME = "Layout";

const Layout = React.forwardRef<LayoutElement, LayoutProps>(
  ({ children, ...props }, forwardedRef) => {
    return (
      <div
        {...props}
        className={cn("flex min-h-screen flex-col", props.className)}
        ref={forwardedRef}
      >
        <Header />

        {children}

        <Footer className="mt-auto" />
      </div>
    );
  }
);

Layout.displayName = NAME;

export default Layout;
