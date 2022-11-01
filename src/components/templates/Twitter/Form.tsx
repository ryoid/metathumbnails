import React from "react";
import cn from "clsx";
import { useAtom } from "jotai";

import {
  Button,
  FormControl,
  InputAvatar,
  InputText,
  InputTip,
  Label,
  Textarea,
  ToggleHide,
} from "../../basic";
import { RandomIcon } from "../../icons";
import { randomInt } from "../../../utils/random";
import {
  getInitialValue,
  templateAtom,
  InitialTemplateFormState,
  DEFAULT_AVATAR,
} from "../../../store/form/template";

type TwitterFormElement = React.ElementRef<"form">;
type PrimitiveTwitterFormProps = React.ComponentPropsWithoutRef<"form">;
type TwitterFormProps = PrimitiveTwitterFormProps;

const TwitterForm = React.forwardRef<TwitterFormElement, TwitterFormProps>(
  (props, forwardedRef) => {
    const [f, setForm] = useAtom(templateAtom);

    React.useEffect(() => {
      if (typeof window !== undefined) {
        setForm(getInitialValue());
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleInputChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      setForm((s) => ({ ...s, [e.target.id]: e.target.value }));
    };

    return (
      <form
        {...props}
        className={cn(
          "mx-auto xl:max-w-lg [&_.form-control]:mb-4",
          props.className
        )}
        ref={forwardedRef}
      >
        <h3 className="mt-2 mb-3 inline-flex select-none rounded bg-pink-900/20 px-1.5 text-lg font-medium text-white/90">
          Template
        </h3>
        <div className="mb-2">
          <label
            htmlFor="theme"
            className="flex w-full cursor-pointer items-center justify-between gap-2 rounded-full border border-gray-800 px-2 py-2 lg:gap-1"
          >
            <span className="ml-2 text-sm font-medium">Dark Mode</span>

            <div className="relative">
              <input
                type="checkbox"
                id="theme"
                checked={f.theme == "dark"}
                value={f.theme == "dark" ? "light" : "dark"}
                className="peer sr-only"
                onChange={handleInputChange}
              ></input>
              <div className="peer h-6 w-11 rounded-full bg-gray-800 ring-1 ring-inset ring-white/5 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-gray-200 after:transition-all after:content-[''] peer-checked:bg-indigo-700 peer-checked:ring-indigo-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-hover:bg-gray-700 peer-hover:ring-gray-500 peer-hover:after:bg-white peer-hover:peer-checked:bg-indigo-600 peer-checked:peer-hover:ring-indigo-300 peer-focus:outline "></div>
            </div>
          </label>
        </div>
        <h3 className="mt-2 mb-3 inline-flex select-none rounded bg-green-900/20 px-1.5 text-lg font-medium text-white/90">
          Details
        </h3>
        <div className="grid grid-cols-3 gap-2">
          <div className="order-3 col-span-3 grid gap-2 md:order-1 md:col-span-2">
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

          <div className="order-2 col-span-3 md:col-span-1">
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
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
          <FormControl>
            <div className="flex items-center justify-between">
              <Label htmlFor="date">Date</Label>
              <ToggleHide
                id="disabled.date"
                size="xs"
                title={`${!!f.disabled.date ? "Show" : "Hide"}`}
                checked={!!f.disabled.date}
                onChange={() => {
                  setForm((s) => ({
                    ...s,
                    disabled: {
                      ...s.disabled,
                      date: !s.disabled.date,
                    },
                  }));
                }}
              />
            </div>
            <InputText
              id="date"
              disabled={!!f.disabled.date}
              value={f.date}
              type="datetime-local"
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl className="relative">
            <div className="flex items-center justify-between">
              <Label htmlFor="platform">Device</Label>
              <ToggleHide
                id="disabled.platform"
                size="xs"
                title={`${!!f.disabled.platform ? "Show" : "Hide"}`}
                checked={!!f.disabled.platform}
                onChange={() => {
                  setForm((s) => ({
                    ...s,
                    disabled: {
                      ...s.disabled,
                      platform: !s.disabled.platform,
                    },
                  }));
                }}
              />
            </div>
            <div>
              <InputText
                id="platform"
                disabled={!!f.disabled.platform}
                value={f.platform}
                onChange={handleInputChange}
                autoComplete="off"
              />
              <InputTip
                description="Twitter Web App, Twitter for iPhone"
                disabled={!!f.disabled.platform}
              >
                <Button
                  variant="outline"
                  onClick={(e) => {
                    setForm((s) => ({
                      ...s,
                      platform: "Twitter Web App",
                    }));
                    e.currentTarget.blur();
                  }}
                >
                  Website
                </Button>
                <Button
                  variant="outline"
                  onClick={(e) => {
                    setForm((s) => ({
                      ...s,
                      platform: "Twitter for iPhone",
                    }));
                    e.currentTarget.blur();
                  }}
                >
                  iPhone
                </Button>
              </InputTip>
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
            <FormControl className="relative">
              <div className="flex items-center justify-between">
                <Label htmlFor="retweets">Retweets</Label>
                <ToggleHide
                  id="disabled.retweets"
                  size="xs"
                  title={`${!!f.disabled.retweets ? "Show" : "Hide"}`}
                  checked={!!f.disabled.retweets}
                  onChange={() => {
                    setForm((s) => ({
                      ...s,
                      disabled: {
                        ...s.disabled,
                        retweets: !s.disabled.retweets,
                      },
                    }));
                  }}
                />
              </div>
              <div>
                <InputText
                  id="retweets"
                  disabled={!!f.disabled.retweets}
                  value={f.retweets}
                  onChange={handleInputChange}
                  type="number"
                />
                <InputTip disabled={!!f.disabled.retweets}>
                  <Button
                    variant="outline"
                    onClick={(e) => {
                      setForm((s) => ({
                        ...s,
                        retweets: randomInt(1, 250000),
                      }));
                      e.currentTarget.blur();
                    }}
                  >
                    <RandomIcon /> Randomize
                  </Button>
                </InputTip>
              </div>
            </FormControl>
            <FormControl className="relative">
              <div className="flex items-center justify-between">
                <Label htmlFor="quotes">Quotes</Label>
                <ToggleHide
                  id="disabled.quotes"
                  size="xs"
                  title={`${!!f.disabled.quotes ? "Show" : "Hide"}`}
                  checked={!!f.disabled.quotes}
                  onChange={() => {
                    setForm((s) => ({
                      ...s,
                      disabled: {
                        ...s.disabled,
                        quotes: !s.disabled.quotes,
                      },
                    }));
                  }}
                />
              </div>
              <div>
                <InputText
                  id="quotes"
                  disabled={!!f.disabled.quotes}
                  value={f.quotes}
                  onChange={handleInputChange}
                  type="number"
                />
                <InputTip disabled={!!f.disabled.quotes}>
                  <Button
                    variant="outline"
                    onClick={(e) => {
                      setForm((s) => ({
                        ...s,
                        quotes: randomInt(1, 250000),
                      }));
                      e.currentTarget.blur();
                    }}
                  >
                    <RandomIcon /> Randomize
                  </Button>
                </InputTip>
              </div>
            </FormControl>
            <FormControl className="relative">
              <div className="flex items-center justify-between">
                <Label htmlFor="likes">Likes</Label>
                <ToggleHide
                  id="disabled.likes"
                  size="xs"
                  title={`${!!f.disabled.likes ? "Show" : "Hide"}`}
                  checked={!!f.disabled.likes}
                  onChange={() => {
                    setForm((s) => ({
                      ...s,
                      disabled: {
                        ...s.disabled,
                        likes: !s.disabled.likes,
                      },
                    }));
                  }}
                />
              </div>
              <div>
                <InputText
                  id="likes"
                  disabled={!!f.disabled.likes}
                  value={f.likes}
                  onChange={handleInputChange}
                  type="number"
                  max={1e6}
                />
                <InputTip disabled={!!f.disabled.likes}>
                  <Button
                    variant="outline"
                    onClick={(e) => {
                      setForm((s) => ({
                        ...s,
                        likes: randomInt(1, 250000),
                      }));
                      e.currentTarget.blur();
                    }}
                  >
                    <RandomIcon /> Randomize
                  </Button>
                </InputTip>
              </div>
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
            setForm({
              ...InitialTemplateFormState,
              ssr: false,
            });
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
