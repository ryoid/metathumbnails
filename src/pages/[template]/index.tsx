import React from "react";
import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import Head from "next/head";
import { useAtom } from "jotai";

import { templateFormAtom } from "../../store/form";
import { Preview } from "../../components/Preview";
import TemplateTabs from "../../components/TemplateTabs";
import {
  TemplateType,
  TemplateTypes,
  TemplateConfigurator,
  DEFAULT_TEMPLATE,
} from "../../components/templates";
import Layout from "../../components/Layout";

const TemplatePage: NextPage = ({
  template,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [templateForms] = useAtom(templateFormAtom);

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
              <Preview
                template={template}
                formAtom={templateForms[template as TemplateType]}
              />
            </div>
          </div>
        </main>
      </Layout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const template = context.query.template as any as TemplateType;

  if (!TemplateTypes.includes(template)) {
    return {
      redirect: {
        destination: `/${DEFAULT_TEMPLATE}`,
        permanent: true,
      },
    };
  }

  return {
    props: {
      template,
    },
  };
};

export default TemplatePage;
