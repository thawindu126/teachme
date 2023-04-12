import type { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from "next";
import type { AuthOptions } from "next-auth";
import { getServerSession as getServerSessionInner } from "next-auth/next";
import { AUTH_OPTIONS } from "~/server/auth";

export async function getServerSession(options: {
  req: NextApiRequest | GetServerSidePropsContext["req"];
  res: NextApiResponse | GetServerSidePropsContext["res"];
  authOptions?: AuthOptions;
}) {
  const { req, res, authOptions = AUTH_OPTIONS } = options;

  const session = await getServerSessionInner(req, res, authOptions);

  // that these are equal are ensured in `[...nextauth]`'s callback
  return session;
}
