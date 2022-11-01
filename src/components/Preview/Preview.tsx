/* eslint-disable @next/next/no-img-element */
import React from "react";
import cn from "clsx";
import { useAtom } from "jotai";
import { createIntlSegmenterPolyfill } from "intl-segmenter-polyfill";

import { useDebounce } from "../../utils/debounce";
import { loadEmoji, getIconCode, apis } from "../../utils/twemoji";
import { Button, Skeleton } from "../basic";

import { TemplateType, TemplateRenderer } from "../templates";
import { toast } from "react-hot-toast";
import { CopyIcon } from "../icons";
import { templateAtom } from "../../store/form";

// @TODO: Support font style and weights, and make this option extensible rather
// than built-in.
// @TODO: Cover most languages with Noto Sans.
const languageFontMap = {
  zh: "Noto+Sans+SC",
  ja: "Noto+Sans+JP",
  ko: "Noto+Sans+KR",
  th: "Noto+Sans+Thai",
  he: "Noto+Sans+Hebrew",
  ar: "Noto+Sans+Arabic",
  bn: "Noto+Sans+Bengali",
  ta: "Noto+Sans+Tamil",
  te: "Noto+Sans+Telugu",
  ml: "Noto+Sans+Malayalam",
  devanagari: "Noto+Sans+Devanagari",
  unknown: "Noto+Sans",
};

async function init() {
  if (typeof window === "undefined") return [];

  const [font, fontBold, fontIcon, pFont, pFontSemiBold, pFontBold, Segmenter] =
    window.__resource ||
    (window.__resource = await Promise.all([
      fetch("/inter-latin-ext-400-normal.woff").then((res) =>
        res.arrayBuffer()
      ),
      fetch("/inter-latin-ext-700-normal.woff").then((res) =>
        res.arrayBuffer()
      ),
      fetch("/material-icons-base-400-normal.woff").then((res) =>
        res.arrayBuffer()
      ),
      fetch("/api/font?font=Plus+Jakarta+Sans&weights=400").then((res) =>
        res.arrayBuffer()
      ),
      fetch("/api/font?font=Plus+Jakarta+Sans&weights=600").then((res) =>
        res.arrayBuffer()
      ),
      fetch("/api/font?font=Plus+Jakarta+Sans&weights=700").then((res) =>
        res.arrayBuffer()
      ),
      !globalThis.Intl || !globalThis.Intl.Segmenter
        ? createIntlSegmenterPolyfill(fetch("/break_iterator.wasm"))
        : null,
    ]));

  if (Segmenter) {
    globalThis.Intl = globalThis.Intl || {};
    //@ts-expect-error TODO: not sure why
    globalThis.Intl.Segmenter = Segmenter;
  }

  return [
    {
      name: "Inter",
      data: font,
      weight: 400,
      style: "normal",
    },
    {
      name: "Inter",
      data: font,
      weight: 500,
      style: "normal",
    },
    {
      name: "Inter",
      data: fontBold,
      weight: 700,
      style: "normal",
    },
    {
      name: "Material Icons",
      data: fontIcon,
      weight: 400,
      style: "normal",
    },
    {
      name: "Plus Jakarta Sans",
      data: pFont,
      weight: 400,
      style: "normal",
    },
    {
      name: "Plus Jakarta Sans",
      data: pFontSemiBold,
      weight: 600,
      style: "normal",
    },
    {
      name: "Plus Jakarta Sans",
      data: pFontBold,
      weight: 700,
      style: "normal",
    },
  ];
}

function withCache(fn: any) {
  const cache = new Map();
  return async (...args: string[]) => {
    const key = args.join("|");
    if (cache.has(key)) return cache.get(key);
    const result = await fn(...args);
    cache.set(key, result);
    return result;
  };
}

type LanguageCode = keyof typeof languageFontMap | "emoji";

const loadDynamicAsset = withCache(
  async (emojiType: keyof typeof apis, code: LanguageCode, text: string) => {
    if (code === "emoji") {
      // It's an emoji, load the image.
      return (
        `data:image/svg+xml;base64,` +
        btoa(await loadEmoji(emojiType, getIconCode(text)))
      );
    }
    console.log("load font code", code);

    // Try to load from Google Fonts.
    if (!languageFontMap[code]) code = "unknown";

    try {
      const font = await (
        await fetch(
          `/api/font?font=${encodeURIComponent(
            languageFontMap[code]
          )}&text=${encodeURIComponent(text)}`
        )
      ).arrayBuffer();

      if (font) {
        return {
          name: `satori_${code}_fallback_${text}`,
          data: font,
          weight: 400,
          style: "normal",
        };
      }
    } catch (e) {
      console.error("Failed to load dynamic font for", text, ". Error:", e);
    }
  }
);

// https://raw.githubusercontent.com/n3r4zzurr0/svg-spinners/main/svg-smil/180-ring.svg
const spinner = (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    style={{
      position: "absolute",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      margin: "auto",
      fill: "white",
      zIndex: 1,
    }}
  >
    <path d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z">
      <animateTransform
        attributeName="transform"
        type="rotate"
        dur="0.75s"
        values="0 12 12;360 12 12"
        repeatCount="indefinite"
      />
    </path>
  </svg>
);

function initResvgWorker() {
  if (typeof window === "undefined") return;

  const worker = new Worker(new URL("../resvg_worker.ts", import.meta.url));

  const pending = new Map();
  worker.onmessage = (e) => {
    const resolve = pending.get(e.data._id);
    if (resolve) {
      resolve(e.data);
      pending.delete(e.data._id);
    }
  };

  return async (msg: { svg: string; width: number }) => {
    const _id = Math.random();
    worker.postMessage({
      ...msg,
      _id,
    });
    return new Promise<{ url: string; blob: any }>((resolve) => {
      pending.set(_id, resolve);
    });
  };
}

const loadFonts = init();
const renderPNG = initResvgWorker();

type PreviewElement = React.ElementRef<"div">;
type PrimitivePreviewProps = React.ComponentPropsWithoutRef<"div">;
type PreviewProps = Omit<PrimitivePreviewProps, "children"> & {
  template: TemplateType;
};

const NAME = "Preview";

// For sharing & resuming.
const currentOptions = {};
const overrideOptions: any = null;

const Preview = React.forwardRef<PreviewElement, PreviewProps>(
  ({ template = "twitter", ...props }, forwardedRef) => {
    const [f] = useAtom(templateAtom);

    const [options, setOptions] = React.useState<any | object | null>(null);
    const [debug, setDebug] = React.useState(false);
    const [fontEmbed, setFontEmbed] = React.useState(true);
    const [emojiType, setEmojiType] = React.useState("twemoji");

    const [imageResult, setImageResult] = React.useState<{
      url: string;
      blob: any;
    } | null>(null);
    const [imageLoading, setImageLoading] = React.useState<boolean>(false);
    const [imageError, setImageError] = React.useState<string>();

    const [renderError, setRenderError] = React.useState(null);
    const [width, setWidth] = React.useState(16 * 120);
    const [height, setHeight] = React.useState(9 * 120);
    const [loadingResources, setLoadingResources] = React.useState(true);

    React.useEffect(() => {
      if (overrideOptions) {
        setWidth(Math.min(overrideOptions.width || 1920, 2000));
        setHeight(Math.min(overrideOptions.height || 1080, 2000));
        setDebug(!!overrideOptions.debug);
        setEmojiType(overrideOptions.emojiType || "twemoji");
        setFontEmbed(!!overrideOptions.fontEmbed);
      }
    }, [overrideOptions]);

    React.useEffect(() => {
      setHeight(template === "twitter" ? 880 : 9 * 120);
    }, [template]);

    const sizeRef = React.useRef<[number, number]>([width, height]);
    sizeRef.current = [width, height];

    React.useEffect(() => {
      (async () => {
        setOptions({
          fonts: await loadFonts,
        });
        setLoadingResources(false);
      })();
    }, []);

    const [result, setResult] = React.useState("");
    const debouncedResult = useDebounce(result, 500);

    React.useEffect(() => {
      let cancelled = false;

      (async () => {
        if (cancelled) return;

        let _result = "";

        if (options) {
          try {
            _result = await TemplateRenderer[template](f, {
              ...options,
              embedFont: fontEmbed,
              width,
              height,
              debug,
              loadAdditionalAsset: (...args: string[]) =>
                loadDynamicAsset(emojiType, ...args),
            });
            setRenderError(null);
          } catch (e: any) {
            console.error(e);
            setRenderError(e.message);
            return null;
          }
        }

        Object.assign(currentOptions, {
          width,
          height,
          debug,
          emojiType,
          fontEmbed,
        });
        setResult(_result);
        setImageResult(null);
        setImageLoading(true);
      })();

      return () => {
        cancelled = true;
      };
    }, [f, options, width, height, debug, emojiType, fontEmbed, template]);

    React.useEffect(() => {
      let cancelled = false;

      (async () => {
        if (cancelled) return;

        try {
          const _result = await renderPNG?.({
            svg: debouncedResult,
            width: width,
          });

          if (!cancelled) {
            setImageResult(_result ?? null);
            // After rendering the PNG @1x quickly, we render the PNG @2x for
            // the playground only to make it look less blurry.
            // We only do that for images that are not too big (1200^2).
            // if (width * height <= 1440000) {
            // setTimeout(async () => {
            //   if (cancelled) return;
            //   const _url = (await renderPNG?.({
            //     svg: debouncedResult,
            //     width: width,
            //   })) as string;
            //   if (cancelled) return;
            //   setImageResult(_url);
            // }, 20);
            // }
          }
        } catch (e: any) {
          console.log("img error", e);
          setImageError(e.message);
        } finally {
          setImageLoading(false);
        }
      })();

      return () => {
        cancelled = true;
      };
    }, [debouncedResult]);

    const showImage = imageResult && result === debouncedResult;

    return (
      <div className="flex flex-col gap-4">
        <div className="rounded-xl bg-gray-800 p-4">
          <div
            {...props}
            className={cn(
              "relative h-full w-full",
              {
                "aspect-[218/100]": template === "twitter",
                "aspect-video": template === "gmail",
              },
              props.className
            )}
            ref={forwardedRef}
          >
            {renderError && (
              <div className="rounded-xl bg-red-200 p-4 text-red-600">
                <div className="text-sm font-semibold">ERROR</div>
                <code className="whitespace-pre-wrap break-all text-xs">
                  {renderError}
                </code>
              </div>
            )}
            {loadingResources ? spinner : null}
            {!renderError && (
              <div className="absolute inset-0 overflow-hidden rounded-xl bg-gray-700">
                <div
                  dangerouslySetInnerHTML={{
                    __html: `<div class="absolute inset-0 flex items-center justify-center overflow-hidden " style="">${result}</div>`,
                  }}
                ></div>
                {showImage && (
                  <div className="absolute inset-0 z-10">
                    <img
                      src={imageResult.url}
                      width={width}
                      height={height}
                      className="object-contain"
                      alt="Preview thumbnail"
                    />
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="mt-4 flex gap-4">
            <div className="relative h-12 w-12 overflow-hidden rounded-full bg-gray-700"></div>
            <div className="flex flex-col">
              <div>
                <span className="mb-1 select-none rounded bg-gray-700 font-semibold text-transparent">
                  Clickbait title youtube video
                </span>
              </div>
              <div>
                <span className="select-none rounded bg-gray-700/50 text-xs text-transparent">
                  Channel
                </span>
              </div>
              <div>
                <span className="mt-1 select-none rounded bg-gray-700/50 text-xs text-transparent">
                  236k views <span>•</span> 2 days ago
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end gap-2">
          <div>
            {imageError ? (
              <span>{imageError}</span>
            ) : imageLoading || !imageResult ? (
              <div className="flex gap-2">
                <Skeleton title="Generating thumbnail">
                  <Button className="pointer-events-none" tabIndex={-1}>
                    <span className="h-4 w-4 opacity-0"></span>
                  </Button>
                </Skeleton>
                <Skeleton title="Generating thumbnail">
                  <Button className="pointer-events-none" tabIndex={-1}>
                    <span className="opacity-0">🔗 Open</span>
                  </Button>
                </Skeleton>
                <Skeleton title="Generating thumbnail">
                  <Button
                    className="pointer-events-none text-transparent"
                    tabIndex={-1}
                  >
                    <span className="opacity-0">💾 Save Image</span>
                  </Button>
                </Skeleton>
              </div>
            ) : (
              <div className="flex gap-2">
                <Button
                  color="gray"
                  className="group"
                  onClick={async () => {
                    await navigator.clipboard.write([
                      new ClipboardItem({ "image/png": imageResult.blob }),
                    ]);
                    toast.success("Copied image clipboard");
                  }}
                  title="Copy image to clipboard"
                >
                  <CopyIcon className="text-gray-400 group-hover:text-white" />
                </Button>
                <a
                  href={imageResult.url ?? ""}
                  target="_blank"
                  rel="noreferrer"
                  tabIndex={-1}
                >
                  <Button color="gray">🔗 Open</Button>
                </a>
                <a
                  href={imageResult.url ?? ""}
                  download={`${template}-thumbnail.png`}
                  tabIndex={-1}
                >
                  <Button color="indigo">💾 Save Image</Button>
                </a>
              </div>
            )}
          </div>
          <div className="flex items-center text-sm text-gray-400">
            {imageError ? null : imageLoading || !imageResult ? (
              <span>Generating thumbnail...</span>
            ) : (
              <span className="text-emerald-500">Get your thumbnail ↑</span>
            )}
          </div>
        </div>
        <hr className="border-gray-700 lg:hidden" />
      </div>
    );
  }
);

Preview.displayName = NAME;

export default Preview;
