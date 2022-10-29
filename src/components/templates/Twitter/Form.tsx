import React from "react";
import cn from "clsx";
import { useAtom } from "jotai";

import {
  Button,
  FormControl,
  InputAvatar,
  InputText,
  Label,
  Textarea,
} from "../../basic";
import { RandomIcon } from "../../icons";
import { randomInt } from "../../../utils/random";
import { twitterAtom } from "../../../store/form";
import {
  InitialTwitterFormState,
  DEFAULT_AVATAR,
} from "../../../store/form/twitter";

type TwitterFormElement = React.ElementRef<"form">;
type PrimitiveTwitterFormProps = React.ComponentPropsWithoutRef<"form">;
type TwitterFormProps = PrimitiveTwitterFormProps;

const TwitterForm = React.forwardRef<TwitterFormElement, TwitterFormProps>(
  (props, forwardedRef) => {
    const [f, setForm] = useAtom(twitterAtom);

    const handleInputChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      setForm((s) => ({ ...s, [e.target.id]: e.target.value }));
    };

    return (
      <form
        {...props}
        className={cn("max-w-lg  [&_.form-control]:mb-4", props.className)}
        ref={forwardedRef}
      >
        <h3 className="mt-2 mb-3 inline-flex select-none rounded bg-pink-900/20 px-1.5 text-lg font-medium text-white/90">
          Template
        </h3>
        <div>
          <label
            htmlFor="theme"
            className="relative inline-flex cursor-pointer items-center"
          >
            <input
              type="checkbox"
              id="theme"
              checked={f.theme == "dark"}
              value={f.theme == "dark" ? "light" : "dark"}
              className="peer sr-only"
              onChange={handleInputChange}
            ></input>
            <div className="peer h-6 w-11 rounded-full bg-gray-800 ring-1 ring-inset ring-white/5 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-gray-200 after:transition-all after:content-[''] peer-checked:bg-indigo-700 peer-checked:ring-indigo-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-hover:bg-gray-700 peer-hover:ring-gray-500 peer-hover:after:bg-white peer-hover:peer-checked:bg-indigo-600 peer-checked:peer-hover:ring-indigo-300 peer-focus:outline "></div>
            <span className="ml-3 text-sm font-medium ">Dark Mode</span>
          </label>
        </div>
        <h3 className="mt-2 mb-3 inline-flex select-none rounded bg-green-900/20 px-1.5 text-lg font-medium text-white/90">
          Details
        </h3>
        <div className="grid grid-cols-3 gap-2">
          <div className="col-span-2 grid gap-2">
            <FormControl>
              <Label htmlFor="from">Name</Label>
              <InputText
                id="from"
                value={f.from}
                onChange={handleInputChange}
              />
            </FormControl>

            <FormControl>
              <Label htmlFor="username">Twitter handle</Label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex select-none items-center pl-4 text-sm text-gray-500">
                  <span className="-mt-0.5">@</span>
                </div>
                <InputText
                  id="username"
                  value={f.username}
                  onChange={handleInputChange}
                  className="pl-8"
                />
              </div>
            </FormControl>
          </div>

          <div>
            <FormControl>
              <InputAvatar
                id="avatar"
                value={f.avatar}
                onChange={(v) => {
                  setForm((s) => ({ ...s, avatar: v }));
                }}
                defaultValue={DEFAULT_AVATAR}
              />
            </FormControl>
          </div>
        </div>
        <hr className="my-5 border-gray-800" />
        <h3 className="mt-2 mb-3 inline-flex select-none rounded bg-purple-900/20 px-1.5 text-lg font-medium text-white/90">
          When
        </h3>
        <div className="flex gap-2">
          <FormControl>
            <Label htmlFor="date">Date</Label>
            <InputText
              id="date"
              value={f.date}
              type="datetime-local"
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl className="relative">
            <Label htmlFor="platform">Device</Label>
            <div>
              <InputText
                id="platform"
                value={f.platform}
                onChange={handleInputChange}
                autoComplete="off"
              />
              <div className="absolute mt-2 rounded border border-white/5 bg-gray-900 px-2 py-1.5 text-xs text-gray-400 opacity-0 transition-opacity group-focus-within:opacity-100">
                <div className="mb-2 flex gap-2">
                  <Button
                    variant="outline"
                    onClick={(e) => {
                      handleInputChange({
                        target: { value: "Twitter Web App", id: "platform" },
                      } as any);
                      e.currentTarget.blur();
                    }}
                  >
                    Website
                  </Button>
                  <Button
                    variant="outline"
                    onClick={(e) => {
                      handleInputChange({
                        target: { value: "Twitter for iPhone", id: "platform" },
                      } as any);
                      e.currentTarget.blur();
                    }}
                  >
                    iPhone
                  </Button>
                </div>
                <span className="italic">{`Twitter Web App, Twitter for iPhone`}</span>
              </div>
            </div>
          </FormControl>
        </div>
        <hr className="my-5 border-gray-800" />
        <h3 className="mt-2 mb-3 inline-flex select-none rounded bg-blue-900/20 px-1.5 text-lg font-medium text-white/90">
          Tweet
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

          <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
            <FormControl>
              <Label htmlFor="retweets">Retweets</Label>
              <InputText
                id="retweets"
                value={f.retweets}
                onChange={handleInputChange}
                type="number"
              />
            </FormControl>
            <FormControl>
              <Label htmlFor="quotes">Quotes</Label>
              <InputText
                id="quotes"
                value={f.quotes}
                onChange={handleInputChange}
                type="number"
              />
            </FormControl>
            <FormControl>
              <Label htmlFor="likes">Likes</Label>
              <InputText
                id="likes"
                value={f.likes}
                onChange={handleInputChange}
                type="number"
                max={1e6}
              />
            </FormControl>
          </div>

          <div>
            <Button
              variant="outline"
              onClick={() => {
                setForm((s) => ({
                  ...s,
                  retweets: randomInt(1, 100000),
                  quotes: randomInt(1, 10000),
                  likes: randomInt(1, 250000),
                }));
              }}
            >
              <RandomIcon /> Randomize numbers
            </Button>
          </div>
        </div>
        <hr className="mt-12 mb-4 border-gray-800" />
        <Button
          onClick={() => {
            setForm(InitialTwitterFormState);
          }}
        >
          Reset Config
        </Button>
      </form>
    );
  }
);

TwitterForm.displayName = "TwitterForm";

export default TwitterForm;
