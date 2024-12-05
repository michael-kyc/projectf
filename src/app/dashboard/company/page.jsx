"use client";
import React, { useState, useEffect } from "react";

import Container from "@/components/Container/Container";

import Card from "@/components/Elements/Card/Card";
import List from "@/components/Companies/List/List";
import Indicator from "@/components/Elements/Indicator/Indicator";
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

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Filler
);

import useApi from "@/hooks/useApi";
import { COMPANY_MANAGEMENT_TABLE_DATA } from "@/data/Company Management";
import DashboardCards from "@/components/Transactions/DashboardCards";
import CompanyDashboardCards from "@/components/Companies/CompanyDashboardCards";

export default function CompanyPage() {
  const { fetchData, loading, error } = useApi();
  const [companies, setCompanies] = useState(null);

  useEffect(() => {
    async function listComapnies() {
      const { result, error } = await fetchData(`/company/all`, {
        method: "GET",
      });
      if (error) {
        setCompanies(COMPANY_MANAGEMENT_TABLE_DATA);
      } else {
        setCompanies(result);
      }
    }
    //
    // async function listWallets() {
    //   const { result, error } = await fetchData(`/wallet/all`, {
    //     method: "GET",
    //   });
    //   if (error) {
    //     console.log(error);
    //   } else {
    //     console.log(result);
    //   }
    // }

    listComapnies();
    // listWallets();
  }, []);



  return (
    <Container pageName={"Company Management"}>
      <div className="w-full h-max pb-2">
        <CompanyDashboardCards />
      </div>

      <List companies={companies} />
    </Container>
  );
}
