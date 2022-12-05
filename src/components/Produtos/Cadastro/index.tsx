import { useState, useEffect } from "react";
import Layout from "../../Common/Layout";
import ProdutoForm from "./form";
import { Produto } from "../../../app/models/produtos";
import { useProdutoService } from "../../../app/services/produto.service";
import Message from "../../Common/Message";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CadastroProduto: React.FC = () => {
  const [produto, setProduto] = useState<Produto>({});

  const [atualizar, setAtualizar] = useState<boolean>(false);
  const service = useProdutoService();
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      service
        .carregarProduto(id)
        .then((produtoEncontrado) => setProduto(produtoEncontrado));
    }
  }, [id]);

  const handleSubmit = (produto: Produto) => {
    if (produto.id) {
      service.atualizar(produto).then((response) => {
        toast.success("Produto atualizado com sucesso!", {
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
      service.salvar(produto).then((produtoSalvo) => {
        toast.success("Produto salvo com sucesso!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setProduto(produtoSalvo);
      });
    }
  };

  return (
    <Layout titulo="Cadastro de Produtos" customClass="lg:w-full lg:mx-14">
      <ProdutoForm produto={produto} onSubmit={handleSubmit} />
    </Layout>
  );
};

export default CadastroProduto;
