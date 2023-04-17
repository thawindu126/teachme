import { type GetServerSidePropsContext } from "next";
import { DashboardLayout, StartSessionButton } from "~/components";
import { getServerAuthSession } from "~/server/auth";
import { prisma } from "~/server/db";
import { ssrInit } from "~/server/lib/ssr";
import { type inferSSRProps } from "~/types/inferSSRProps";

export default function NewSession({}: inferSSRProps<typeof getServerSideProps>) {
  return (
    <DashboardLayout>
      <StartSessionButton />
    </DashboardLayout>
  );
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const ssr = await ssrInit(ctx);
  const session = await getServerAuthSession(ctx);
  const user = await prisma.user.findFirst({ where: { id: session?.user.id } });
  if (user?.activeSessionRecordId) {
    return {
      redirect: { destination: `/dashboard/sessions/${user.activeSessionRecordId}`, permanent: false },
    };
  }

  return { props: { trpcState: ssr.dehydrate() } };
}
