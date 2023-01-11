import { Card } from "primereact/card";
import { Chart } from "primereact/chart";
import { VendaPorMes } from "../../app/models/dashboard";
import { useState, useEffect } from "react";
import { MESES } from "../../app/util/meses";

interface DashboardProps {
  clientes?: number;
  produtos?: number;
  vendas?: number;
  vendasPorMes?: VendaPorMes[];
}

const Dashboard: React.FC<DashboardProps> = ({
  clientes,
  produtos,
  vendas,
  vendasPorMes,
}) => {
  const [chartData, setChartData] = useState({});

  const carregaDadosGrafico = () => {
    //@ts-ignore
    const labels: string[] = vendasPorMes?.map((vm) => MESES[vm.mes - 1]);
    const valores = vendasPorMes?.map((vm) => vm.valor);

    const dadosGrafico = {
      labels: labels,
      datasets: [
        {
          label: "Valor Mensal",
          backgroundColor: "#42A5F5",
          data: valores,
        },
      ],
    };

    setChartData(dadosGrafico);
  };

  useEffect(carregaDadosGrafico, []);

  const produtosCardStyle = {
    background: "red",
    color: "white",
  };

  const clientesCardStyle = {
    background: "blue",
    color: "white",
  };

  const vendasCardStyle = {
    background: "green",
    color: "white",
  };

  return (
    <div>
      <div className="grid grid-cols-12">
        <div className="col-span-4 mr-6">
          <Card title="Produtos" style={produtosCardStyle}>
            <p>{produtos}</p>
          </Card>
        </div>
        <div className="col-span-4 mr-6">
          <Card title="Clientes" style={clientesCardStyle}>
            <p>{clientes}</p>
          </Card>
        </div>
        <div className="col-span-4 mr-6">
          <Card title="Vendas" style={vendasCardStyle}>
            <p>{vendas}</p>
          </Card>
        </div>
      </div>
      <div className="w-full mt-16">
        <div className="w-full">
          <Chart
            type="bar"
            data={chartData}
            style={{ position: "relative", width: "100%" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
