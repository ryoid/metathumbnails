import type { NextPage } from "next";
import Head from "next/head";

import { GmailForm } from "../components/Gmail";
import { Preview } from "../components/Preview";

const Header = () => (
  <div className="container mx-auto flex flex-col py-8 px-4">
    <h1 className="text-center text-4xl font-semibold">Meta Thumbnails</h1>
  </div>
);

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Meta YouTube Thumbnails</title>
        <meta
          name="description"
          content="Generate meta youtube thumbnails to takeover the world"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="mt-32 min-h-screen">
        <Header />

        <div className="container mx-auto flex flex-col justify-center gap-4 px-4 lg:flex-row lg:gap-12">
          <div className="flex flex-col">
            <h2 className="my-4 text-xl font-semibold tracking-wide">
              Configuration
            </h2>

            <GmailForm />
          </div>

          <div className="-order-1 w-full lg:order-2 lg:max-w-[400px]">
            <Preview />
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
