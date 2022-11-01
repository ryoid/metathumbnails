import { atom } from "jotai";

import { twitterAtom } from "./twitter";
import { gmailAtom } from "./gmail";
import { templateAtom } from "./template";

export const templateFormAtom = atom({
  gmail: gmailAtom,
  twitter: twitterAtom,
});

export { twitterAtom, gmailAtom, templateAtom };
