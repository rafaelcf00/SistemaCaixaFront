import { NextPage } from "next";
import CadastroCliente from "../../components/Clientes/Cadastro";
import { RotaAutenticada } from "../../components/RotaAutenticada";

const CadastroClientesPage: NextPage = () => {
  return (
    <RotaAutenticada>
      <CadastroCliente />
    </RotaAutenticada>
  );
};

export default CadastroClientesPage;
