"use client";
import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Container from "@/components/Container/Container";
import useApi from "@/hooks/useApi";
import ArrowDown from "@/Icons/ArrowDown";
import Button, { TextButton } from "@/components/Elements/Button/Button";
import Add from "@/Icons/Add";
import Gear from "@/Icons/Gear";
import Setting from "@/Icons/Setting";
import Freeze from "@/Icons/Freeze";
import UpDownArros from "@/Icons/UpDownArrows";
import Minus from "@/Icons/Minus";
import Copy from "@/Icons/Copy";
import Back from "@/Icons/Back";
import FinancialsTable from "@/components/Companies/FinancialsTab/FinancialsTable";
import Btc from "@/Icons/imageicon/Btc";

export default function AccountsDetails() {
  const router = useRouter();
  const params = useSearchParams();
  const type = params.get("type");
  const { fetchData, loading, error } = useApi();

  useEffect(() => {
    async function listCompanies() {
      const { result, error } = await fetchData(`/company/all`, {
        method: "GET",
      });
      if (error) {
        setCompanies([]);
      } else {
        setCompanies(result);
      }
    }

    listCompanies();
  }, []);

  const [companies, setCompanies] = useState(null);

  const [dummyData, setDummyData] = useState([
    {
      id: "302012",
      name: "Received",
      amount: 100,
      toFrom: "AUC346..YU76",
      created_at: "01/08/24",
      currency: "Credit",
    },
    {
      id: "302013",
      name: "Sent",
      amount: 200,
      toFrom: "john.watwallet",
      created_at: "02/08/24",
      currency: "Debit",
    },
  ]);

  const dataLine = [
    ["x", "Companies"],
    ["01/08/24", 0],
    ["02/08/24", 10],
    ["03/08/24", 15],
    ["04/08/24", 40],
    ["05/08/24", 10],
    ["06/08/24", 80],
    ["07/08/24", 40],
    ["08/08/24", 100],
  ];

  const optionsLine = {
    hAxis: {
      gridlines: { color: "transparent" }, // Hide horizontal gridlines
      baselineColor: "transparent", // Hide horizontal axis line
      textPosition: "none", // Hide horizontal axis labels
    },
    vAxis: {
      gridlines: { color: "transparent" }, // Hide vertical gridlines
      baselineColor: "transparent", // Hide vertical axis line
      textPosition: "none", // Hide vertical axis labels
    },
    curveType: "function",
    chartArea: {
      left: 0, // Remove margin on the left
      top: 0, // Remove margin on the top
      right: 0, // Remove margin on the right
      bottom: 0, // Remove margin on the bottom
      width: "100%", // Take the full width
      height: "100%", // Take the full height
    },
    series: {
      1: { curveType: "function" },
    },
    colors: ["#01C892"],
    legend: { position: "none" }, // Hide legend
    height: 100, // Set chart height to 100px
  };

  return (
    <Container pageName={"Accounts"}>
      <Suspense>
        <div className="flex flex-col gap-y-2">
          <div onClick={() => router.back()}>
            <Back />
          </div>
          <div className="p-4 overflow-x-auto bg-white border border-primary50 rounded-2xl">
            <div className="space-y-1">
              <div className="flex items-center">
                <Btc className="w-6" />
                <div className="flex flex-col">
                  <p className="flex flex-row items-center ml-1 text-sm font-semibold">
                    <span className="mr-2">Bitcoin Wallet</span>
                    <ArrowDown />
                  </p>
                </div>
              </div>
              <div>
                <p className="text-base font-semibold">
                  0.00 BTC{" "}
                  <span className="text-xl text-primary100">0.00 USD</span>{" "}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:flex sm:flex-row sm:flex-wrap items-center w-full py-6 gap-2">
              <TextButton
                title={"Deposit"}
                icon={<Add />}
                width="w-full sm:w-auto"
                backgroundColor="bg-white"
                textColor="text-textBlack"
                borderColor="border-[1px] border-primary50"
                onClick={() =>
                  router.push(`/dashboard/deposit-${type || "crypto"}`)
                }
              />
              <TextButton
                title={"Withdraw"}
                icon={<Minus />}
                width="w-full sm:w-auto"
                backgroundColor="bg-white"
                textColor="text-textBlack"
                borderColor="border-[1px] border-primary50"
                onClick={() =>
                  router.push(`/dashboard/withdraw-${type || "crypto"}`)
                }
              />
              <TextButton
                title={"Exchange"}
                icon={<UpDownArros />}
                width="w-full sm:w-auto"
                backgroundColor="bg-white"
                textColor="text-textBlack"
                borderColor="border-[1px] border-primary50"
                onClick={() => router.push("/dashboard/exchange")}
              />
              <TextButton
                title={"Settings"}
                icon={<Setting />}
                width="w-full sm:w-auto"
                backgroundColor="bg-white"
                textColor="text-textBlack"
                borderColor="border-[1px] border-primary50"
              />
            </div>
            <hr></hr>
            {/* Additional Details */}
            <div className="mt-6 text-xs">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {/* Column 1 */}
                <div className="space-y-2">
                  <p className="font-medium text-gray-500">Wallet address</p>
                  <p className="flex items-center font-semibold text-blue-600">
                    3FZbgi2...JJnkLtktZc5
                    <button className="ml-2">
                      <Copy />
                    </button>
                  </p>
                </div>

                {/* Column 2 */}
                <div className="space-y-2">
                  <p className="font-medium text-gray-500">Network</p>
                  <p className="flex items-center font-semibold ">
                    Bitcoin
                    <button className="ml-2">
                      <Copy />
                    </button>
                  </p>
                </div>
                {/* Column 3 */}
                <div className="space-y-2">
                  <p className="font-medium text-gray-500">
                    Current Market price
                  </p>
                  <p className="flex items-center font-semibold ">
                    0.99 USD
                    <span className="ml-2 font-medium text-green-500">
                      ↑ 1%
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <FinancialsTable transactions={dummyData} />
        </div>
      </Suspense>
    </Container>
  );
}
