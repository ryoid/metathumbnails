import { atom } from "jotai";

type GmailFormState = {
  from: string;
  to: string;
  avatar: string;
  time: string;
  time_ago: string;
  body: string;
  suggestions: string[];
};

export const InitialGmailFormState = {
  from: "Your Boss",
  to: "me",
  avatar: "https://thispersondoesnotexist.com/image",
  time: "11:34 AM",
  time_ago: "1 minute",
  body: "Come to my office. Now.",
  suggestions: ["Oh no...", "Am I getting"],
};

const isSSR = typeof window === "undefined";

const PERSIST_KEY = "gmail-form";

export const formAtom = atom<GmailFormState>(InitialGmailFormState);
