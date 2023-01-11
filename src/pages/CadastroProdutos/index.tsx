import { NextPage } from "next";
import CadastroProduto from "../../components/Produtos/Cadastro";
import { RotaAutenticada } from "../../components/RotaAutenticada";

const CadastroProdutosPage: NextPage = () => {
  return (
    <RotaAutenticada>
      <CadastroProduto />
    </RotaAutenticada>
  );
};

export default CadastroProdutosPage;
