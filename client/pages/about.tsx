import Layout from "../components/layout/layout";
import User from "../models/user";
import getServerSideProps from "../helpers/server-props.helper";
import useUser from "../hooks/useUser";

const AboutUs = ({ user }: { user: User }) => {
  const { mutate } = useUser();
  mutate(user);
  return (
    <Layout>
      <h1>About us page!</h1>;
    </Layout>
  );
};

export { getServerSideProps };

export default AboutUs;
