import { atomWithStorage } from "jotai/utils";

type GmailFormState = {
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
  avatar: "https://thispersondoesnotexist.com/image",
  time: "11:34 AM",
  time_ago: "1 minute",
  body: "Come to my office. Now.",
  suggestions: ["Oh no...", "Am I getting"],
};

// type FormState = GmailFormState & {
//   handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
//   set: (
//     key: keyof GmailFormState,
//     value: GmailFormState[keyof GmailFormState]
//   ) => void;
//   init: (by: GmailFormState) => void;
// };

export const gmailFormAtom = atomWithStorage<GmailFormState>(
  "gmail-form-" + new Date().toISOString(),
  InitialGmailFormState
);
