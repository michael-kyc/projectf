import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import MetricCard from "../Elements/MetricsCard/MetricsCard";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Filler
);

const DashboardCards = () => {
  const metrics = [
    {
      title: "Total Companies",
      value: "128",
      change: 10,
      isPositive: true,
      chartLabel: "Total Companies", // Changed from data.label
      chartValues: [800, 900, 700, 1100, 1000, 1200, 1234], // Changed from data.values
      color: "#16a34a",
    },
    {
      title: "Active Companies",
      value: "115",
      change: -10,
      isPositive: false,
      chartLabel: "Active Companies",
      chartValues: [120, 115, 110, 100, 105, 98, 100],
      color: "#dc2626",
    },
    {
      title: "Pending Companies",
      value: "10",
      change: 10,
      isPositive: true,
      chartLabel: "Pending Companies",
      chartValues: [6, 7, 8, 5, 7, 6, 8],
      color: "#16a34a",
    },
    {
      title: "Suspended Companies",
      value: "10",
      change: -10,
      isPositive: false,
      chartLabel: "Suspended Companies",
      chartValues: [3, 4, 2, 5, 4, 6, 5],
      color: "#dc2626",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric, index) => (
        <MetricCard
          key={index}
          title={metric.title}
          value={metric.value}
          change={metric.change}
          isPositive={metric.isPositive}
          chartLabel={metric.chartLabel}
          chartValues={metric.chartValues}
          color={metric.color}
        />
      ))}
    </div>
  );
};

export default DashboardCards;
