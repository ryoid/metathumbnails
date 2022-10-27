import { useAtom } from "jotai";
import type { GetServerSidePropsContext, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

import { Preview } from "../components/Preview";
import { TemplateTypes, TemplateConfigurator } from "../components/templates";
import { templateFormAtom } from "../store/form";

const Header = () => (
  <div className="container mx-auto flex flex-col py-8 px-4">
    <h1 className="text-center text-4xl font-semibold">Meta Thumbnails</h1>
  </div>
);

const Home: NextPage = () => {
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

      <main className="min-h-screen pt-4 lg:mt-8">
        <Header />

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
            <TemplateConfigurator template={"gmail"} />
          </div>

          <div className="-order-1 w-full lg:order-2 lg:max-w-[400px]">
            <Preview template={"gmail"} formAtom={templateForms["gmail"]} />
          </div>
        </div>
      </main>
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
        destination: `/${"DEFAULT_TEMPLATE"}`,
      },
    };
  }

  return {
    props: {},
  };
};

export default Home;
