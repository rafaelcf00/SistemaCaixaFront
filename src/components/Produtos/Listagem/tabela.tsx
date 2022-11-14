import { useState } from "react";
import { Produto } from "../../../app/models/produtos";

import { MdCheck, MdEdit, MdRedo } from "react-icons/md";
import { MdDelete } from "react-icons/md";

interface TabelaProdutosProps {
  produtos: Array<Produto>;
  onEdit: (produto) => void;
  onDelete: (produto) => void;
}

export const TabelaProdutos: React.FC<TabelaProdutosProps> = ({
  produtos,
  onDelete,
  onEdit,
}) => {
  return (
    <div className="mt-12 w-max">
      <table className="w-full text-left">
        <thead className="">
          <tr className="border border-solid border-collapse">
            <th className="px-6 py-3">Código</th>
            <th className="px-6 py-3">Nome</th>
            <th className="px-6 py-3">Descrição</th>
            <th className="px-6 py-3">Preço</th>
            <th className="px-6 py-3"></th>
          </tr>
        </thead>
        <tbody>
          {produtos.map((produto) => (
            <ProdutoRow
              onDelete={onDelete}
              onEdit={onEdit}
              key={produto.id}
              produto={produto}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

interface ProdutoRowProps {
  produto: Produto;
  onEdit: (produto) => void;
  onDelete: (produto) => void;
}

const ProdutoRow: React.FC<ProdutoRowProps> = ({
  produto,
  onDelete,
  onEdit,
}) => {
  const [deletando, setDeletando] = useState<boolean>(false);

  const onDeleteClick = (produto: Produto) => {
    if (deletando) {
      onDelete(produto);
      setDeletando(false);
    } else {
      setDeletando(true);
    }
  };

  const cancelaDelete = () => setDeletando(false);

  return (
    <>
      <tr className="border border-solid border-collapse">
        <td className="px-6 py-3">{produto.id}</td>
        <td className="px-6 py-3">{produto.nome}</td>
        <td className="px-6 py-3">{produto.descricao}</td>
        <td className="px-6 py-3">{produto.preco}</td>
        <td className="px-6 py-3">
          <div className="">
            {!deletando && (
              <button onClick={(e) => onEdit(produto)} className="">
                <MdEdit className="text-xl text-blue-700 transition-all duration-700 hover:text-blue-900 mr-3" />
              </button>
            )}
            <button onClick={(e) => onDeleteClick(produto)} className="">
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
        </td>
      </tr>
    </>
  );
};
