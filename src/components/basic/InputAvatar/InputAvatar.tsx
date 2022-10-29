/* eslint-disable @next/next/no-img-element */
import React from "react";
import cn from "clsx";
import InputText from "../InputText";
import Label from "../Label";
import Button from "../Button";

type InputAvatarElement = React.ElementRef<"input">;
type PrimitiveInputAvatarProps = React.ComponentPropsWithoutRef<"input">;
type InputAvatarProps = Omit<PrimitiveInputAvatarProps, "onChange"> & {
  defaultValue: string;
  value: string;
  onChange: (value: string) => void;
};

const NAME = "InputAvatar";

const InputAvatar = React.forwardRef<InputAvatarElement, InputAvatarProps>(
  ({ defaultValue, value, onChange, ...props }, forwardedRef) => {
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value);
    };

    const handleReset = () => {
      onChange(defaultValue);
    };

    return (
      <>
        <div className="flex items-center justify-center gap-2">
          <Label>
            <div
              className="cursor-pointer rounded-full border-2 border-dashed border-gray-600 p-1"
              tabIndex={0}
            >
              <div className="relative h-16 w-16 overflow-hidden rounded-full bg-gray-800">
                <img
                  className="absolute inset-0 object-cover"
                  src={value && value !== "" ? value : defaultValue}
                  alt="avatar"
                  title={
                    value !== defaultValue && !value?.startsWith("blob:")
                      ? value
                      : undefined
                  }
                />
              </div>
            </div>
            <input
              type="file"
              accept="image/png"
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                const url = URL.createObjectURL(file);
                onChange(url);
              }}
              className={cn("hidden", props.className)}
              ref={forwardedRef}
              {...props}
            />
          </Label>
          <div className="flex flex-col gap-2">
            <InputText
              id="avatar"
              size="sm"
              value={
                value !== defaultValue && !value?.startsWith("blob:")
                  ? value
                  : undefined
              }
              onChange={handleInputChange}
              placeholder="URL"
              title={
                value !== defaultValue && !value?.startsWith("blob:")
                  ? value
                  : undefined
              }
            />
            <Button
              variant="outline"
              size="sm"
              onClick={handleReset}
              disabled={value == defaultValue}
              title={value == defaultValue ? "Already set to default" : ""}
              center
            >
              Default
            </Button>
          </div>
        </div>
        <div className="mt-2 select-none text-xs text-gray-600">
          Upload image for avatar{" "}
          <i>
            (currently only <code>.PNG</code>)
          </i>
        </div>
      </>
    );
  }
);

InputAvatar.displayName = NAME;

export default InputAvatar;
