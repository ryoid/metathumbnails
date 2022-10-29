import dynamic from "next/dynamic";
import { TemplateType } from "./const";

import GmailForm from "./Gmail/Form";
import TwitterForm from "./Twitter/Form";

export const TemplateFormComponent: Record<TemplateType, React.FC> = {
  gmail: GmailForm,
  twitter: TwitterForm,
};

// export const TemplateFormComponent: Record<TemplateType, any> = {
//   gmail: dynamic(() => import("./Gmail/Form"), { ssr: false }),
//   twitter: dynamic(() => import("./Twitter/Form")
// };

export const TemplateFormComponentPath: Record<TemplateType, string> = {
  gmail: "./Gmail/Form",
  twitter: "./Twitter/Form",
};
