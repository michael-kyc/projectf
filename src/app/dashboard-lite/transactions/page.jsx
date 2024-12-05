"use client"
import React, { useState } from "react";
import Container from "@/components/Container/Container";
import useApi from "@/hooks/useApi";
import DashboardCards from "@/components/Transactions/DashboardCards";
import FinancialsTable from "@/components/Companies/FinancialsTab/FinancialsTable";

export default function TransactionsPage() {
  const { fetchData, loading, error } = useApi();
  const [companies, setCompanies] = useState(null);
  const [dummyData, setDummyData] = useState([
    {
      id: "302012",
      name: "Received",
      amount: 100,
      date: "01/08/24",
      recipient: '3fhdbg2knmf45zC5',
      currency: "Credit",
    },
    {
      id: "302013",
      name: "Sent",
      amount: 200,
      date: "02/08/24",
      recipient: '3fhdbg2knmf45zC5',
      currency: "Debit",
    },
  ]);


  return (
    <Container pageName={"Transactions"}>
      <div className="flex flex-col gap-y-5">
        <DashboardCards />
        <FinancialsTable companies={dummyData} isFromFinancialsTable={true} />
      </div>
    </Container>
  );
}

