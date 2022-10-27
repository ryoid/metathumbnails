import React from "react";
import cn from "clsx";

type PrimitiveSkeletonProps = React.ComponentPropsWithoutRef<"div">;
type SkeletonProps = PrimitiveSkeletonProps & {
  border?: boolean;
};

const NAME = "Skeleton";

const Skeleton: React.FC<SkeletonProps> = ({ border, ...props }) => {
  return (
    <div
      {...props}
      className={cn(
        "relative inline-flex select-none space-y-5 overflow-hidden rounded bg-white/5 text-transparent shadow-xl shadow-black/5 before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-rose-100/10 before:to-transparent",
        { "before:border-t before:border-rose-100/5": border },
        props.className
      )}
    />
  );
};

Skeleton.displayName = NAME;

export default Skeleton;
