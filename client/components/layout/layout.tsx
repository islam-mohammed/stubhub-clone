import Head from "next/head";
import { ReactNode } from "react";
import Footer from "./footer";
import Navbar from "./nav";
import { useSWRConfig } from "swr";
import { useRouter } from "next/router";
import getSWRCacheKey from "../../helpers/swr.helper";
import { userServcie } from "../../services/user.service";
type Props = {
  children?: ReactNode;
  title?: string;
};

export default function Layout({ children, title = "Stub Hub | Home" }: Props) {
  const { mutate } = useSWRConfig();
  const router = useRouter();
  const handleSignout = async () => {
    try {
      await userServcie.signOut();
      mutate(getSWRCacheKey().user, null);
      router.push("/");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="w-full flex flex-col leading-6">
        <header>
          <Navbar onSignout={handleSignout} />
        </header>
        <main>{children}</main>
        <Footer />
      </div>
    </div>
  );
}
