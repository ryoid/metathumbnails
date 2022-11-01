import React from "react";
import cn from "clsx";
import { useAtom } from "jotai";

import {
  Button,
  FormControl,
  InputText,
  Label,
  SuggestionPill,
  Textarea,
  InputTag,
  InputAvatar,
  InputTip,
  ToggleHide,
} from "../../basic";
import { debounce } from "../../../utils/debounce";
import {
  getInitialValue,
  templateAtom,
  InitialTemplateFormState,
  DEFAULT_AVATAR,
} from "../../../store/form/template";

type GmailFormElement = React.ElementRef<"form">;
type PrimitiveGmailFormProps = React.ComponentPropsWithoutRef<"form">;
type GmailFormProps = PrimitiveGmailFormProps;

const GmailForm = React.forwardRef<GmailFormElement, GmailFormProps>(
  (props, forwardedRef) => {
    const [f, setForm] = useAtom(templateAtom);
    const fromFontSizeRef = React.useRef<HTMLInputElement>(null);

    React.useEffect(() => {
      if (typeof window !== undefined) {
        const initial = getInitialValue();
        setForm(initial);
        if (fromFontSizeRef.current) {
          fromFontSizeRef.current.value = initial.fromFontSize;
        }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleInputChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      console.log("handleInputChange", e.target.value);

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
        <div className="mb-2 flex flex-col gap-3 lg:grid lg:grid-cols-3">
          <FormControl className="col-span-2">
            <Label htmlFor="from" className="mb-2">
              From Font Size
              <span className="text-gray-500">
                {" - "}
                {f.fromSize} px
              </span>
            </Label>
            <input
              id="fromSize"
              type="range"
              onChange={debounce(handleInputChange, 200)}
              className="range w-full"
              min={60}
              max={150}
              title={f.fromSize + "px"}
            />
          </FormControl>
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
              <Label htmlFor="from">From</Label>
              <InputText
                id="from"
                value={f.from}
                onChange={handleInputChange}
                disabled={!!f.disabled.from}
              />
            </FormControl>

            <FormControl>
              <Label htmlFor="to">To</Label>
              <InputText id="to" value={f.to} onChange={handleInputChange} />
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
              type="datetime-local"
              value={f.date}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl>
            <div className="flex items-center justify-between">
              <Label htmlFor="time_ago">How long ago</Label>
              <ToggleHide
                id="disabled.time_ago"
                size="xs"
                title={`${!!f.disabled.time_ago ? "Show" : "Hide"}`}
                checked={!!f.disabled.time_ago}
                onChange={() => {
                  setForm((s) => ({
                    ...s,
                    disabled: {
                      ...s.disabled,
                      time_ago: !s.disabled.time_ago,
                    },
                  }));
                }}
              />
            </div>
            <div>
              <InputText
                id="time_ago"
                disabled={!!f.disabled.time_ago}
                value={f.time_ago}
                onChange={handleInputChange}
                placeholder="Leave blank to use date"
                autoComplete="off"
              />
              <InputTip
                description="Leave blank to use relative date"
                disabled={!!f.disabled.time_ago}
              >
                <Button
                  variant="outline"
                  onClick={(e) => {
                    setForm((s) => ({
                      ...s,
                      time_ago: "",
                    }));
                    e.currentTarget.blur();
                  }}
                >
                  Relative
                </Button>
                <Button
                  variant="outline"
                  onClick={(e) => {
                    setForm((s) => ({
                      ...s,
                      time_ago: "1 minute",
                    }));
                    e.currentTarget.blur();
                  }}
                >
                  1 Minute
                </Button>
              </InputTip>
            </div>
          </FormControl>
        </div>

        <hr className="my-5 border-gray-800" />

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

          <FormControl className="w-full">
            <div className="flex items-center justify-between">
              <Label htmlFor="suggestions">Suggestion Pills</Label>
              <ToggleHide
                id="disabled.suggestions"
                size="xs"
                title={`${!!f.disabled.suggestions ? "Show" : "Hide"}`}
                checked={!!f.disabled.suggestions}
                onChange={() => {
                  setForm((s) => ({
                    ...s,
                    disabled: {
                      ...s.disabled,
                      suggestions: !s.disabled.suggestions,
                    },
                  }));
                }}
              />
            </div>
            <InputTag
              id="suggestions"
              disabled={!!f.disabled.suggestions}
              placeholder="Add a suggestion"
              autoComplete="off"
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

GmailForm.displayName = "GmailForm";

export default GmailForm;
