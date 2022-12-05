import * as Yup from "yup";

const campoObrigatorioMsg = "Campo Obrigatório";

export const validationSchema = Yup.object().shape({
  cliente: Yup.object().nullable(true).required(campoObrigatorioMsg),
  itens: Yup.array()
    .min(1, "Voçê deve selecionar pelo menos 1 item")
    .required(campoObrigatorioMsg),
  formaPagamento: Yup.string().trim().required(campoObrigatorioMsg),
});
