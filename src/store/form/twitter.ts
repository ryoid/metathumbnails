import { atom, WritableAtom } from "jotai";
import { dateToLocaleISOString, initalDate } from "../../utils/date";
import { atomWithLocalStorage, getInitialFormState } from "./util";

export const DEFAULT_AVATAR = "/twitter-avatar.jpg";

export type TwitterFormState = {
  from: string;
  username: string;
  avatar: string;
  platform?: string; // 'Twitter Web App' | 'Twitter for iPhone'
  date: string;
  body: string;
  verified: boolean;

  theme: string;

  retweets: number;
  quotes: number;
  likes: number;
};

export const InitialTwitterFormState: TwitterFormState = {
  from: "jack",
  username: "jack",
  avatar: DEFAULT_AVATAR,
  platform: "Twitter for iPhone",
  date: dateToLocaleISOString(initalDate()),
  verified: false,

  theme: "dark",

  retweets: 144,
  quotes: 491,
  likes: 2130,

  body: "Come to my office. Now.",
};

const PERSIST_KEY = "twitter-form";

export const getInitialValue = () =>
  getInitialFormState(PERSIST_KEY, InitialTwitterFormState);

export const twitterAtom = atomWithLocalStorage<TwitterFormState>(
  PERSIST_KEY,
  InitialTwitterFormState
);
