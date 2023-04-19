import { type GetServerSidePropsContext } from "next";
import { NextSeo } from "next-seo";
import BackgroundPatternTransparent from "~/assets/background-pattern-transparent.png";
import { DashboardLayout, StartSessionButton } from "~/components";
import SessionRecordsPreviewsList from "~/pages/dashboard/SessionRecordsPreviewsList";
import UserProfile from "~/pages/dashboard/UserProfile";
import { getServerAuthSession } from "~/server/auth";
import { ssrInit } from "~/server/lib/ssr";

export default function Dashboard() {
  return (
    <>
      <NextSeo title="Dashboard | TeachMe" />
      <DashboardLayout>
        <div
          className="flex h-full w-full flex-col overflow-auto bg-cover bg-center md:flex-row"
          style={{ backgroundImage: `url(${BackgroundPatternTransparent.src})` }}>
          <div className="flex flex-1 flex-col">
            <section className="mx-4 mt-8">
              <UserProfile />
            </section>
            <section className="my-8 flex flex-auto items-center justify-center">
              <StartSessionButton />
            </section>
            <section className="hidden rounded-tr-3xl bg-white px-8 py-4 text-xl shadow md:block">
              “If you can&apos;t explain it <span className="text-red-500">simply</span>, you don&apos;t
              understand it well enough”
            </section>
          </div>
          <div className="flex min-w-[28rem] flex-auto items-center justify-center md:py-12">
            <section className="mx-6 flex h-full w-full flex-col rounded-3xl bg-gray-50 px-4 py-8 shadow">
              <div className="mb-2 px-2 text-2xl">Session Records</div>
              <hr className="mb-2 h-[0.35rem] bg-red-500"></hr>
              <SessionRecordsPreviewsList />
            </section>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const session = await getServerAuthSession(ctx);
  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const ssr = await ssrInit(ctx);
  return {
    props: {
      trpcState: ssr.dehydrate(),
    },
  };
};
