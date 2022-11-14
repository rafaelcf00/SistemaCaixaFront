import Button from "../../../components/Common/Button";
import Layout from "../../../components/Common/Layout";
import { TabelaProdutos } from "./tabela";
import { Produto } from "../../../app/models/produtos";
import useSWR from "swr";
import { httpClient } from "../../../app/http";
import { AxiosResponse } from "axios";
import { Loader } from "../../../components/Common/Loader";
import Router from "next/router";
import { useProdutoService } from "../../../app/services/produto.service";
import { useState, useEffect } from "react";
import { Alert } from "../../../components/Common/Message";

const Produtos: React.FC = () => {
  const service = useProdutoService();
  const [messages, setMessages] = useState<Array<Alert>>([]);

  const { data: result, error } = useSWR<AxiosResponse<Produto[]>>(
    "/api/produtos",
    (url) => httpClient.get(url)
  );

  const [lista, setLista] = useState<Produto[]>([]);

  useEffect(() => {
    setLista(result?.data || []);
  }, [result]);

  const editar = (produto: Produto) => {
    const url = `/CadastroProdutos/?id=${produto.id}`;
    Router.push(url);
  };

  const deletar = (produto: Produto) => {
    service.deletar(produto.id).then((response) => {
      setMessages([
        { tipo: "green-600", texto: "Produto excluído com sucesso!" },
      ]);
      const listaAlterada: Produto[] = lista?.filter((p) => p.id != produto.id);
      setLista(listaAlterada);
    });
  };

  return (
    <Layout titulo="Produtos" customClass="lg:w-1/2" mensagens={messages}>
      <div className="w-24 mt-6">
        <Button
          label="Novo"
          customClass="bg-yellow-600 hover:bg-yellow-500"
          href="CadastroProdutos/"
        />
      </div>

      <div className="w-full max-h-96 overflow-auto">
        <Loader show={!result} />
        <TabelaProdutos onEdit={editar} onDelete={deletar} produtos={lista} />
      </div>
    </Layout>
  );
};

export default Produtos;
