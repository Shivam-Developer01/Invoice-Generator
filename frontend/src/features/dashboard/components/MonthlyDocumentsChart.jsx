import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Tooltip,
} from "chart.js";

import { Bar } from "react-chartjs-2";
import { Card } from "react-bootstrap";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
);

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function MonthlyDocumentsChart({ data }) {
  const chartData = {
    labels: data.map((item) => months[item.month - 1]),

    datasets: [
      {
        label: "Documents",
        data: data.map((item) => item.count),

        backgroundColor: "#3b82f6",

        borderRadius: 8,

        maxBarThickness: 40,
      },
    ],
  };

  return (
    <Card className="border-0 shadow-sm h-100">
      <Card.Body>
        <h5 className="mb-4">Monthly Documents</h5>

        <div style={{ height: 320 }}>
          <Bar
            data={chartData}
            options={{
              maintainAspectRatio: false,

              plugins: {
                legend: {
                  display: false,
                },
              },

              scales: {
                y: {
                  beginAtZero: true,
                  ticks: {
                    precision: 0,
                  },
                },
              },
            }}
          />
        </div>
      </Card.Body>
    </Card>
  );
}

export default MonthlyDocumentsChart;