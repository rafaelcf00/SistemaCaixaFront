import type { NextPage } from "next";
import Head from "next/head";
import Layout from "../components/Common/Layout";
import Dashboard from "../components/Dashboard";
import { useDashboardService } from "../app/services/dashboard.service";
import { DashboardData } from "../app/models/dashboard";
import { RotaAutenticada } from "../components/RotaAutenticada";

interface HomeProps {
  dashboard: DashboardData;
}

const Home: NextPage<HomeProps> = (props: HomeProps) => {
  return (
    <RotaAutenticada>
      <div className="bg-gray-200">
        <Head>
          <title>Create Next App</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Layout titulo="Dashboard" customClass="lg:w-full lg:mx-14">
          <Dashboard
            clientes={props.dashboard.clientes}
            produtos={props.dashboard.produtos}
            vendas={props.dashboard.vendas}
            vendasPorMes={props.dashboard.vendasPorMes}
          />
        </Layout>
      </div>
    </RotaAutenticada>
  );
};

export async function getStaticProps(context) {
  const service = useDashboardService();
  const dashboard: DashboardData = await service.get();

  return {
    props: {
      dashboard,
    },
    revalidate: 60, // em segundos
  };
}

export default Home;
