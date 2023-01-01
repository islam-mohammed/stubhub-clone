import { Inter } from "@next/font/google";
import Layout from "../components/layout/layout";

const inter = Inter({ subsets: ["latin"] });
const Home = () => {
  return (
    <Layout>
      <h1>Home Page</h1>
    </Layout>
  );
};

export default Home;
