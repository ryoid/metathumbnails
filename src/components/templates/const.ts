export const TemplateTypes = ["gmail", "twitter"] as const;

export type TemplateType = typeof TemplateTypes[number];

export const DEFAULT_TEMPLATE = "twitter";
