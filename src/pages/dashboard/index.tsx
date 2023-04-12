import { type GetServerSidePropsContext } from "next";
import DashboardLayout from "~/components/DashboardLayout/DashboardLayout";
import { getServerAuthSession } from "~/server/auth";
import { ssrInit } from "~/server/lib/ssr";

export default function Dashboard() {
  return <DashboardLayout>Dashboard</DashboardLayout>;
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
