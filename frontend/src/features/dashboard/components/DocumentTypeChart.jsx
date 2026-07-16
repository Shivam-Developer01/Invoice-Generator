import {
  ArcElement,
  Chart as ChartJS,
  Legend,
  Tooltip,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { Card } from "react-bootstrap";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
);

function DocumentTypeChart({ data }) {
  const chartData = {
    labels: data.map((item) =>
      item._id.replaceAll("_", " "),
    ),

    datasets: [
      {
        data: data.map((item) => item.count),

        backgroundColor: [
          "#22c55e",
          "#3b82f6",
          "#f59e0b",
        ],

        borderWidth: 0,
      },
    ],
  };

  return (
    <Card className="border-0 shadow-sm h-100">
      <Card.Body>
        <h5 className="mb-4">Documents by Type</h5>

        <div style={{ height: 320 }}>
          <Doughnut
            data={chartData}
            options={{
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: "bottom",
                },
              },
            }}
          />
        </div>
      </Card.Body>
    </Card>
  );
}

export default DocumentTypeChart;