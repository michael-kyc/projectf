"use client"
import React, { useState, useEffect } from "react";
import Container from "@/components/Container/Container";
import useApi from "@/hooks/useApi";
import DashboardCards from "@/components/Transactions/DashboardCards";
import FinancialsTable from "@/components/Companies/FinancialsTab/FinancialsTable";
import { useUser } from "@/app/context/UserContext";
import { COMPANY_ACCOUNT_TYPE, ROLE } from "@/shared/enums";

export default function TransactionsPage() {
  const { fetchData, loading, error } = useApi();
  const [companies, setCompanies] = useState(null);
  const { user } = useUser();

  const [dummyData, setDummyData] = useState([
    {
      id: "302012",
      name: "Received",
      amount: 100,
      toFrom: "AUC346..YU76",
      created_at: "01/08/24",
      currency: "Credit"
    },
    {
      id: "302013",
      name: "Sent",
      amount: 200,
      toFrom: "john.watwallet",
      created_at: "02/08/24",
      currency: "Debit"
    }
  ]);

  const [cardTableData, setCardTableData] = useState(null);

  useEffect(() => {
    async function listAccounts() {
      const { result, error } = await fetchData(`/transaction/all`, {
        method: "POST",
      });
      if (error) {
        setCardTableData([]);
      } else {
        setCardTableData(result);
      }
    }

    listAccounts();
  }, [user]);

  return (
    <Container pageName={"Transactions"}>
      <div className="flex flex-col gap-y-2 gap-x-4">
        <DashboardCards
          isGraphHidden
          isFixedHeight
          className="grid gap-2 grid-cols-2 md:grid-cols-2 lg:grid-cols-4"
        />
        <FinancialsTable
          transactions={cardTableData}
          isFromFinancialsTable={true}
        />
      </div>
    </Container>
  );
}
