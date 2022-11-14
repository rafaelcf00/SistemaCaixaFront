import { Produto } from "../../../app/models/produtos";
import { useFormik } from "formik";
import { validationSchema } from "./validationSchema";

import Input, { InputMoney } from "../../Common/Formulario/Input";
import ButtonSubmit from "../../Common/Formulario/ButtonSubmit/";
import Button from "../../Common/Button/";
import TextArea from "../../Common/Formulario/Textarea";

interface ProdutoFormProps {
  produto: Produto;
  onSubmit: (produto: Produto) => void;
}

const formScheme: Produto = {
  nome: "",
  preco: undefined,
  descricao: "",
  id: "",
  cadastro: "",
};

const ProdutoForm: React.FC<ProdutoFormProps> = ({ produto, onSubmit }) => {
  const formik = useFormik<Produto>({
    initialValues: { ...formScheme, ...produto },
    onSubmit,
    enableReinitialize: true,
    validationSchema: validationSchema,
  });

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
          placeholder="Digite o nome do produto"
          onChange={formik.handleChange}
          autoComplete="off"
          error={formik.errors.nome}
        />

        <Input
          label="Preço: * "
          type="text"
          id="preco"
          name="preco"
          value={formik.values.preco}
          placeholder="Digite o preço do produto"
          onChange={formik.handleChange}
          autoComplete="off"
          maxLength={16}
          error={formik.errors.preco}
        />

        <div className="flex flex-col">
          <label htmlFor="" className="font-bold">
            Descrição
          </label>
          <TextArea
            id="descricao"
            name="descricao"
            value={formik.values.descricao}
            onChange={formik.handleChange}
            error={formik.errors.descricao}
          />
        </div>

        <div className="mt-8 flex w-1/4">
          <div className="mr-3 w-full">
            <Button
              label="Voltar"
              customClass="bg-red-600 hover:bg-red-400"
              href="ListagemProdutos/"
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

export default ProdutoForm;
