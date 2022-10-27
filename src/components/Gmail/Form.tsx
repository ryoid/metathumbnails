import React from "react";
import cn from "clsx";
import { useAtom } from "jotai";

import {
  FormControl,
  InputText,
  Label,
  SuggestionPill,
  Textarea,
} from "../basic";
import InputTag from "../basic/InputTag";
import { gmailAtom } from "../../store/form";

type GmailFormElement = React.ElementRef<"form">;
type PrimitiveGmailFormProps = React.ComponentPropsWithoutRef<"form">;
type GmailFormProps = PrimitiveGmailFormProps;

const GmailForm: React.FC<GmailFormProps> = (props) => {
  const [f, setForm] = useAtom(gmailAtom);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((s) => ({ ...s, [e.target.id]: e.target.value }));
  };

  return (
    <form
      {...props}
      className={cn("max-w-lg  [&_.form-control]:mb-4", props.className)}
    >
      <h3 className="mt-2 mb-3 inline-flex select-none rounded bg-green-900/20 px-1.5 text-lg font-medium text-white/90">
        Details
      </h3>
      <div className="grid grid-cols-3 gap-2">
        <FormControl className="col-span-2">
          <Label htmlFor="from">From</Label>
          <InputText id="from" value={f.from} onChange={handleInputChange} />
        </FormControl>

        <FormControl>
          <Label htmlFor="avatar">Avatar</Label>
          <InputText
            id="avatar"
            value={f.avatar}
            onChange={handleInputChange}
          />
        </FormControl>
        <FormControl className="col-span-2">
          <Label htmlFor="to">To</Label>
          <InputText id="to" value={f.to} onChange={handleInputChange} />
        </FormControl>
      </div>

      <hr className="my-4 border-gray-800" />

      <h3 className="mt-2 mb-3 inline-flex select-none rounded bg-purple-900/20 px-1.5 text-lg font-medium text-white/90">
        When
      </h3>
      <div className="flex gap-2">
        <FormControl>
          <Label htmlFor="time">Time</Label>
          <InputText id="time" value={f.time} onChange={handleInputChange} />
        </FormControl>
        <FormControl>
          <Label htmlFor="time_ago">How long ago</Label>
          <InputText
            id="time_ago"
            value={f.time_ago}
            onChange={handleInputChange}
          />
        </FormControl>
      </div>

      <hr className="my-4 border-gray-800" />

      <h3 className="mt-2 mb-3 inline-flex select-none rounded bg-blue-900/20 px-1.5 text-lg font-medium text-white/90">
        Email
      </h3>

      <div className="flex flex-col gap-2">
        <FormControl>
          <Label htmlFor="body">Words</Label>
          <Textarea
            id="body"
            value={f.body}
            rows={8}
            onChange={handleInputChange}
          />
        </FormControl>

        <FormControl>
          <Label htmlFor="suggestions">Suggestion Pills</Label>
          <InputTag
            id="suggestions"
            placeholder="Add a suggestion"
            defaultValue={f.suggestions}
            tag={SuggestionPill}
            tagCn="text-blue-500"
            onChange={(values) => {
              setForm((s) => ({
                ...s,
                suggestions: values.map((v) => v.value),
              }));
            }}
          />
        </FormControl>
      </div>
    </form>
  );
};

export default GmailForm;
