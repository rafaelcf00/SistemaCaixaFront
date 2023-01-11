import { NextPage } from "next";
import Clientes from "../../components/Clientes/Listagem";
import { RotaAutenticada } from "../../components/RotaAutenticada";

const ListagemClientes: NextPage = () => {
  return (
    <RotaAutenticada>
      <Clientes />
    </RotaAutenticada>
  );
};

export default ListagemClientes;
