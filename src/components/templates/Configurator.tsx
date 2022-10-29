import React from "react";
import cn from "clsx";

import { TemplateType } from "./const";
import { TemplateFormComponent as _TemplateFormComponent } from "./helpers";

type PrimitiveTemplateConfiguratorProps = React.ComponentPropsWithoutRef<"div">;
type TemplateConfiguratorProps = PrimitiveTemplateConfiguratorProps & {
  template: TemplateType;
};

const NAME = "TemplateConfigurator";
const templateCn = {
  gmail: "text-[#e13f3a]",
  twitter: "text-[#3e9beb]",
};

const TemplateConfigurator: React.FC<TemplateConfiguratorProps> = ({
  template,
  ...props
}) => {
  const TemplateFormComponent = _TemplateFormComponent[template];

  return (
    <div {...props} className={cn("block", props.className)}>
      <h2 className="my-5 text-xl font-semibold tracking-wide">
        <span
          className={cn(
            "capitalize underline underline-offset-4",
            templateCn[template]
          )}
        >
          {template}
        </span>{" "}
        Configuration
      </h2>

      <TemplateFormComponent />
    </div>
  );
};

TemplateConfigurator.displayName = NAME;

export default TemplateConfigurator;
