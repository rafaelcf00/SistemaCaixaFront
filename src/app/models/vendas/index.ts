import { Cliente } from "../clientes";
import { Produto } from "../produtos";

export interface Venda {
  cliente?: Cliente;
  itens?: Array<ItemVenda>;
  formaPagamento?: string;
  totalVenda: number;
}

export interface ItemVenda {
  produto: Produto;
  quantidade: number;
}
