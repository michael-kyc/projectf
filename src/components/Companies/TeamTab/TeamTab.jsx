"use client";
import React, { useState, useEffect } from "react";
import useApi from "@/hooks/useApi";
import Card from "@/components/Elements/Card/Card";
import Indicator from "@/components/Elements/Indicator/Indicator";
import { Chart } from "react-google-charts";
import TeamTable from "./TeamTable";
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
import UserDashboardCards from "./TeamTabCards";

export default function TeamTab({ company_id }) {
  const { fetchData, loading, error } = useApi();
  const [companyTeam, setCompanyTeam] = useState([]);

  async function fetchCompanyTeam() {
    const { result, error } = await fetchData(
      `/company-teams/company/${company_id}`,
      {
        method: "GET",
      }
    );
    if (error) {
      setCompanyTeam([]);
    } else {
      setCompanyTeam(result);
    }
  }

  useEffect(() => {
    fetchCompanyTeam();
  }, []);

  return (
    <>
      <div className="flex flex-col space-y-2">
        {/* <div className="grid grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-3 3xl:grid-cols-4">
          <Card
            title="Total Users"
            subtitle="Last 7 Days"
            body="10"
            footer={<Indicator value={10} label="vs Last 7 Days"></Indicator>}
          >
            <Line data={{ ...lineChartData, datasets: [lineChartData.datasets[0]] }} options={options} />
          </Card>
          <Card
            title="Active Users"
            subtitle="Last 7 Days"
            body="10"
            footer={<Indicator value={-10} label="vs Last 7 Days"></Indicator>}
          >
            <Line data={{ ...lineChartData, datasets: [lineChartData.datasets[1]] }} options={options} />
          </Card>
          <Card
            title="Inactive Users"
            subtitle="Last 7 Days"
            body="10"
            footer={<Indicator value={10} label="vs Last 7 Days"></Indicator>}
          >
            <Line data={{ ...lineChartData, datasets: [lineChartData.datasets[2]] }} options={options} />
          </Card>
          <Card
            title="New Users"
            subtitle="Last 7 Days"
            body="10"
            footer={<Indicator value={-10} label="vs Last 7 Days"></Indicator>}
          >
            <Line data={{ ...lineChartData, datasets: [lineChartData.datasets[3]] }} options={options} />
          </Card>
        </div> */}
        <UserDashboardCards />
        <TeamTable
          companyTeam={companyTeam}
          company_id={company_id}
          fetchCompanyTeam={fetchCompanyTeam}
        />
      </div>
    </>
  );
}
