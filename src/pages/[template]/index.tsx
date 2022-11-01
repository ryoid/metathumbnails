import React from "react";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";

import { Preview } from "@/components/Preview";
import TemplateTabs from "@/components/TemplateTabs";
import {
  TemplateType,
  TemplateTypes,
  TemplateConfigurator,
} from "@/components/templates";
import Layout from "@/components/Layout";
import { TemplateMeta } from "@/components/templates/const";
import { useRouter } from "next/router";

const TemplatePage: NextPage = () => {
  const router = useRouter();
  const template = router.query.template as TemplateType;

  return (
    <>
      <Head>
        <title>{TemplateMeta[template as TemplateType].title}</title>
        <meta
          name="description"
          content={TemplateMeta[template as TemplateType].description}
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <main className="mt-4 lg:mt-8">
          <div className="container mx-auto mb-8 flex justify-center">
            <TemplateTabs active={template} />
          </div>

          <div className="container mx-auto flex flex-col justify-center gap-4 px-4 lg:flex-row lg:gap-12">
            <div className="flex flex-col">
              <TemplateConfigurator template={template} />
            </div>

            <div className="-order-1 w-full lg:order-2 lg:max-w-[400px]">
              <Preview template={template} />
            </div>
          </div>
        </main>
      </Layout>
    </>
  );
};

export const getStaticProps: GetStaticProps = () => {
  return {
    props: {}, // will be passed to the page component as props
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: TemplateTypes.map((template) => ({
      params: { template: template },
    })),
    fallback: false,
  };
};

export default TemplatePage;
