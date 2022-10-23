// src/pages/_app.tsx
import "../styles/globals.css";
import Head from "next/head";
import { SessionProvider } from "next-auth/react";
import type { Session } from "next-auth";
import type { AppType } from "next/app";
import { trpc } from "../utils/trpc";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
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
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </>
  );
};

export default trpc.withTRPC(MyApp);
