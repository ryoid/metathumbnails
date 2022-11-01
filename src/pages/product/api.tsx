import type { NextPage } from "next";
import Head from "next/head";
import Layout from "@/components/Layout";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>YouTube Thumbnail Generation API</title>
        <meta name="description" content="YouTube Thumbnail Generation API" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <main className="h-full pt-4 lg:mt-8">
          <div className="mt-32 flex h-full flex-col items-center gap-2">
            <h2 className="mb-4 text-4xl">Coming soon</h2>
            <p className="text-gray-400">
              Generate thumbnail images via a simple API
            </p>
            <div>
              <code className="rounded bg-gray-800 px-1 py-0.5 text-sm text-gray-500">
                metathumbsnails.com/
                <span className="text-gray-400">gmail?from=boss</span>
              </code>
            </div>
          </div>
        </main>
      </Layout>
    </>
  );
};

export default Home;
