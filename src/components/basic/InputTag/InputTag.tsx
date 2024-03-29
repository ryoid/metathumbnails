import React from "react";
import hyperid from "hyperid";
import cn from "clsx";
import SuggestionPill from "../SuggestionPill";

type InputTagElement = React.ElementRef<"input">;
type PrimitiveInputTagProps = React.ComponentPropsWithoutRef<"input">;

type InputTagValue = { id: string; value: string };

type InputTagProps = Omit<
  PrimitiveInputTagProps,
  "defaultValue" | "onChange"
> & {
  defaultValue?: string[] | InputTagValue[];
  tag?: typeof SuggestionPill;
  tagCn?: string;
  onChange?: (values: InputTagValue[]) => void;
};

const NAME = "InputTag";
const TagContainerCn = "mt-1.5 flex flex-wrap gap-1.5";

const instance = hyperid();

const formatDefaultValue = (
  value: InputTagProps["defaultValue"]
): InputTagValue[] => {
  if (!value) return [];

  const first = value?.[0];
  if (typeof first === "string") {
    return (value as string[]).map((v) => ({ id: instance(), value: v }));
  }
  return value as InputTagValue[];
};

const InputTag = React.forwardRef<InputTagElement, InputTagProps>(
  (
    { tag, tagCn, defaultValue, disabled, onChange, ...props },
    forwardedRef
  ) => {
    const innerRef = React.useRef<InputTagElement>(null);
    const [tags, setTags] = React.useState<InputTagValue[]>(
      formatDefaultValue(defaultValue)
    );

    React.useImperativeHandle(
      forwardedRef,
      () => innerRef.current as InputTagElement
    );

    const TagComponent = tag ? tag : "div";

    const handleKeyDown = (event: React.KeyboardEvent) => {
      if (
        event.key === "Enter" &&
        innerRef.current &&
        innerRef.current.value.length > 0
      ) {
        const value = innerRef.current.value;
        // Reset value
        innerRef.current.value = "";
        setTags((currentTags) => {
          const newTags = [
            ...currentTags,
            {
              id: instance(),
              value,
            },
          ];
          onChange?.(newTags);
          return newTags;
        });
      }
    };

    const handleRemove = (id: string) => {
      const newTags = tags.filter((tag) => tag.id !== id);
      if (newTags.length !== tags.length) {
        setTags(newTags);
        onChange?.(newTags);
      }
    };

    return (
      <>
        <input
          {...props}
          className={cn(
            "group flex h-auto w-full items-center justify-center rounded-lg py-2.5 pl-4 pr-3.5 text-sm ring-1 ring-inset",
            {
              "bg-gray-800/75 text-gray-100 ring-white/5 hover:bg-gray-700/40 hover:ring-gray-500":
                !disabled,
              "cursor-not-allowed bg-gray-800/20 text-gray-500 ring-white/5":
                disabled,
            },
            props.className
          )}
          ref={innerRef}
          onKeyDown={handleKeyDown}
          disabled={disabled}
        />
        <div className={TagContainerCn}>
          {tags.map((tag) => (
            <TagComponent
              className={cn(tagCn, "select-none")}
              key={`${props.id}-${tag.id}`}
              onRemove={handleRemove.bind(this, tag.id)}
            >
              {tag.value}
            </TagComponent>
          ))}
        </div>
      </>
    );
  }
);

InputTag.displayName = NAME;

export default InputTag;
