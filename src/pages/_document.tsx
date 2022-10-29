import React from "react";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="description" content="Generate meta youtube thumbnails" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://unpkg.com" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
