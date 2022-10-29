import { dateToLocaleISOString, initalDate } from "../../utils/date";
import { atomWithLocalStorage, FormState, getInitialFormState } from "./util";

export const DEFAULT_AVATAR = "/twitter-avatar.jpg";

export type GmailFormState = FormState & {
  from: string;
  to: string;
  avatar: string;
  date: string;
  time_ago: string;
  body: string;
  suggestions: string[];

  theme: string;

  fromSize: number;
};

export const InitialGmailFormState = {
  version: 0,

  from: "Your Boss",
  to: "me",
  avatar: DEFAULT_AVATAR,
  date: dateToLocaleISOString(initalDate()),
  time_ago: "1 minute",
  body: "Come to my office. Now.",
  suggestions: ["Oh no...", "Am I getting"],

  theme: "light",
  fromSize: 120,
};

const PERSIST_KEY = "gmail-form";

export const getInitialValue = () =>
  getInitialFormState(PERSIST_KEY, InitialGmailFormState);

export const gmailAtom = atomWithLocalStorage<GmailFormState>(
  PERSIST_KEY,
  InitialGmailFormState
);
