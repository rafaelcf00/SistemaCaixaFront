import RelatorioVendas from "../../components/Relatorios/vendas";
import { NextPage } from "next";
import { RotaAutenticada } from "../../components/RotaAutenticada";

const RelatorioVenda: NextPage = () => {
  return (
    <RotaAutenticada>
      <RelatorioVendas />
    </RotaAutenticada>
  );
};

export default RelatorioVenda;
