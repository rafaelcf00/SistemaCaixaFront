import Button from "../../Common/Button";
import Layout from "../../Common/Layout";
import Input, { InputCPF } from "../../Common/Formulario/Input";
import { useFormik } from "formik";
import ButtonSubmit from "../../Common/Formulario/ButtonSubmit";

interface ConsultaClientesForm {
  nome?: string;
  cpf?: string;
}

const Clientes: React.FC = () => {
  const handleSubmit = (filtro: ConsultaClientesForm) => {
    console.log(filtro);
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

  return (
    <Layout titulo="Clientes" customClass="lg:w-1/2">
      <div className="w-24 mt-6">
        <Button
          label="Novo"
          customClass="bg-yellow-600 hover:bg-yellow-500"
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
    </Layout>
  );
};

export default Clientes;
