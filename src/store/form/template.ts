import { dateToLocaleISOString, initalDate } from "../../utils/date";
import {
  atomWithLocalStorage,
  FormState,
  getInitialFormState,
  isSSR,
} from "./util";

export const DEFAULT_AVATAR = "/twitter-avatar.jpg";

type FormStateInputs = {
  from: string;
  to: string;
  avatar: string;
  date: string;
  time_ago: string;
  body: string;

  // Twitter
  username: string;
  platform: string;
  retweets: number;
  quotes: number;
  likes: number;

  // Gmail
  suggestions: string[];

  theme: string;

  fromSize: number;
};

export type TemplateFormState = FormState &
  FormStateInputs & {
    disabled: Record<keyof FormStateInputs, boolean>;
  };

const InitialFormStateInputs = {
  version: 0,

  from: "Your Boss",
  to: "me",
  avatar: DEFAULT_AVATAR,
  date: dateToLocaleISOString(initalDate()),
  time_ago: "1 minute",
  body: "Come to my office. Now.",

  // Twitter
  username: "boss",
  platform: "Twitter for iPhone",
  retweets: 144,
  quotes: 491,
  likes: 2130,

  // Gmail
  suggestions: ["Oh no...", "Am I getting"],

  theme: "light",
  fromSize: 120,

  ssr: isSSR,
};

export const InitialTemplateFormState: TemplateFormState = {
  version: 0,

  from: "Your Boss",
  to: "me",
  avatar: DEFAULT_AVATAR,
  date: dateToLocaleISOString(initalDate()),
  time_ago: "1 minute",
  body: "Come to my office. Now.",

  // Twitter
  username: "boss",
  platform: "Twitter for iPhone",
  retweets: 144,
  quotes: 491,
  likes: 2130,

  // Gmail
  suggestions: ["Oh no...", "Am I getting"],

  theme: "light",
  fromSize: 120,
  ssr: isSSR,

  disabled: Object.keys(InitialFormStateInputs).reduce((acc, key) => {
    acc[key] = false;
    return acc;
  }, {} as any),
};

const PERSIST_KEY = "template-form";

export const getInitialValue = () =>
  getInitialFormState(PERSIST_KEY, InitialTemplateFormState);

export const templateAtom = atomWithLocalStorage<TemplateFormState>(
  PERSIST_KEY,
  InitialTemplateFormState
);
