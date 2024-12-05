"use client";
import React, { useState } from "react";
import TopHeader from "./TopHeader";
import BasicInformationCard from "./BasicInformationCard";
import AllAccountsCard from "./AllAccountsCard";
import BenificiaryRecentRansactionTable from "./BenificiaryRecentRansactionTable";
import FinancialsTable from "@/components/Companies/FinancialsTab/FinancialsTable";
import EditBeneficiary from "../EditBeneficiary/EditBeneficiary";

const BeneficiaryDetailsBody = ({ setIsEditOpen, isEditOpen }) => {
  const [dummyData, setDummyData] = useState([
    {
      id: "302012",
      name: "Received",
      amount: 100,
      date: "01/08/24",
      currency: "Credit",
    },
    {
      id: "302013",
      name: "Sent",
      amount: 200,
      date: "02/08/24",
      currency: "Debit",
    },
  ]);
  return (
    <div className="flex flex-col gap-2 w-full h-max pt-4">
      <TopHeader setIsEditOpen={setIsEditOpen} isEditOpen={isEditOpen} />
      {!isEditOpen ? (
        <>
          <BasicInformationCard />
          <AllAccountsCard />
          <FinancialsTable
            transactions={dummyData}
            isFromFinancialsTable={true}
          />
        </>
      ) : (
        <>
          <EditBeneficiary />
        </>
      )}
    </div>
  );
};

export default BeneficiaryDetailsBody;
