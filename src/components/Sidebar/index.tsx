import MenuItem from "../Menu";

const Sidebar: React.FC = () => {
  return (
    <aside className="bg-white col-span-0 md:col-span-1 min-h-screen hidden lg:flex shadow-lg ">
      <div className="p-6 fixed">
        <h1 className="mb-12 text-xl font-bold block">Sistema de Caixa</h1>
        <ul>
          <MenuItem name="Home" href="/" />
          <MenuItem name="Produtos" href="ListagemProdutos/" />
          <MenuItem name="Clientes" href="ListagemClientes/" />
          <MenuItem name="Venda" href="Vendas/" />
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
