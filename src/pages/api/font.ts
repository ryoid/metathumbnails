import type { NextRequest } from "next/server";

export const config = {
  runtime: "experimental-edge",
};

export default async function loadGoogleFont(req: NextRequest) {
  if (req.nextUrl.pathname !== "/api/font") return;
  const { searchParams, hostname } = new URL(req.url);

  const font = searchParams.get("font");
  const text = searchParams.get("text");
  const weights = searchParams.get("weights");

  if (!font) return;

  const API = `https://fonts.googleapis.com/css2?family=${font}${
    weights ? `:wght@${weights}` : ""
  }${text ? `&text=${encodeURIComponent(text)}` : ""}`;

  const css = await (
    await fetch(API, {
      headers: {
        // Make sure it returns TTF.
        "User-Agent":
          "Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_8; de-at) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1",
      },
    })
  ).text();

  const resource = css.match(
    /src: url\((.+)\) format\('(opentype|truetype)'\)/
  );

  if (!resource?.[1]) return;

  const res = await fetch(resource[1]);

  // Make sure not to mess it around with compression when developing it locally.
  if (hostname === "localhost") {
    res.headers.delete("content-encoding");
    res.headers.delete("content-length");
  }

  return res;
}
