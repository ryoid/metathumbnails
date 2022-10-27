import { atom } from "jotai";

import { twitterAtom } from "./twitter";
import { gmailAtom } from "./gmail";

export const templateFormAtom = atom({
  gmail: gmailAtom,
  twitter: twitterAtom,
});

export { twitterAtom, gmailAtom };
