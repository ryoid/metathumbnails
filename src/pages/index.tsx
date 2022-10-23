import type { NextPage } from "next";
import Head from "next/head";
import {
  InputText,
  Label,
  FormControl,
  Textarea,
  SuggestionPill,
} from "../components/basic";
import InputTag from "../components/basic/InputTag";

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
          <div className="relative h-32 bg-black">
            <div className="absolute inset-0 overflow-hidden">
              <div className="aspect-[16/9] bg-gray-800">Output</div>
            </div>
          </div>

          <div className="flex flex-col">
            <h2 className="my-4 text-xl font-semibold tracking-wide">
              Configuration
            </h2>

            <form className="max-w-lg  [&_.form-control]:mb-4">
              <h3 className="mt-2 mb-3 inline-flex select-none rounded bg-green-900/20 px-1.5 text-lg font-medium text-white/90">
                Details
              </h3>
              <div className="grid grid-cols-3 gap-2">
                <FormControl className="col-span-2">
                  <Label htmlFor="from">From</Label>
                  <InputText id="from" defaultValue="Your Boss" />
                </FormControl>

                <FormControl>
                  <Label htmlFor="avatar">Avatar</Label>
                  <InputText
                    id="avatar"
                    defaultValue="https://thispersondoesnotexist.com/image"
                  />
                </FormControl>
                <FormControl className="col-span-2">
                  <Label htmlFor="to">To</Label>
                  <InputText id="to" defaultValue="me" />
                </FormControl>
              </div>

              <hr className="my-4 border-gray-800" />

              <h3 className="mt-2 mb-3 inline-flex select-none rounded bg-purple-900/20 px-1.5 text-lg font-medium text-white/90">
                When
              </h3>
              <div className="flex gap-2">
                <FormControl>
                  <Label htmlFor="time">Time</Label>
                  <InputText id="time" defaultValue="11:34 AM" />
                </FormControl>
                <FormControl>
                  <Label htmlFor="time_ago">How long ago</Label>
                  <InputText id="time_ago" defaultValue="1 minute" />
                </FormControl>
              </div>

              <hr className="my-4 border-gray-800" />

              <h3 className="mt-2 mb-3 inline-flex select-none rounded bg-blue-900/20 px-1.5 text-lg font-medium text-white/90">
                Email
              </h3>

              <FormControl>
                <Label htmlFor="body">Words</Label>
                <Textarea
                  id="body"
                  defaultValue={`Come to my office. Now.`}
                  rows={8}
                />
              </FormControl>

              <FormControl>
                <Label htmlFor="suggestions">Suggestion Pills</Label>
                <InputTag
                  id="suggestions"
                  defaultValue={["Oh no...", "Am I getting fired??"]}
                  tag={SuggestionPill}
                  tagCn="text-blue-500"
                />
              </FormControl>
            </form>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
