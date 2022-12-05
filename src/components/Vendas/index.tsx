import { Venda } from "../../app/models/vendas";
import Layout from "../Common/Layout";
import VendasForm from "./form";

const Vendas: React.FC = () => {
  const handleSubmit = (venda: Venda) => {
    console.log(venda);
  };

  return (
    <Layout titulo="Venda" customClass="lg:w-full lg:mx-14">
      <VendasForm onSubmit={handleSubmit} />
    </Layout>
  );
};

export default Vendas;
