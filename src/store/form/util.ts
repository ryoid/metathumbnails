import { atom, WritableAtom } from "jotai";

export type FormState = {
  version: number;
};

const isSSR = typeof window === "undefined";

export function getInitialFormState<T>(key: string, initialValue: T) {
  if (isSSR) return initialValue;
  const item = localStorage.getItem(key);
  if (item !== null) {
    const data = JSON.parse(item);
    if (
      !data ||
      (data as FormState).version != (initialValue as FormState).version
    )
      return initialValue;
    if (data.avatar?.startsWith("blob:")) {
      data.avatar = undefined;
    }
    return data;
  }
  return initialValue;
}

export function atomWithLocalStorage<T>(key: string, initialValue: T) {
  const baseAtom = atom<T>(initialValue);
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
