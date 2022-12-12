import { Venda, ItemVenda } from "../../app/models/vendas";
import { useFormik } from "formik";
import {
  AutoComplete,
  AutoCompleteChangeParams,
  AutoCompleteCompleteMethodParams,
} from "primereact/autocomplete";
import { useState, useEffect } from "react";
import { Page } from "../../app/models/common/page";
import { Cliente } from "../../app/models/clientes";
import { useClienteService } from "../../app/services/cliente.service";
import ButtonSubmit from "../Common/Formulario/ButtonSubmit";
import { InputText } from "primereact/inputtext";
import Button from "../Common/Button";
import { useProdutoService } from "../../app/services/produto.service";
import { Produto } from "../../app/models/produtos";
import { Dialog } from "primereact/dialog";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dropdown } from "primereact/dropdown";
import { validationSchema } from "./validationSchema";
import { MdCheck, MdEdit, MdRedo, MdDelete } from "react-icons/md";

const formatadorMoney = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

interface VendasFormProps {
  onSubmit: (venda: Venda) => void;
  vendaRealizada: boolean;
  onNovaVenda: () => void;
}

const formScheme: Venda = {
  //@ts-ignore
  cliente: null,
  itens: [],
  totalVenda: 0,
  formaPagamento: "",
};

const VendasForm: React.FC<VendasFormProps> = ({
  onSubmit,
  vendaRealizada,
  onNovaVenda,
}) => {
  const formasPagamento: String[] = [
    "DINHEIRO",
    "CARTÃO DE CRÉDITO",
    "CARTÃO DE DÉBITO",
    "PIX",
  ];
  const clienteService = useClienteService();
  const produtoService = useProdutoService();
  const [listaProdutos, setListaProdutos] = useState<Produto[]>([]);
  const [listaFiltradaProdutos, setListaFiltradaProdutos] = useState<Produto[]>(
    []
  );
  const [mensagem, setMensagem] = useState<String>("");
  const [codigoProduto, setCodigoProduto] = useState<String>("");
  const [estoque, setEstoque] = useState<number>(0);
  const [quantidadeProduto, setQuantidadeProduto] = useState<number>(0);
  const [valorRecebido, setValorRecebido] = useState<number>(0);
  const [produto, setProduto] = useState<Produto>(null);
  const [listaClientes, setListaClientes] = useState<Page<Cliente>>({
    content: [],
    first: 0,
    number: 0,
    size: 0,
    totalElements: 0,
  });

  const formik = useFormik<Venda>({
    onSubmit,
    initialValues: formScheme,
    validationSchema: validationSchema,
  });

  const handleClienteAutoComplete = (e: AutoCompleteCompleteMethodParams) => {
    const nome = e.query;
    clienteService
      .find(nome, "", 0, 20)
      .then((clientes) => setListaClientes(clientes));
  };

  const handleClienteChange = (e: AutoCompleteChangeParams) => {
    const clienteSelecionado: Cliente = e.value;
    formik.setFieldValue("cliente", clienteSelecionado);
  };

  const handleCodigoProdutoSelect = (e) => {
    if (codigoProduto) {
      produtoService
        .carregarProduto(codigoProduto)
        .then((produtoEncontrado) => setProduto(produtoEncontrado))
        .catch((error) => {
          setMensagem("Produto não encontrado!");
        });
    }
  };

  const handleAddProduto = () => {
    const itensAdicionados = formik.values.itens;
    const jaExisteOItemNaVenda = itensAdicionados?.some((iv: ItemVenda) => {
      return iv.produto.id === produto.id;
    });
    if (jaExisteOItemNaVenda) {
      itensAdicionados?.forEach((iv: ItemVenda) => {
        if (iv.produto.id === produto.id) {
          iv.quantidade += quantidadeProduto;
        }
      });
    } else {
      itensAdicionados?.push({
        produto: produto,
        quantidade: quantidadeProduto,
      });
    }

    setProduto(null);
    setCodigoProduto("");
    setQuantidadeProduto(0);
    setEstoque(produto.estoque - quantidadeProduto);

    const total = totalVenda();
    formik.setFieldValue("totalVenda", total);
  };

  const handleFecharDialogProdutoNaoEncontrado = () => {
    setMensagem("");
    setCodigoProduto("");
    setProduto(null);
  };

  const dialogMensagemFooter = () => {
    return (
      <div>
        <Button
          href=""
          label="Ok"
          onClick={handleFecharDialogProdutoNaoEncontrado}
          customClass="bg-blue-600 p-3"
        />
      </div>
    );
  };

  const disableAddProdutoButton = () => {
    return !produto || !quantidadeProduto;
  };

  let values;
  let arr = [];

  const handleProdutoAutocomplete = async (
    e: AutoCompleteCompleteMethodParams
  ) => {
    if (!listaProdutos.length) {
      const produtosEncontrados = await produtoService.listar();

      values = Object.values(produtosEncontrados)[0];

      for (const value of values) {
        arr.push(value);
      }
    }

    const produtosFiltradosEncontrados = arr.filter((produto: Produto) => {
      return produto.nome.toUpperCase().includes(e.query.toUpperCase());
    });

    setListaFiltradaProdutos(produtosFiltradosEncontrados);

    if (produtosFiltradosEncontrados.length == 0) {
      setMensagem("Produto não encontrado!");
    }
  };

  const handleProdutoChange = (e: AutoCompleteChangeParams) => {
    const produtoSelecionado: Produto = e.value;
    setProduto(produtoSelecionado);
  };

  const totalVenda = () => {
    const totais: number[] = formik.values.itens?.map(
      (iv) => iv.quantidade * iv.produto.preco
    );
    if (totais.length) {
      return totais.reduce(
        (somatoriaAtual = 0, valorItemAtual) => somatoriaAtual + valorItemAtual
      );
    } else {
      return 0;
    }
  };

  const realizarNovaVenda = () => {
    onNovaVenda();
    formik.resetForm();
    formik.setFieldValue("itens", []);
    formik.setFieldTouched("itens", false);
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="p-fluid">
        <div className="p-field">
          <div className="mb-4">
            <label htmlFor="cliente">
              Cliente: <span className="text-red-600 font-bold">*</span>
            </label>
          </div>
          <AutoComplete
            completeMethod={handleClienteAutoComplete}
            id="cliente"
            name="cliente"
            field="nome"
            value={formik.values.cliente}
            suggestions={listaClientes.content}
            onChange={handleClienteChange}
          />
          <span className="block text-red-600 text-md">
            {formik.errors.cliente}
          </span>
        </div>
        <div className="grid grid-cols-12 mt-6">
          <div className="col-span-2 mr-6">
            <span className="p-float-label">
              <InputText
                id="codigoProduto"
                onBlur={handleCodigoProdutoSelect}
                value={codigoProduto}
                onChange={(e) => setCodigoProduto(e.target.value)}
              />
              <label htmlFor="codigo">Código</label>
            </span>
          </div>
          <div className="col-span-6 mr-6">
            <AutoComplete
              suggestions={listaFiltradaProdutos}
              id="produto"
              name="produto"
              completeMethod={handleProdutoAutocomplete}
              value={produto}
              field="nome"
              onChange={handleProdutoChange}
            />
          </div>
          <div className="col-span-2 mr-6">
            <span className="p-float-label">
              <InputText
                id="qtdProduto"
                value={quantidadeProduto}
                onChange={(e) => setQuantidadeProduto(parseInt(e.target.value))}
              />
              <label htmlFor="qtdProduto">QTD</label>
            </span>
          </div>
          <div className="col-span-2">
            <Button
              href=""
              label="Adicionar"
              customClass="bg-blue-700 p-2"
              onClick={handleAddProduto}
              disabled={disableAddProdutoButton()}
            />
          </div>
          <div className="mt-12 col-span-12">
            <DataTable
              value={formik.values.itens}
              emptyMessage="Nenhum produto adicionado"
            >
              <Column
                body={(item: ItemVenda) => {
                  const handleRemoveItem = () => {
                    const novaLista = formik.values.itens?.filter(
                      (iv) => iv.produto.id !== item.produto.id
                    );
                    formik.setFieldValue("itens", novaLista);
                  };

                  return (
                    <button type="button" onClick={handleRemoveItem}>
                      <MdDelete className="text-xl text-red-600 transition-all duration-700 hover:text-red-900" />
                    </button>
                  );
                }}
              />
              <Column field="produto.id" header="Código" />
              <Column field="produto.nome" header="Produto" />
              <Column field="produto.preco" header="Preço Unitário" />
              <Column
                header="Estoque atual"
                body={(iv: ItemVenda) => {
                  const estoqueTotal = iv.produto.estoque - iv.quantidade;

                  return <div>{estoqueTotal}</div>;
                }}
              />
              <Column field="quantidade" header="Quantidade" />
              <Column
                header="Total"
                body={(iv: ItemVenda) => {
                  const total = iv.produto.preco * iv.quantidade;
                  const totalFormatado = formatadorMoney.format(total);

                  return <div>{totalFormatado}</div>;
                }}
              />
            </DataTable>
            <span className="block text-red-600 text-md">
              {formik.touched && formik.errors.itens}
            </span>
          </div>
          <div className="flex col-span-12">
            <div className="col-span-4 my-12">
              <label htmlFor="formaPagamento">Forma de Pagamento: *</label>
              <div className="mt-2">
                <Dropdown
                  id="formaPagamento"
                  options={formasPagamento}
                  value={formik.values.formaPagamento}
                  onChange={(e) =>
                    formik.setFieldValue("formaPagamento", e.value)
                  }
                  placeholder="Selecione a forma de pagamento"
                />
                <span className="block text-red-600 text-md">
                  {formik.touched && formik.errors.formaPagamento}
                </span>
              </div>
            </div>
            <div className="col-span-2 my-12 ml-5">
              <label htmlFor="itens">Itens:</label>
              <div className="mt-2">
                <InputText disabled value={formik.values.itens?.length} />
              </div>
            </div>
            <div className="col-span-2 my-12 ml-auto">
              <label htmlFor="itens">Valor Total:</label>
              <div className="mt-2">
                <InputText
                  disabled
                  value={formatadorMoney.format(formik.values.totalVenda)}
                />
              </div>
            </div>
          </div>
          <div className="flex col-span-12">
            <div className="col-span-2 my-3">
              <label htmlFor="valorRecebido">Valor recebido:</label>
              <div className="mt-2">
                <InputText
                  value={formatadorMoney.format(valorRecebido)}
                  onChange={(e) => setValorRecebido(parseInt(e.target.value))}
                />
              </div>
            </div>

            {formik.values.totalVenda < valorRecebido && (
              <div className="col-span-2 my-3 ml-8">
                <label htmlFor="trocoValor">Troco:</label>
                <div className="mt-2">
                  <InputText
                    disabled
                    value={formatadorMoney.format(
                      valorRecebido - formik.values.totalVenda
                    )}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
        {!vendaRealizada && (
          <ButtonSubmit
            label="Finalizar"
            customClass="text-white bg-blue-700 mt-5"
          />
        )}

        {vendaRealizada && (
          <Button
            href=""
            label="Nova Venda"
            onClick={realizarNovaVenda}
            customClass="text-white bg-green-700 mt-5 p-3"
          />
        )}
      </div>
      <Dialog
        header="Atençao!"
        position="top"
        visible={!!mensagem}
        footer={dialogMensagemFooter}
        onHide={handleFecharDialogProdutoNaoEncontrado}
      >
        {mensagem}
      </Dialog>
    </form>
  );
};

export default VendasForm;
