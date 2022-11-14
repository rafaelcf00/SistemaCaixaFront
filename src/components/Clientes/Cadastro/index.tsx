import { useState } from "react";
import Layout from "../../Common/Layout";
import ClienteForm from "./form";
import { Cliente } from "../../../app/models/clientes";
import { useClienteService } from "../../../app/services/cliente.service";
import { Alert } from "../../Common/Message";

const CadastroCliente: React.FC = () => {
  const [cliente, setCliente] = useState<Cliente>({});
  const [messages, setMessages] = useState<Array<Alert>>([]);
  const service = useClienteService();

  const handleSubmit = (cliente: Cliente) => {
    if (cliente.id) {
      service.atualizar(cliente).then((response) => {
        setMessages([
          {
            tipo: "green-600",
            texto: "Cliente atualizado com sucesso",
          },
        ]);
      });
    } else {
      service.salvar(cliente).then((clienteSalvo) => {
        setCliente(clienteSalvo);
        setMessages([
          {
            tipo: "green-600",
            texto: "Cliente salvo com sucesso",
          },
        ]);
      });
    }
  };

  return (
    <Layout
      titulo="Cadastro de Clientes"
      customClass="lg:w-1/2"
      mensagens={messages}
    >
      <ClienteForm cliente={cliente} onSubmit={handleSubmit} />
    </Layout>
  );
};

export default CadastroCliente;
