import Button from "../../../components/Common/Button";
import Layout from "../../../components/Common/Layout";
import Input, { InputCPF } from "../../Common/Formulario/Input";
import { Produto } from "../../../app/models/produtos";
import Router from "next/router";
import { useProdutoService } from "../../../app/services/produto.service";
import { useState, useEffect } from "react";
import { Page } from "../../../app/models/common/page";
import { useFormik } from "formik";
import ButtonSubmit from "../../Common/Formulario/ButtonSubmit";
import { DataTable, DataTablePageParams } from "primereact/datatable";
import { Column } from "primereact/column";
import { MdCheck, MdEdit, MdRedo, MdDelete } from "react-icons/md";

interface ConsultaProdutosForm {
  nome?: string;
}

const Produtos: React.FC = () => {
  const service = useProdutoService();
  const [loading, setLoading] = useState<boolean>(false);
  const [deletando, setDeletando] = useState<boolean>(false);

  const [produto, setProdutos] = useState<Page<Produto>>({
    content: [],
    first: 0,
    number: 0,
    size: 5,
    totalElements: 5,
  });

  const handleSubmit = (filtro: ConsultaProdutosForm) => {
    //@ts-ignore
    handlePage(null);
  };

  const {
    handleSubmit: formikSubmit,
    values: filtro,
    handleChange,
  } = useFormik<ConsultaProdutosForm>({
    onSubmit: handleSubmit,
    initialValues: {
      nome: "",
    },
  });

  const handlePage = (e: DataTablePageParams) => {
    setLoading(true);
    service
      .find(filtro.nome, e?.page, e?.rows)
      .then((result) => {
        setProdutos({ ...result, first: e?.first });
      })
      .finally(() => setLoading(false));
  };

  const onDelete = (produto: Produto) => {
    if (deletando) {
      service.deletar(produto.id).then((result) => {
        //@ts-ignore
        handlePage(null);
        setDeletando(false);
      });
    } else {
      setDeletando(true);
    }
  };

  const cancelaDelete = () => setDeletando(false);

  const actionTemplate = (registro: Produto) => {
    const url = `/CadastroProdutos/?id=${registro.id}`;

    return (
      <>
        <div>
          {!deletando && (
            <button onClick={(e) => Router.push(url)}>
              <MdEdit className="text-xl text-blue-700 transition-all duration-700 hover:text-blue-900 mr-3" />
            </button>
          )}
          <button onClick={(e) => onDelete(registro)} className="">
            {deletando ? (
              <MdCheck className="text-xl text-green-600 transition-all duration-700 hover:text-green-900 mr-3" />
            ) : (
              <MdDelete className="text-xl text-red-600 transition-all duration-700 hover:text-red-900" />
            )}
          </button>
          {deletando && (
            <button onClick={cancelaDelete} className=" ">
              <MdRedo className="text-xl text-red-600 transition-all duration-700 hover:text-red-900" />
            </button>
          )}
        </div>
      </>
    );
  };

  return (
    <Layout titulo="Produtos" customClass="lg:w-full lg:mx-14">
      <div className="w-24 mt-6">
        <Button
          label="Novo"
          customClass="bg-yellow-600 hover:bg-yellow-500 p-3"
          href="CadastroProdutos/"
        />
      </div>

      <form onSubmit={formikSubmit}>
        <div className="flex mt-6">
          <div className="w-full mr-12">
            <Input
              label="Nome"
              id="nome"
              name="nome"
              value={filtro.nome}
              autoComplete="off"
              onChange={handleChange}
              customClass="bg-gray-50 border-2 border-solid border-gray-200"
            />
          </div>
        </div>

        <div className="mt-8 w-28">
          <ButtonSubmit
            label="Consultar"
            customClass="bg-green-600 hover:bg-green-500"
          />
        </div>
      </form>

      <div className="mt-12">
        <div className="w-full justify-center">
          <DataTable
            value={produto.content}
            totalRecords={produto.totalElements}
            lazy={true}
            paginator={true}
            first={produto.first}
            rows={produto.size}
            onPage={handlePage}
            loading={loading}
            responsiveLayout="scroll"
            emptyMessage="Nenhum registro encontrado"
          >
            <Column field="id" header="Código" />
            <Column field="nome" header="Nome" />
            <Column field="estoque" header="Estoque" />
            <Column field="preco" header="Preço" />
            <Column body={actionTemplate} />
          </DataTable>
          {produto.totalElements > produto.size ? (
            <h1 className="text-gray-600">
              Mostrando um total de {produto.size}, de {produto.totalElements}{" "}
              registros
            </h1>
          ) : (
            <h1 className="text-gray-600">
              Mostrando um total de {produto.totalElements}, de{" "}
              {produto.totalElements} registros
            </h1>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Produtos;
