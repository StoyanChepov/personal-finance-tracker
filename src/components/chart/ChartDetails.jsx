import { Link, useParams } from "react-router-dom";
import { GetAggregatedExpenses } from "../../hooks/useExpenseHooks";
import Chart from "./Chart";

export default function ChartDetails() {
  const { chartId } = useParams();
  console.log("chartId", chartId);

  // const [chart, setChart] = getOneChart(chartId);
  const [chart] = GetAggregatedExpenses(chartId);

  const chartData = {
    _id: 1,
    data: {
      labels: chart.map((data) => data.category),
      datasets: [
        {
          label: "Expense By Category",
          data: chart.map((data) => data.total),
          borderColor: "rgb(75, 192, 192)",
        },
      ],
    },
    options: {
      responsive: false,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "Chart.js Line Chart By Category",
        },
      },
    },
  };

  return (
    <div className="chart-details">
      <Chart key={chartData._id} {...chartData} />
    </div>
  );
}
