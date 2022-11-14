import type { NextPage } from "next";
import Head from "next/head";
import Layout from "../components/Common/Layout";

const Home: NextPage = () => {
  return (
    <div className="bg-gray-200">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout titulo="Home" customClass="lg:w-1/2" />
    </div>
  );
};

export default Home;
