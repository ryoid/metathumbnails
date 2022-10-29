import { useAtom } from "jotai";
import type { GetServerSidePropsContext, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Layout from "../components/Layout";

import { Preview } from "../components/Preview";
import {
  TemplateTypes,
  TemplateConfigurator,
  DEFAULT_TEMPLATE,
} from "../components/templates";
import { TemplateMeta } from "../components/templates/const";
import { templateFormAtom } from "../store/form";

const Home: NextPage = () => {
  const [templateForms] = useAtom(templateFormAtom);

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
          <div className="container mx-auto flex">
            {TemplateTypes.map((template) => (
              <div key={`tab-${template}`}>
                <Link href={`/${template}`}>
                  <a>{template}</a>
                </Link>
              </div>
            ))}
          </div>

          <div className="container mx-auto flex flex-col justify-center gap-4 px-4 lg:flex-row lg:gap-12">
            <div className="flex flex-col">
              <TemplateConfigurator template={DEFAULT_TEMPLATE} />
            </div>

            <div className="-order-1 w-full lg:order-2 lg:max-w-[400px]">
              <Preview
                template={DEFAULT_TEMPLATE}
                formAtom={templateForms[DEFAULT_TEMPLATE]}
              />
            </div>
          </div>
        </main>
      </Layout>
    </>
  );
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const template = context.query.template as any;

  if (!TemplateTypes.includes(template)) {
    return {
      redirect: {
        destination: `/${DEFAULT_TEMPLATE}`,
      },
    };
  }

  return {
    props: {},
  };
};

export default Home;
