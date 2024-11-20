import Chart from "./Chart";
import { GetAggregatedExpenses } from "../../hooks/useExpenseHooks";

export default function ChartList() {
  const [chartDataExpensesGroupedByCategory] = GetAggregatedExpenses('expense', 1);
  const [chartDataExpensesGroupedByMonth] = GetAggregatedExpenses('expense', 2);
  const [chartDataIncomeGroupedByCategory] = GetAggregatedExpenses('income', 1);
  const [chartDataIncomeGroupedByMonth] = GetAggregatedExpenses('income', 2);

  const [charts] = [
    [
      {
        _id: 1,
        type: "bar",
        data: {
          labels: chartDataExpensesGroupedByCategory.map(
            (data) => data.category
          ),
          datasets: [
            {
              label: "Expense By Category",
              data: chartDataExpensesGroupedByCategory.map(
                (data) => data.total
              ),
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
      },
      {
        _id: 2,
        data: {
          labels: chartDataExpensesGroupedByMonth.map((data) => data.date),
          datasets: [
            {
              label: "Expense By Month",
              data: chartDataExpensesGroupedByMonth.map((data) => data.total),
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
              text: "Chart.js Line Chart",
            },
          },
        },
      },
      {
        _id: 3,
        type: "bar",
        data: {
          labels: chartDataIncomeGroupedByCategory.map((data) => data.category),
          datasets: [
            {
              label: "Income By Category",
              data: chartDataIncomeGroupedByCategory.map((data) => data.total),
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
      },
      {
        _id: 4,
        data: {
          labels: chartDataIncomeGroupedByMonth.map((data) => data.date),
          datasets: [
            {
              label: "Income By Month",
              data: chartDataIncomeGroupedByMonth.map((data) => data.total),
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
              text: "Chart.js Line Chart",
            },
          },
        },
      },
    ],
  ];

  return (
    <div id="chart-list">
      <h1>Charts</h1>
      <div>
        {charts.map((chart) => (
          <Chart key={chart._id} {...chart} />
        ))}
      </div>
    </div>
  );
}
