import { Cliente } from "../../../app/models/clientes";
import { useFormik } from "formik";

import { validationSchema } from "./validationSchema";

import Input, {
  InputCPF,
  InputTelefone,
  InputDate,
} from "../../Common/Formulario/Input";
import ButtonSubmit from "../../Common/Formulario/ButtonSubmit/";
import Button from "../../Common/Button/";

interface ClienteFormProps {
  cliente: Cliente;
  onSubmit: (cliente: Cliente) => void;
}

const formScheme: Cliente = {
  cadastro: "",
  cpf: "",
  dataNascimento: "",
  email: "",
  endereco: "",
  id: "",
  nome: "",
  telefone: "",
};

const ClienteForm: React.FC<ClienteFormProps> = ({ cliente, onSubmit }) => {
  const formik = useFormik<Cliente>({
    initialValues: { ...formScheme, ...cliente },
    onSubmit,
    enableReinitialize: true,
    validationSchema: validationSchema,
  });

  console.log(formik.errors);

  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
        {formik.values.id && (
          <div className="md:flex">
            <div className="w-full mr-9">
              <Input
                label="Código: "
                id="inputId"
                value={formik.values.id}
                disabled
              />
            </div>
            <div className="w-full">
              <Input
                label="Data Cadastro: "
                id="inputCadastro"
                value={formik.values.cadastro}
                disabled
              />
            </div>
          </div>
        )}

        <Input
          label="Nome: * "
          type="text"
          id="nome"
          name="nome"
          value={formik.values.nome}
          placeholder="Digite o nome do cliente"
          onChange={formik.handleChange}
          autoComplete="off"
          error={formik.errors.nome}
        />
        <Input
          label="E-mail: * "
          type="text"
          id="email"
          name="email"
          value={formik.values.email}
          placeholder="Digite o e-mail do cliente"
          onChange={formik.handleChange}
          autoComplete="off"
          error={formik.errors.email}
        />
        <div className="flex">
          <div className="w-1/2 mr-6">
            <InputCPF
              label="CPF: * "
              type="text"
              id="cpf"
              name="cpf"
              value={formik.values.cpf}
              placeholder="Digite o cpf do cliente"
              onChange={formik.handleChange}
              autoComplete="off"
              error={formik.errors.cpf}
            />
          </div>
          <div className="w-1/2">
            <InputDate
              label="Data Nascimento: * "
              type="text"
              id="dataNascimento"
              name="dataNascimento"
              value={formik.values.dataNascimento}
              onChange={formik.handleChange}
              autoComplete="off"
              error={formik.errors.dataNascimento}
            />
          </div>
        </div>
        <div className="flex">
          <div className="w-1/2 mr-6">
            <Input
              label="Endereço: * "
              type="text"
              id="endereco"
              name="endereco"
              value={formik.values.endereco}
              placeholder="Digite o endereco do cliente"
              onChange={formik.handleChange}
              autoComplete="off"
              error={formik.errors.endereco}
            />
          </div>
          <div className="w-1/2">
            <InputTelefone
              label="Telefone: * "
              type="text"
              id="telefone"
              name="telefone"
              value={formik.values.telefone}
              placeholder="Digite o telefone do cliente"
              onChange={formik.handleChange}
              autoComplete="off"
              error={formik.errors.telefone}
            />
          </div>
        </div>

        <div className="mt-8 flex w-1/4">
          <div className="mr-3 w-full">
            <Button
              label="Voltar"
              customClass="bg-red-600 hover:bg-red-400"
              href="ListagemClientes/"
            />
          </div>
          <div className="w-full">
            {formik.values.id ? (
              <ButtonSubmit
                label="Atualizar"
                customClass="bg-green-600 hover:bg-green-500"
              />
            ) : (
              <ButtonSubmit
                label="Salvar"
                customClass="bg-green-600 hover:bg-green-500"
              />
            )}
          </div>
        </div>
      </div>
    </form>
  );
};

export default ClienteForm;
