import { Inter } from "@next/font/google";
import Layout from "../components/layout/layout";
import { GetServerSideProps } from "next";
import axiosServer from "../helpers/axios.helper";
import { useSWRConfig } from "swr";
import { useEffect } from "react";
import getSWRCacheKey from "../helpers/swr.helper";

const inter = Inter({ subsets: ["latin"] });

interface Props {
  user?: string;
}

const Home = ({ user }: Props) => {
  const { mutate } = useSWRConfig();
  useEffect(() => {
    const updateUser = async () => {
      await mutate(getSWRCacheKey().user, user);
    };
    updateUser();
  }, [user]);
  return (
    <Layout>
      <h1>Home Page</h1>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { data: user } = await axiosServer(req).get("/api/users/current");
  return {
    props: {
      user,
    },
  };
};

export default Home;
