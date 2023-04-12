import { type Session } from "next-auth";
import { type AppType } from "next/app";
import { Providers } from "~/components";
import "~/styles/globals.css";
import { api } from "~/utils/api";

const MyApp: AppType<{ session: Session | null }> = ({ Component, pageProps: { session, ...pageProps } }) => {
  return (
    <Providers session={session}>
      <Component {...pageProps} />
    </Providers>
  );
};

export default api.withTRPC(MyApp);
