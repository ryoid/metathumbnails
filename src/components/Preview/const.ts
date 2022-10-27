export const TemplateTypes = ["gmail"] as const;

export type TemplateType = typeof TemplateTypes[number];
