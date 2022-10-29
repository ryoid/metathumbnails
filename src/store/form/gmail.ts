import { atom, WritableAtom } from "jotai";
import { dateToLocaleISOString, initalDate } from "../../utils/date";

export const DEFAULT_AVATAR = "/twitter-avatar.jpg";

export type GmailFormState = {
  from: string;
  to: string;
  avatar: string;
  date: string;
  time_ago: string;
  body: string;
  suggestions: string[];

  theme: string;
};

export const InitialGmailFormState = {
  from: "Your Boss",
  to: "me",
  avatar: DEFAULT_AVATAR,
  date: dateToLocaleISOString(initalDate()),
  time_ago: "1 minute",
  body: "Come to my office. Now.",
  suggestions: ["Oh no...", "Am I getting"],

  theme: "light",
};

const isSSR = typeof window === "undefined";

const PERSIST_KEY = "gmail-form";

function atomWithLocalStorage<T>(key: string, initialValue: GmailFormState) {
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

export const gmailAtom = atomWithLocalStorage<GmailFormState>(
  PERSIST_KEY,
  InitialGmailFormState
);
