import Head from "next/head";
import { ReactNode } from "react";
import Footer from "./footer";
import Navbar from "./nav";

type Props = {
  children?: ReactNode;
  title?: string;
};

export default function AuthLayout({
  children,
  title = "Stub Hub | Home",
}: Props) {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <header>
        <Navbar />
      </header>
      <main>{children}</main>
      <Footer />
    </div>
  );
}
