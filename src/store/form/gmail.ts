import { atom, WritableAtom } from "jotai";

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

function atomWithLocalStorage<T>(key: string, initialValue: GmailFormState) {
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

export const gmailAtom = atomWithLocalStorage<GmailFormState>(
  PERSIST_KEY,
  InitialGmailFormState
);
