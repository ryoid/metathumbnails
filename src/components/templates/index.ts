import { SatoriOptions } from "satori";

import { TemplateType, TemplateTypes, DEFAULT_TEMPLATE } from "./const";
import { RenderGmailTemplate } from "./Gmail";
import { RenderTwitterTemplate } from "./Twitter";

import TemplateConfigurator from "./Configurator";

export const TemplateRenderer: Record<
  TemplateType,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (props: any, options: SatoriOptions) => Promise<string>
> = { gmail: RenderGmailTemplate, twitter: RenderTwitterTemplate };

export { TemplateTypes, TemplateConfigurator, DEFAULT_TEMPLATE };

export type { TemplateType };
