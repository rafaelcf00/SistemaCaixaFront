import * as Yup from "yup";

const campoObrigatorioMsg = "Campo Obrigatório";

export const validationSchema = Yup.object().shape({
  nome: Yup.string().trim().required(campoObrigatorioMsg),
  preco: Yup.number().required(campoObrigatorioMsg),
  estoque: Yup.number().required(campoObrigatorioMsg),
});
