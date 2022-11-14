import { useState } from "react";
import Layout from "../../Common/Layout";
import ProdutoForm from "./form";
import { Produto } from "../../../app/models/produtos";
import { useProdutoService } from "../../../app/services/produto.service";
import { Alert } from "../../Common/Message";

const CadastroProduto: React.FC = () => {
  const [produto, setProduto] = useState<Produto>({});
  const [messages, setMessages] = useState<Array<Alert>>([]);
  const service = useProdutoService();

  const handleSubmit = (produto: Produto) => {
    console.log(produto);
    if (produto.id) {
      service.atualizar(produto).then((response) => {
        setMessages([
          {
            tipo: "green-600",
            texto: "Produto atualizado com sucesso",
          },
        ]);
      });
    } else {
      service.salvar(produto).then((produtoSalvo) => {
        setProduto(produtoSalvo);
        setMessages([
          {
            tipo: "green-600",
            texto: "Produto salvo com sucesso",
          },
        ]);
      });
    }
  };

  return (
    <Layout
      titulo="Cadastro de Produtos"
      customClass="lg:w-1/2"
      mensagens={messages}
    >
      <ProdutoForm produto={produto} onSubmit={handleSubmit} />
    </Layout>
  );
};

export default CadastroProduto;
