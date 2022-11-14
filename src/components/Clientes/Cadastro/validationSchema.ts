import * as Yup from "yup";

const campoObrigatorioMsg = "Campo Obrigatório";

export const validationSchema = Yup.object().shape({
  cpf: Yup.string()
    .trim()
    .required(campoObrigatorioMsg)
    .length(14, "CPF Inválido!"),
  dataNascimento: Yup.string()
    .trim()
    .required(campoObrigatorioMsg)
    .length(10, "Data Inválida"),
  email: Yup.string()
    .trim()
    .required(campoObrigatorioMsg)
    .email("E-mail Inválido"),
  endereco: Yup.string().trim().required(campoObrigatorioMsg),
  nome: Yup.string().trim().required(campoObrigatorioMsg),
  telefone: Yup.string().trim().required(campoObrigatorioMsg),
});
