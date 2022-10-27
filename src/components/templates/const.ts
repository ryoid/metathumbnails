export const TemplateTypes = ["gmail", "twitter"] as const;

export type TemplateType = typeof TemplateTypes[number];
