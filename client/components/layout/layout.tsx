import Head from "next/head";
import { ReactNode } from "react";
import Footer from "./footer";
import Navbar from "./nav";
import { useRouter } from "next/router";
import { userServcie } from "../../services/user.service";
import axiosHelper from "../../helpers/axios.helper";
import { AppContext } from "next/app";
import { useSWRConfig } from "swr";
import { GetServerSideProps } from "next";
import User from "../../models/user";
import axios from "axios";
type Props = {
  children?: ReactNode;
  title?: string;
  user?: User;
};

const Layout = ({ children, user, title = "Stub Hub | Home" }: Props) => {
  const { mutate } = useSWRConfig();
  const router = useRouter();
  const handleSignout = async () => {
    try {
      await userServcie.signOut();
      mutate(null);
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
};

export default Layout;
