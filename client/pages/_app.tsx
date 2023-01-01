import "../styles/globals.scss";
import type { AppProps } from "next/app";
import axios from "axios";
import { GetServerSideProps } from "next";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
