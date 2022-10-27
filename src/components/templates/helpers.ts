import { TemplateType } from "./const";

import GmailForm from "./Gmail/Form";
import TwitterForm from "./Twitter/Form";

export const TemplateFormComponent: Record<TemplateType, React.FC> = {
  gmail: GmailForm,
  twitter: TwitterForm,
};
