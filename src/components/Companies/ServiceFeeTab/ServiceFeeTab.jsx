"use client"
import React, { useState, useEffect } from "react";
import useApi from "@/hooks/useApi";
import ServiceFeeTable from "./ServiceFeeTable";
import AddSchemeModal from "@/components/Companies/ServiceFeeTab/AddSchemeModal";

export default function ServiceFeeTab({ company_id }) {
  const { fetchData, loading, error } = useApi();
  const [companyScheme, setCompanyScheme] = useState(null);
  const [isAdd, setIsAdd] = useState(false);

  const closeModal = () => setIsAdd(false);
  const openModal = () => setIsAdd(true);

  async function handleFetchAllScheme() {
    const { result, error } = await fetchData(
      `/company-fee-scheme/company/${company_id}`,
      {
        method: "GET"
      }
    );
    if (error) {
      setCompanyScheme([]);
    } else {
      setCompanyScheme(result);
    }
  }

  useEffect(() => {
    handleFetchAllScheme();
  }, [])

  const dataLine = [
    ["x", "Companies"],
    ["01/08/24", 0],
    ["02/08/24", 10],
    ["03/08/24", 15],
    ["04/08/24", 40],
    ["05/08/24", 10],
    ["06/08/24", 80],
    ["07/08/24", 40],
    ["08/08/24", 100]
  ];

  const optionsLine = {
    hAxis: {
      gridlines: { color: "transparent" }, // Hide horizontal gridlines
      baselineColor: "transparent", // Hide horizontal axis line
      textPosition: "none" // Hide horizontal axis labels
    },
    vAxis: {
      gridlines: { color: "transparent" }, // Hide vertical gridlines
      baselineColor: "transparent", // Hide vertical axis line
      textPosition: "none" // Hide vertical axis labels
    },
    curveType: "function",
    chartArea: {
      left: 0, // Remove margin on the left
      top: 0, // Remove margin on the top
      right: 0, // Remove margin on the right
      bottom: 0, // Remove margin on the bottom
      width: "100%", // Take the full width
      height: "100%" // Take the full height
    },
    series: {
      1: { curveType: "function" }
    },
    colors: ["#01C892"],
    legend: { position: "none" }, // Hide legend
    height: 100 // Set chart height to 100px
  };

  return (
    <>
      <ServiceFeeTable
        companyScheme={companyScheme}
        addFeeScheme={openModal}
        handleFetchAllScheme={handleFetchAllScheme}
      />

      {/* Add Fee Scheme Modal */}
      {isAdd && (
        <AddSchemeModal
          closeModal={closeModal}
          company_id={company_id}
          isModalOpen={isAdd}
          handleFetchAllScheme={handleFetchAllScheme}
        />
      )}
    </>
  );
}