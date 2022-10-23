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

        <div className="container mx-auto px-4">
          <div className="relative h-auto bg-black">
            <div className=" bg-gray-800">
              <Preview />
            </div>
          </div>

          <div className="flex flex-col">
            <h2 className="my-4 text-xl font-semibold tracking-wide">
              Configuration
            </h2>

            <GmailForm />
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
