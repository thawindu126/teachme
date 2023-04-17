/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { IdentityProvider } from "@prisma/client";
import { type GetServerSidePropsContext } from "next";
import { getServerSession, type AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { ErrorCode } from "~/lib/auth/ErrorCode";
import { verifyPassword } from "~/lib/auth/verifyPassword";
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, IS_GOOGLE_LOGIN_ENABLED, WEBAPP_URL } from "~/lib/constants";
import { defaultCookies } from "~/lib/default-cookies";
import { prisma } from "~/server/db";

const adapter = PrismaAdapter(prisma);

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const AUTH_OPTIONS: AuthOptions = {
  adapter,
  session: {
    strategy: "jwt",
  },
  cookies: defaultCookies(WEBAPP_URL?.startsWith("https://")),
  pages: {
    signIn: "/login",
    signOut: "/logout",
    error: "/error",
    verifyRequest: "/verify",
  },
  callbacks: {
    // async jwt({ token, user, account }) {
    //   const autoMergeIdentities = async () => {
    //     const existingUser = await prisma.user.findFirst({
    //       where: { email: token.email! },
    //       select: {
    //         id: true,
    //         name: true,
    //         email: true,
    //       },
    //     });

    //     if (!existingUser) {
    //       return token;
    //     }

    //     return {
    //       ...existingUser,
    //       ...token,
    //     };
    //   };
    //   if (!user) {
    //     return await autoMergeIdentities();
    //   }
    //   if (!account) {
    //     return token;
    //   }
    //   if (account.type === "credentials") {
    //     return {
    //       ...token,
    //       id: user.id,
    //       name: user.name,
    //       email: user.email,
    //     };
    //   }

    //   // The arguments above are from the provider so we need to look up the
    //   // user based on those values in order to construct a JWT.
    //   if (account.type === "oauth") {
    //     if (!account.provider || !account.providerAccountId) {
    //       return token;
    //     }

    //     const existingUser = await prisma.user.findFirst({
    //       where: {
    //         AND: [
    //           {
    //             identityProvider: IdentityProvider.GOOGLE,
    //           },
    //           {
    //             identityProviderId: account.providerAccountId,
    //           },
    //         ],
    //       },
    //     });

    //     if (!existingUser) {
    //       return await autoMergeIdentities();
    //     }

    //     return {
    //       ...token,
    //       id: existingUser.id,
    //       name: existingUser.name,
    //       email: existingUser.email,
    //     };
    //   }

    //   return token;
    // },
    session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id as number,
          name: token.name,
        },
      };
    },
    async signIn(params) {
      const { user, account } = params;

      if (!user.email) {
        return false;
      }

      if (!user.name) {
        return false;
      }

      if (account?.provider) {
        const idP = IdentityProvider.GOOGLE;

        let existingUser = await prisma.user.findFirst({
          include: {
            accounts: {
              where: {
                provider: account.provider,
              },
            },
          },
          where: {
            identityProvider: idP,
            identityProviderId: account.providerAccountId,
          },
        });

        if (!existingUser) {
          existingUser = await prisma.user.findFirst({
            include: {
              accounts: {
                where: {
                  provider: account.provider,
                },
              },
            },
            where: {
              identityProvider: idP,
              identityProviderId: user.id,
            },
          });
          if (existingUser) {
            await prisma.user.update({
              where: {
                id: existingUser?.id,
              },
              data: {
                identityProviderId: account.providerAccountId,
              },
            });
          }
        }

        if (existingUser) {
          // In this case there's an existing user and their email address
          // hasn't changed since they last logged in.
          if (existingUser.email === user.email) {
            try {
              // If old user without Account entry we link their google account
              if (existingUser.accounts.length === 0) {
                const linkAccountWithUserData = {
                  ...account,
                  userId: existingUser.id,
                };
                await adapter.linkAccount(linkAccountWithUserData);
              }
            } catch (error) {
              if (error instanceof Error) {
                console.error("Error while linking account of already existing user");
              }
            }
            return true;
          }

          // If the email address doesn't match, check if an account already exists
          // with the new email address. If it does, for now we return an error. If
          // not, update the email of their account and log them in.
          const userWithNewEmail = await prisma.user.findFirst({
            where: { email: user.email },
          });

          if (!userWithNewEmail) {
            await prisma.user.update({
              where: { id: existingUser.id },
              data: { email: user.email },
            });
            return true;
          } else {
            return "/error?error=new-email-conflict";
          }
        }

        // If there's no existing user for this identity provider and id, create
        // a new account. If an account already exists with the incoming email
        // address return an error for now.
        const existingUserWithEmail = await prisma.user.findFirst({
          where: {
            email: {
              equals: user.email,
              mode: "insensitive",
            },
          },
        });

        if (existingUserWithEmail?.email) {
          // if self-hosted then we can allow auto-merge of identity providers if email is verified
          if (existingUserWithEmail.emailVerified) {
            return true;
          }

          // User signs up with email/password and then tries to login with Google/SAML using the same email
          if (
            existingUserWithEmail.identityProvider === IdentityProvider.TEACHME &&
            idP === IdentityProvider.GOOGLE
          ) {
            await prisma.user.update({
              where: { email: existingUserWithEmail.email },
              // also update email to the IdP email
              data: {
                password: null,
                email: user.email,
                identityProvider: idP,
                identityProviderId: account.providerAccountId,
              },
            });
            return true;
          } else if (existingUserWithEmail.identityProvider === IdentityProvider.TEACHME) {
            return "/error?error=use-password-login";
          }

          return "/error?error=use-identity-login";
        }

        const newUser = await prisma.user.create({
          data: {
            emailVerified: new Date(Date.now()),
            name: user.name,
            email: user.email,
            identityProvider: idP,
            identityProviderId: account.providerAccountId,
          },
        });

        const linkAccountNewUserData = { ...account, userId: newUser.id };
        await adapter.linkAccount(linkAccountNewUserData);

        return true;
      }

      return false;
    },
    redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) {
        return `${baseUrl}${url}`;
      }
      // Allows callback URLs on the same domain
      else if (new URL(url).hostname === new URL(WEBAPP_URL).hostname) {
        return url;
      }
      return baseUrl;
    },
  },
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Teachme.com",
      type: "credentials",
      credentials: {
        email: {
          label: "Email Address",
          type: "email",
          placeholder: "john.doe@example.com",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Your super secure password",
        },
      },
      async authorize(credentials) {
        if (!credentials) {
          console.error(`For some reason credentials are missing`);
          throw new Error(ErrorCode.InternalServerError);
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email.toLowerCase(),
          },
          select: {
            id: true,
            name: true,
            email: true,
            identityProvider: true,
            password: true,
          },
        });

        // Don't leak information about it being email or password that is invalid
        if (!user) {
          throw new Error(ErrorCode.IncorrectEmailPassword);
        }

        if (user.identityProvider !== IdentityProvider.TEACHME) {
          throw new Error(ErrorCode.ThirdPartyIdentityProviderEnabled);
        }

        if (!user.password) {
          throw new Error(ErrorCode.IncorrectEmailPassword);
        }

        if (user.password) {
          const isCorrectPassword = await verifyPassword(credentials.password, user.password);
          if (!isCorrectPassword) {
            throw new Error(ErrorCode.IncorrectEmailPassword);
          }
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
        };
      },
    }),
    ...(IS_GOOGLE_LOGIN_ENABLED
      ? [
          GoogleProvider({
            clientId: GOOGLE_CLIENT_ID!,
            clientSecret: GOOGLE_CLIENT_SECRET!,
            allowDangerousEmailAccountLinking: true,
          }),
        ]
      : []),
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
  ],
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `AUTH_OPTIONS` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, AUTH_OPTIONS);
};
