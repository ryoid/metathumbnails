import type { NextPage } from "next";
import Head from "next/head";
import Layout from "../components/Layout";

import { Preview } from "../components/Preview";
import {
  TemplateConfigurator,
  DEFAULT_TEMPLATE,
} from "../components/templates";
import { TemplateMeta } from "../components/templates/const";
import TemplateTabs from "../components/TemplateTabs";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>{TemplateMeta[DEFAULT_TEMPLATE].title}</title>
        <meta
          name="description"
          content={TemplateMeta[DEFAULT_TEMPLATE].description}
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <main className="pt-4 lg:mt-8">
          <div className="container mx-auto mb-8 flex justify-center">
            <TemplateTabs active={DEFAULT_TEMPLATE} />
          </div>

          <div className="container mx-auto flex flex-col justify-center gap-4 px-4 lg:flex-row lg:gap-12">
            <div className="flex flex-col">
              <TemplateConfigurator template={DEFAULT_TEMPLATE} />
            </div>

            <div className="-order-1 w-full lg:order-2 lg:max-w-[400px]">
              <Preview template={DEFAULT_TEMPLATE} />
            </div>
          </div>
        </main>
      </Layout>
    </>
  );
};

export default Home;
