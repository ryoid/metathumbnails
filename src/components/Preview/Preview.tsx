/* eslint-disable @next/next/no-img-element */
import React from "react";
import cn from "clsx";
import { useAtom } from "jotai";

import { formAtom } from "../../store/form";

import satori from "satori";
import { createIntlSegmenterPolyfill } from "intl-segmenter-polyfill";

import { loadEmoji, getIconCode, apis } from "../../utils/twemoji";

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

  const [font, fontBold, fontIcon, Segmenter] =
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

// https://raw.githubusercontent.com/n3r4zzurr0/svg-spinners/main/svg/90-ring.svg
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
    <path d="M10.14,1.16a11,11,0,0,0-9,8.92A1.59,1.59,0,0,0,2.46,12,1.52,1.52,0,0,0,4.11,10.7a8,8,0,0,1,6.66-6.61A1.42,1.42,0,0,0,12,2.69h0A1.57,1.57,0,0,0,10.14,1.16Z">
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
    const { _id, url } = e.data;
    const resolve = pending.get(_id);
    if (resolve) {
      resolve(url);
      pending.delete(_id);
    }
  };

  return async (msg: object) => {
    const _id = Math.random();
    worker.postMessage({
      ...msg,
      _id,
    });
    return new Promise((resolve) => {
      pending.set(_id, resolve);
    });
  };
}

const loadFonts = init();
const renderPNG = initResvgWorker();

type PreviewElement = React.ElementRef<"div">;
type PrimitivePreviewProps = React.ComponentPropsWithoutRef<"div">;
type PreviewProps = Omit<PrimitivePreviewProps, "children">;

const NAME = "Preview";
const RootCn = "form-control flex flex-col gap-1.5 w-full";

// For sharing & resuming.
const currentOptions = {};
const overrideOptions: any = null;

const Preview = React.forwardRef<PreviewElement, PreviewProps>(
  (props, forwardedRef) => {
    const [f] = useAtom(formAtom);

    const [options, setOptions] = React.useState<any | object | null>(null);
    const [debug, setDebug] = React.useState(false);
    const [fontEmbed, setFontEmbed] = React.useState(true);
    const [emojiType, setEmojiType] = React.useState("twemoji");
    const [objectURL, setObjectURL] = React.useState<string>("");
    const [renderType, setRenderType] = React.useState("svg");
    const [renderError, setRenderError] = React.useState(null);
    const [width, setWidth] = React.useState(16 * 120);
    const [height, setHeight] = React.useState(9 * 120);
    const [iframeNode, setIframeNode] = React.useState<
      HTMLElement | undefined
    >();
    const [scaleRatio, setScaleRatio] = React.useState(1);
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

    const sizeRef = React.useRef<[number, number]>([width, height]);
    sizeRef.current = [width, height];

    function updateScaleRatio() {
      const [w, h] = sizeRef.current;
      const innerWidth = window.innerWidth;
      const containerWidth =
        innerWidth < 600 ? innerWidth - 20 : innerWidth / 2 - 15;
      const containerHeight = (containerWidth * 9) / 16;
      setScaleRatio(
        Math.min(1, Math.min(containerWidth / w, containerHeight / h))
      );
    }

    React.useEffect(() => {
      (async () => {
        setOptions({
          fonts: await loadFonts,
        });
        setLoadingResources(false);
      })();
    }, []);

    React.useEffect(() => {
      let timeout: NodeJS.Timeout;

      const onResize = () => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          updateScaleRatio();
        }, 50);
      };
      window.addEventListener("resize", onResize);
      return () => window.removeEventListener("resize", onResize);
    }, []);

    React.useEffect(() => {
      updateScaleRatio();
    }, [width, height]);

    const [result, setResult] = React.useState("");
    const [renderedTimeSpent, setRenderTime] = React.useState<number>(0);

    React.useEffect(() => {
      let cancelled = false;

      (async () => {
        // We leave a small buffer here to debounce if it's PNG.
        if (renderType === "png") {
          await new Promise((resolve) => setTimeout(resolve, 15));
        }
        if (cancelled) return;

        let _result = "";
        let _renderedTimeSpent = 0;

        if (true && options) {
          const start = (
            typeof performance !== "undefined" ? performance : Date
          ).now();
          if (renderType !== "html") {
            try {
              _result = await satori(
                // template
                <div
                  style={{
                    backgroundColor: "white",
                    color: "black",
                    display: "flex",
                    gap: "2px",
                    height: "100%",
                    width: "100%",
                    paddingTop: 40,
                    paddingRight: 4,
                    paddingBottom: 4,
                    paddingLeft: 4,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                    }}
                  >
                    <img
                      style={{
                        borderRadius: 128,
                        objectFit: "cover",
                        border: "5px solid black",
                      }}
                      height={128}
                      width={128}
                      src={f.avatar}
                      alt="avatar"
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      marginLeft: "2rem",
                    }}
                  >
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <div
                          style={{
                            fontWeight: "bold",
                            color: "#1F1F1F",
                            fontSize: 32,
                          }}
                        >
                          {f.from}
                        </div>
                        <div
                          style={{
                            display: "flex",
                            color: "#222222",
                            fontSize: 32,
                          }}
                        >
                          {f.time} (<span>{f.time_ago} ago</span>)
                        </div>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          color: "#222222",
                          fontSize: 32,
                        }}
                      >
                        to {f.to} <span>[v]</span>
                      </div>
                    </div>
                    <div
                      style={{
                        whiteSpace: "pre-wrap",
                        color: "#222222",
                        fontWeight: 500,
                        fontSize: 50,
                        letterSpacing: -1,
                        marginTop: "2rem",
                        marginBottom: "2rem",
                      }}
                    >
                      {f.body}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        fontSize: 40,
                        fontWeight: 500,
                      }}
                    >
                      {f.suggestions.map((suggestion, i) => {
                        return (
                          <div
                            key={suggestion}
                            style={{
                              color: "#005DCD",
                              padding: "1rem 2.5rem",
                              border: "2px solid #787878",
                              borderRadius: "1.3rem",
                              marginTop: "0.7rem",
                              marginLeft: i !== 0 ? "1.25rem" : "",
                            }}
                          >
                            {suggestion}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>,
                {
                  ...options,
                  embedFont: fontEmbed,
                  width,
                  height,
                  debug,
                  loadAdditionalAsset: (...args: string[]) =>
                    loadDynamicAsset(emojiType, ...args),
                }
              );
              if (renderType === "png") {
                console.log("do png stuff");

                const url = (await renderPNG?.({
                  svg: _result,
                  width,
                })) as string;

                if (!cancelled) {
                  setObjectURL(url);

                  // After rendering the PNG @1x quickly, we render the PNG @2x for
                  // the playground only to make it look less blurry.
                  // We only do that for images that are not too big (1200^2).
                  // if (width * height <= 1440000) {
                  setTimeout(async () => {
                    if (cancelled) return;
                    const _url = (await renderPNG?.({
                      svg: _result,
                      width: width * 4,
                    })) as string;

                    if (cancelled) return;
                    setObjectURL(_url);
                  }, 20);
                  // }
                }
              }
              // if (renderType === "pdf") {
              //   const doc = new PDFDocument({
              //     compress: false,
              //     size: [width, height],
              //   });
              //   SVGtoPDF(doc, _result, 0, 0, {
              //     width,
              //     height,
              //     preserveAspectRatio: `xMidYMid meet`,
              //   });
              //   const stream = doc.pipe(blobStream());
              //   stream.on("finish", () => {
              //     const blob = stream.toBlob("application/pdf");
              //     setObjectURL(URL.createObjectURL(blob));
              //   });
              //   doc.end();
              // }
              setRenderError(null);
            } catch (e: any) {
              console.error(e);
              setRenderError(e.message);
              return null;
            }
          } else {
            setRenderError(null);
          }
          _renderedTimeSpent =
            (typeof performance !== "undefined" ? performance : Date).now() -
            start;
        }

        Object.assign(currentOptions, {
          width,
          height,
          debug,
          emojiType,
          fontEmbed,
        });
        setResult(_result);
        setRenderTime(_renderedTimeSpent);
      })();

      return () => {
        cancelled = true;
      };
    }, [f, options, width, height, debug, emojiType, fontEmbed, renderType]);

    return (
      <div
        {...props}
        className={cn(RootCn, props.className)}
        ref={forwardedRef}
      >
        {/* <code className="text-xs">{JSON.stringify(f, null, 2)}</code> */}
        <div className="flex gap-2">
          <button
            className={cn("rounded px-2 font-semibold hover:bg-gray-700", {
              "bg-white text-black hover:bg-white": renderType === "svg",
            })}
            onClick={() => setRenderType("svg")}
          >
            SVG
          </button>
          <button
            className={cn("rounded px-2 font-semibold hover:bg-gray-700", {
              "bg-white text-black hover:bg-white": renderType === "png",
            })}
            onClick={() => setRenderType("png")}
          >
            PNG
          </button>
        </div>

        <div className="preview-card">
          {/* {live?.error || renderError ? (
            <div className="error">
              <pre>{live?.error || renderError}</pre>
            </div>
          ) : null} */}
          {renderError && (
            <div className="bg-red-200 p-4 text-red-600">
              <div>ERROR</div>
              <code className="whitespace-pre-wrap">{renderError}</code>
            </div>
          )}
          {loadingResources ? spinner : null}
          <div
            className="svg-container h-full"
            dangerouslySetInnerHTML={
              renderType !== "svg"
                ? undefined
                : {
                    __html: `<div style="position:absolute;width:${width}px;height:${height}px;transform:scale(${scaleRatio});display:flex;align-items:center;justify-content:center">${result}</div>`,
                  }
            }
          >
            {renderType === "png" && objectURL ? (
              <img
                src={objectURL}
                width={width}
                height={height}
                style={{
                  transform: `scale(${scaleRatio})`,
                }}
                alt="Preview"
              />
            ) : renderType === "pdf" && objectURL ? (
              <iframe
                key="pdf"
                width={width}
                height={height}
                src={
                  objectURL +
                  "#toolbar=0&navpanes=0&scrollbar=0&statusbar=0&messages=0&scrollbar=0"
                }
                style={{
                  transform: `scale(${scaleRatio})`,
                }}
              />
            ) : null}
          </div>
          <footer>
            <span className="ellipsis">
              {renderType === "html"
                ? "[HTML] Rendered."
                : `[${renderType.toUpperCase()}] Generated in `}
            </span>
            <span className="data">
              {renderType === "html"
                ? ""
                : `${~~(renderedTimeSpent * 100) / 100}ms.`}
              {renderType === "pdf" || renderType === "png" ? (
                <>
                  {" "}
                  <a href={objectURL ?? ""} target="_blank" rel="noreferrer">
                    (View in New Tab ↗)
                  </a>
                </>
              ) : (
                ""
              )}
            </span>
            <span>{`[${width}×${height}]`}</span>
          </footer>
        </div>
      </div>
    );
  }
);

Preview.displayName = NAME;

export default Preview;
