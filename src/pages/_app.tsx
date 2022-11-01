// src/pages/_app.tsx
import "@/styles/globals.css";
import { Analytics } from "@vercel/analytics/react";
import Head from "next/head";
import type { Session } from "next-auth";
import type { AppType } from "next/app";
import { Toaster } from "react-hot-toast";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps,
}) => {
  return (
    <>
      <Head>
        <link
          rel="preload"
          href="/inter-latin-ext-400-normal.woff"
          as="fetch"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/inter-latin-ext-700-normal.woff"
          as="fetch"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/material-icons-base-400-normal.woff"
          as="fetch"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/iaw-mono-var.woff2"
          as="fetch"
          crossOrigin="anonymous"
        />
      </Head>
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        toastOptions={{
          // Define default options
          className: "",
          style: {
            background: "rgb(63, 63, 70)",
            color: "#fff",
          },
        }}
      />
      <Component {...pageProps} />
      <Analytics />
    </>
  );
};

export default MyApp;
