const Colors = ["gray", "indigo"] as const;

export type Color = typeof Colors[number];
