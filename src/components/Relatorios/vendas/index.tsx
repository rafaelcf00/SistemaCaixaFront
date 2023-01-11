import Layout from "../../Common/Layout";
import { useFormik } from "formik";
import {
  AutoComplete,
  AutoCompleteChangeParams,
  AutoCompleteCompleteMethodParams,
} from "primereact/autocomplete";
import { Cliente } from "../../../app/models/clientes";
import { Page } from "../../../app/models/common/page";
import { useState } from "react";
import { useClienteService } from "../../../app/services/cliente.service";
import ButtonSubmit from "../../Common/Formulario/ButtonSubmit";
import Input, { InputDate } from "../../Common/Formulario/Input";
import { useVendaService } from "../../../app/services/vendas.service";

interface RelatorioVendasForm {
  cliente: Cliente;
  dataInicio: string;
  dataFim: string;
}

const RelatorioVendas: React.FC = () => {
  const clienteService = useClienteService();
  const vendaService = useVendaService();

  const [listaClientes, setListaClientes] = useState<Page<Cliente>>({
    content: [],
    first: 0,
    number: 0,
    size: 20,
    totalElements: 0,
  });

  const handleSubmit = (formData: RelatorioVendasForm) => {
    vendaService
      .gerarRelatorioVendas(
        formData.cliente?.id,
        formData.dataInicio,
        formData.dataFim
      )
      .then((blob) => {
        const fileURL = URL.createObjectURL(blob);
        window.open(fileURL);
      });
  };

  const formik = useFormik<RelatorioVendasForm>({
    onSubmit: handleSubmit,
    //@ts-ignore
    initialValues: { cliente: null, dataFim: "", dataInicio: "" },
  });

  const handleClienteAutoComplete = (e: AutoCompleteCompleteMethodParams) => {
    const nome = e.query;
    clienteService
      .find(nome, "", 0, 20)
      .then((clientes) => setListaClientes(clientes));
  };

  return (
    <Layout titulo="Relatório de Vendas" customClass="lg:w-full lg:mx-14">
      <form onSubmit={formik.handleSubmit}>
        <div className="grid grid-cols-12 p-fluid">
          <div className="col-span-12">
            <AutoComplete
              completeMethod={handleClienteAutoComplete}
              id="cliente"
              name="cliente"
              field="nome"
              value={formik.values.cliente}
              suggestions={listaClientes.content}
              onChange={(e: AutoCompleteChangeParams) => {
                formik.setFieldValue("cliente", e.value);
              }}
            />
          </div>
          <div className="mt-6 col-span-12 flex">
            <div className="w-full mr-24">
              <InputDate
                label="Data de Início:"
                id="dataInicio"
                name="dataInicio"
                value={formik.values.dataInicio}
                onChange={formik.handleChange}
              />
            </div>
            <div className="w-full">
              <InputDate
                label="Data Fim:"
                id="dataFim"
                name="dataFim"
                value={formik.values.dataFim}
                onChange={formik.handleChange}
              />
            </div>
          </div>
          <div className="col-span-12">
            <ButtonSubmit
              label="Gerar Relatório"
              customClass="text-white bg-blue-700 mt-5 w-full"
            />
          </div>
        </div>
      </form>
    </Layout>
  );
};

export default RelatorioVendas;
