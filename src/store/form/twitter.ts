import { atom, WritableAtom } from "jotai";

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
  avatar: "/twitter-avatar.jpg",
  platform: "Twitter for iPhone",
  date: (new Date().toISOString().split(".")[0] as string).slice(0, -3),
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
      return JSON.parse(item);
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
