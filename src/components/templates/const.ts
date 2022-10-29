export const TemplateTypes = ["gmail", "twitter"] as const;

export type TemplateType = typeof TemplateTypes[number];

export const DEFAULT_TEMPLATE = "twitter";

export const TemplateMeta: Record<
  TemplateType,
  {
    title: string;
    description: string;
  }
> = {
  gmail: {
    title: "Generate fake Gmail emails for YouTube Thumbnails",
    description:
      "Generate fake gmail emails youtube thumbnails. Meta Youtube Thumbnails",
  },
  twitter: {
    title: "Generate fake Twitter Tweets for YouTube Thumbnails",
    description:
      "Generate fake tweets for youtube thumbnails. Meta Youtube Thumbnails",
  },
};
