import React from "react";
import cn from "clsx";
import { useAtom } from "jotai";

import { formAtom } from "../../store/form";

type PreviewElement = React.ElementRef<"div">;
type PrimitivePreviewProps = React.ComponentPropsWithoutRef<"div">;
type PreviewProps = Omit<PrimitivePreviewProps, "children">;

const NAME = "Preview";
const RootCn = "form-control flex flex-col gap-1.5 w-full";

const Preview = React.forwardRef<PreviewElement, PreviewProps>(
  (props, forwardedRef) => {
    const [f] = useAtom(formAtom);

    return (
      <div
        {...props}
        className={cn(RootCn, props.className)}
        ref={forwardedRef}
      >
        Preview
        <code className="text-xs">{JSON.stringify(f, null, 2)}</code>
      </div>
    );
  }
);

Preview.displayName = NAME;

export default Preview;
