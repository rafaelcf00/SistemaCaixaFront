import { NextPage } from "next";
import Produtos from "../../components/Produtos/Listagem";
import { RotaAutenticada } from "../../components/RotaAutenticada";

const ListagemProdutos: NextPage = () => {
  return (
    <RotaAutenticada>
      <Produtos />
    </RotaAutenticada>
  );
};

export default ListagemProdutos;
