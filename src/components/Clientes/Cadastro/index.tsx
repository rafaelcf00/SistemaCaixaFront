import { useState, useEffect } from "react";
import Layout from "../../Common/Layout";
import ClienteForm from "./form";
import { Cliente } from "../../../app/models/clientes";
import { useClienteService } from "../../../app/services/cliente.service";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CadastroCliente: React.FC = () => {
  const [cliente, setCliente] = useState<Cliente>({});
  const [atualizar, setAtualizar] = useState<boolean>(false);
  const service = useClienteService();
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      service
        .carregarCliente(id)
        .then((clienteEncontrado) => setCliente(clienteEncontrado));
    }
  }, [id]);

  const handleSubmit = (cliente: Cliente) => {
    if (cliente.id) {
      service.atualizar(cliente).then((response) => {
        toast.success("Cliente atualizado com sucesso!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
    } else {
      service.salvar(cliente).then((clienteSalvo) => {
        toast.success("Cliente salvo com sucesso!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setCliente(clienteSalvo);
      });
    }
  };

  return (
    <Layout titulo="Cadastro de Clientes" customClass="lg:w-full lg:mx-14">
      <ClienteForm cliente={cliente} onSubmit={handleSubmit} />
    </Layout>
  );
};

export default CadastroCliente;
