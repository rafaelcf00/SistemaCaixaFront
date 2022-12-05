import Button from "../../Common/Button";
import Layout from "../../Common/Layout";
import Input, { InputCPF } from "../../Common/Formulario/Input";
import { useFormik } from "formik";
import ButtonSubmit from "../../Common/Formulario/ButtonSubmit";
import { DataTable, DataTablePageParams } from "primereact/datatable";
import { Column } from "primereact/column";

import { useState, useEffect } from "react";
import { Cliente } from "../../../app/models/clientes";
import { Page } from "../../../app/models/common/page";
import { useClienteService } from "../../../app/services/cliente.service";
import { MdCheck, MdEdit, MdRedo, MdDelete } from "react-icons/md";

import Router from "next/router";

interface ConsultaClientesForm {
  nome?: string;
  cpf?: string;
}

const Clientes: React.FC = () => {
  const service = useClienteService();
  const [loading, setLoading] = useState<boolean>(false);
  const [deletando, setDeletando] = useState<boolean>(false);

  const [clientes, setClientes] = useState<Page<Cliente>>({
    content: [],
    first: 0,
    number: 0,
    size: 5,
    totalElements: 5,
  });

  const handleSubmit = (filtro: ConsultaClientesForm) => {
    //@ts-ignore
    handlePage(null);
  };

  const {
    handleSubmit: formikSubmit,
    values: filtro,
    handleChange,
  } = useFormik<ConsultaClientesForm>({
    onSubmit: handleSubmit,
    initialValues: {
      nome: "",
      cpf: "",
    },
  });

  const handlePage = (e: DataTablePageParams) => {
    setLoading(true);
    service
      .find(filtro.nome, filtro.cpf, e?.page, e?.rows)
      .then((result) => {
        setClientes({ ...result, first: e?.first });
      })
      .finally(() => setLoading(false));
  };

  const onDelete = (cliente: Cliente) => {
    if (deletando) {
      service.deletar(cliente.id).then((result) => {
        //@ts-ignore
        handlePage(null);
        setDeletando(false);
      });
    } else {
      setDeletando(true);
    }
  };

  const cancelaDelete = () => setDeletando(false);

  const actionTemplate = (registro: Cliente) => {
    const url = `/CadastroClientes/?id=${registro.id}`;

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
    <Layout titulo="Clientes" customClass="lg:w-full lg:mx-14">
      <div className="w-24 mt-6">
        <Button
          label="Novo"
          customClass="bg-yellow-600 hover:bg-yellow-500 p-3"
          href="CadastroClientes/"
        />
      </div>
      <form onSubmit={formikSubmit}>
        <div className="flex mt-6">
          <div className="w-1/2 mr-12">
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
          <div className="w-1/2">
            <InputCPF
              label="CPF"
              id="cpf"
              name="cpf"
              value={filtro.cpf}
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
            value={clientes.content}
            totalRecords={clientes.totalElements}
            lazy={true}
            paginator={true}
            first={clientes.first}
            rows={clientes.size}
            onPage={handlePage}
            loading={loading}
            responsiveLayout="scroll"
            emptyMessage="Nenhum registro encontrado"
          >
            <Column field="id" header="Código" />
            <Column field="nome" header="Nome" />
            <Column field="cpf" header="CPF" />
            <Column field="email" header="E-mail" />
            <Column body={actionTemplate} />
          </DataTable>
          {clientes.totalElements > clientes.size ? (
            <h1 className="text-gray-600">
              Mostrando um total de {clientes.size}, de {clientes.totalElements}{" "}
              registros
            </h1>
          ) : (
            <h1 className="text-gray-600">
              Mostrando um total de {clientes.totalElements}, de{" "}
              {clientes.totalElements} registros
            </h1>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Clientes;
