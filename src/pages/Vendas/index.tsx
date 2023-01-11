import { NextPage } from "next";
import Vendas from "../../components/Vendas";
import { RotaAutenticada } from "../../components/RotaAutenticada";

const Venda: NextPage = () => {
  return (
    <RotaAutenticada>
      <Vendas />
    </RotaAutenticada>
  );
};

export default Venda;
