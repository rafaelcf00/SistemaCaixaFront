import { Venda } from "../../app/models/vendas";
import Layout from "../Common/Layout";
import VendasForm from "./form";
import { useVendaService } from "../../app/services/vendas.service";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";

const Vendas: React.FC = () => {
  const service = useVendaService();
  const [vendaRealizada, setVendaRealizada] = useState<boolean>(false);

  const handleSubmit = (venda: Venda) => {
    service
      .realizarVenda(venda)
      .then((res) => {
        toast.success("Venda realizada com sucesso!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setVendaRealizada(true);
      })
      .catch((err) => {
        toast.error("Ocorreu um erro, entre em contato com a administração", {
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
  };

  const handleNovaVenda = () => {
    setVendaRealizada(false);
  };

  return (
    <Layout titulo="Venda" customClass="lg:w-full lg:mx-14">
      <VendasForm
        onSubmit={handleSubmit}
        vendaRealizada={vendaRealizada}
        onNovaVenda={handleNovaVenda}
      />
    </Layout>
  );
};

export default Vendas;
