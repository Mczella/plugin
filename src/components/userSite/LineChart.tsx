import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);
import { Line } from "react-chartjs-2";
import { useQuery } from "@tanstack/react-query";
import { fetchDeliveredIds } from "../api/api.ts";
import { Skeleton } from "@chakra-ui/react";

export const LineChart = () => {
  const { data: deliveredData, isError } = useQuery(["data"], () =>
    fetchDeliveredIds(500),
  );

  if (isError) {
    throw new Error("Error fetching data.");
  }

  const parseDateString = (dateString: string) => new Date(dateString);

  if (deliveredData) {
    const monthlySum = deliveredData.reduce(
      (
        acc: { [x: string]: number },
        item: {
          orderTime: string;
          priceComposition: { total: { amount: number } };
        },
      ) => {
        const date = parseDateString(item.orderTime);
        const year = date.getFullYear();
        const month = date.getMonth();
        const label = `${month + 1}/${year}`;
        const totalAmount = item.priceComposition.total.amount;

        if (!acc[label]) {
          acc[label] = 0;
        }

        acc[label] += totalAmount;

        return acc;
      },
      {},
    );

    const labels = Object.keys(monthlySum).reverse();
    const data = {
      labels: labels,
      datasets: [
        {
          label: "Vývoj útraty",
          backgroundColor: "rgb(242, 138, 32)",
          borderColor: "rgb(242, 138, 32)",
          data: labels.map((label) => monthlySum[label]),
        },
      ],
    };

    const options = {
      scales: {
        y: {
          ticks: {
            callback: (value: string | number) => `${value} Kč`,
          },
        },
      },
      layout: {
        padding: {
          top: 20,
          right: 20,
          bottom: 20,
          left: 20,
        },
      },
    };

    return <Line data={data} options={options} />;
  }

  return <Skeleton width={"90%"} height={"450px"} speed={1} />;
};
