import { type Session } from "next-auth";
import { DefaultSeo } from "next-seo";
import { type AppType } from "next/app";
import { Providers } from "~/components";
import "~/styles/globals.css";
import { api } from "~/utils/api";

const MyApp: AppType<{ session: Session | null }> = ({ Component, pageProps: { session, ...pageProps } }) => {
  return (
    <Providers session={session}>
      <DefaultSeo
        title="TeachMe | Online Education Platform"
        description="TeachMe fosters continuous improvement by offering a distinctive and engaging approach to learning based on the Feynman technique. Its fundamental principle is to explain a subject or idea in simple terms to comprehend it truly."
      />
      <Component {...pageProps} />
    </Providers>
  );
};

export default api.withTRPC(MyApp);
