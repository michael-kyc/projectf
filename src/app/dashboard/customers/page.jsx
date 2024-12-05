"use client"

import React, {useEffect, useState} from "react";
import Search from '@/Icons/Search';
import DropDown from '@/components/Elements/DropDown/DropDown';
import Btc from "@/Icons/CrytpoAssets/Btc";
import Usdt from "@/Icons/CrytpoAssets/Usdt";
import Eth from "@/Icons/CrytpoAssets/Eth";
import Ltc from "@/Icons/CrytpoAssets/Ltc";
import Bnb from "@/Icons/CrytpoAssets/Bnb";
import Ada from "@/Icons/CrytpoAssets/Ada";
import Xrp from "@/Icons/CrytpoAssets/Xrp";
import Button from "@/components/Elements/Button/Button";
import Layout from "@/components/NavBar/NavBar";
import ChevronRight from "@/Icons/ChevronRight";
import ChevronLeft from "@/Icons/ChevronLeft";
import DashboardCards from "@/components/Transactions/DashboardCards";
import CustomerTable from "@/components/Customers/CustomerTable/CustomerTable";
import RequestMoreInfoModal from "@/components/Customers/RequestMoreInfoModal/RequestMoreInfoMoel";
import useApi from "@/hooks/useApi"; // Import the modal component

const Page = () => {
    // State to track which option was clicked
    const [requestedInformationDetail, setSelectedOption] = useState(null);

    // State to control modal visibility
    const [isModalOpen, setModalOpen] = useState(false);

    // Handle option selection
    const handleOption = (option) => {
        setSelectedOption(option); // Set the selected option
        if (option === "Request More Info") {
            setModalOpen(true); // Show modal when "Request More Info" is clicked
        }
    };

    // Close modal handler
    const closeModal = () => {
        setModalOpen(false); // Close modal
    };

    // Dropdown data
    const sortBy = [
        { value: "1", label: "Desc" },
        { value: "2", label: "Asc" },
    ];
    const asset = [
        { value: "1", label: "Crypto" },
        { value: "2", label: "Fiat" },
    ];
    const currency = [
        { value: "1", label: "BTC", img: <Btc /> },
        { value: "2", label: "USDT", img: <Usdt /> },
        { value: "3", label: "ETH", img: <Eth /> },
        { value: "4", label: "LTC", img: <Ltc /> },
        { value: "5", label: "BNB", img: <Bnb /> },
        { value: "6", label: "ADA", img: <Ada /> },
        { value: "7", label: "XRP", img: <Xrp /> },
    ];
    const transactions = [
        { value: "1", label: "Sent" },
        { value: "2", label: "Received" },
        { value: "3", label: "Swapped" },
    ];
    const date = [
        { value: "1", label: "Last week" },
        { value: "2", label: "Last Month" },
        { value: "3", label: "Last 3 Months" },
        { value: "4", label: "Last Year" },
        { value: "5", label: "Custom Date" },
    ];

    return (
      <>
        <Layout pageName={"Customers"}>
          <DashboardCards />
          {/*<div className="h-6"></div>*/}
          <div className="bg-white rounded-2xl mt-6">
            {/*<h2 className="px-6 pt-6 mb-4 text-lg font-semibold">Customers</h2>*/}
            <div className="relative overflow-x-auto">
              {/*<div className="flex flex-row items-center justify-between px-6 mb-4 space-x-2">*/}
              {/*  <div className="flex items-center w-1/4 p-2 pr-3 border border-primary50 rounded-2xl">*/}
              {/*    <Search />*/}
              {/*    <input*/}
              {/*      type="text"*/}
              {/*      placeholder="Search"*/}
              {/*      className="w-full ml-2 border-none outline-none"*/}
              {/*    />*/}
              {/*  </div>*/}
              {/*  <div className="flex flex-row items-center space-x-4">*/}
              {/*    <DropDown*/}
              {/*      items={date}*/}
              {/*      className="w-44"*/}
              {/*      width={"w-20"}*/}
              {/*      title="Date"*/}
              {/*      multiselect={true}*/}
              {/*    />*/}
              {/*    <DropDown*/}
              {/*      items={transactions}*/}
              {/*      className="w-44"*/}
              {/*      width={"w-44"}*/}
              {/*      title="Transaction Type"*/}
              {/*      multiselect={true}*/}
              {/*    />*/}
              {/*    <DropDown*/}
              {/*      items={currency}*/}
              {/*      className="w-44"*/}
              {/*      width="w-28"*/}
              {/*      title="Currency"*/}
              {/*      multiselect={true}*/}
              {/*    />*/}
              {/*    <DropDown*/}
              {/*      items={asset}*/}
              {/*      className="w-22"*/}
              {/*      width="w-22"*/}
              {/*      title="Asset"*/}
              {/*      multiselect={true}*/}
              {/*    />*/}
              {/*    <DropDown*/}
              {/*      items={sortBy}*/}
              {/*      className="w-28"*/}
              {/*      width={"w-22"}*/}
              {/*      title="Sort By"*/}
              {/*      multiselect={true}*/}
              {/*    />*/}
              {/*  </div>*/}
              {/*</div>*/}

              {/* Customer table component */}
              <CustomerTable handleOption={handleOption} />
            </div>
          </div>

          {/* Request More Info Modal */}
          {isModalOpen && (
            <div className="h-3/12">
              <RequestMoreInfoModal isOpen={isModalOpen} onClose={closeModal} />
            </div>
          )}
        </Layout>
      </>
    );
};

export default Page;
