import React from "react";
import Link from "next/link";
import cn from "clsx";

import { TemplateTypes } from "./templates/const";

type PrimitiveTemplateTabsProps = Omit<
  React.ComponentPropsWithoutRef<"div">,
  "children"
>;
type TemplateTabsProps = PrimitiveTemplateTabsProps & {
  active: string;
};

const NAME = "TemplateTabs";

const TemplateTabs: React.FC<TemplateTabsProps> = ({ active, ...props }) => {
  return (
    <div {...props} className={cn("inline-flex gap-2", props.className)}>
      {TemplateTypes.map((template) => (
        <Link key={`tab-${template}`} href={`/${template}`}>
          <a
            className={cn(
              "inline-flex select-none rounded px-4 py-2 font-brand font-medium capitalize text-gray-400",
              {
                "hover:bg-gray-800": active !== template,
                "bg-white text-black": active === template,
              }
            )}
          >
            {template}
          </a>
        </Link>
      ))}
    </div>
  );
};

TemplateTabs.displayName = NAME;

export default TemplateTabs;
