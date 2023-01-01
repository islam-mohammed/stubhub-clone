import { GetServerSideProps } from "next";
import axiosHelper from "./axios.helper";

const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { data } = await axiosHelper(req).get("/api/users/current");
  if (!data.currentUser) {
    return {
      redirect: {
        destination: "/secure/login",
        permanent: false,
      },
    };
  }

  return {
    props: {
      user: data.currentUser,
    },
  };
};

export default getServerSideProps;
