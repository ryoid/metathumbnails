import { atom } from "jotai";

export type GmailFormState = {
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
  avatar:
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fA%3D%3D&w=1000&q=80",
  time: "11:34 AM",
  time_ago: "1 minute",
  body: "Come to my office. Now.",
  suggestions: ["Oh no...", "Am I getting"],
};

const isSSR = typeof window === "undefined";

const PERSIST_KEY = "gmail-form";

export const formAtom = atom<GmailFormState>(InitialGmailFormState);
