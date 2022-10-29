import { atom, WritableAtom } from "jotai";
import { dateToLocaleISOString, initalDate } from "../../utils/date";

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

const isSSR = typeof window === "undefined";

const PERSIST_KEY = "twitter-form";

function atomWithLocalStorage<T>(key: string, initialValue: TwitterFormState) {
  const getInitialValue = () => {
    if (isSSR) return initialValue;
    const item = localStorage.getItem(key);
    if (item !== null) {
      const data = JSON.parse(item);
      if (data.avatar?.startsWith("blob:")) {
        data.avatar = undefined;
      }
      return data;
    }
    return initialValue;
  };
  const baseAtom = atom<T>(getInitialValue());
  const derivedAtom = atom(
    (get) => get(baseAtom),
    (get, set, update: ((s: T) => T) | T) => {
      const nextValue =
        typeof update === "function"
          ? (update as (s: T) => T)(get(baseAtom))
          : update;
      set(baseAtom as WritableAtom<T, T, void | Promise<void>>, nextValue);
      localStorage.setItem(key, JSON.stringify(nextValue));
    }
  );
  return derivedAtom;
}

export const twitterAtom = atomWithLocalStorage<TwitterFormState>(
  PERSIST_KEY,
  InitialTwitterFormState
);
