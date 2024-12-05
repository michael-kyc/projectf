/* eslint-disable @next/next/no-img-element */
"use client";
import AddCircle from "@/Icons/Add-circle";
import React, { useState } from "react";
import ArrowDown from "@/Icons/ArrowDown";
import Search from "@/Icons/Search";
import SortModal from "@/components/Elements/SortModal/SortModal";
import NewWalletModal from "@/components/Accounts/Modals/NewWalletModal";
import Button from "@/components/Elements/Button/Button";
import Link from "next/link";
import SubTabNavigation from "@/components/Elements/TabNavigationBar/SubTabsNavigation";
import SearchBar from "@/components/Elements/search/SearchBar";
import Dollar from "@/Icons/imageicon/Dollar";
import Btc from "@/Icons/imageicon/Btc";

const AllAccounts = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({
    sort: "balance",
    order: "desc"
  });
  const [selectedType, setSelectedType] = useState("Fiat");
  const [isModalOpen, setModalOpen] = useState(false);

  // Separated accounts data for fiat and crypto
  const accounts = {
    fiat: [
      {
        id: 1,
        name: "US Dollars",
        balance: 700.0,
        currency: "USD",
        change: "+3%",
        type: "fiat",
        img: <Dollar className="w-6 h-6" />
      },
      {
        id: 2,
        name: "Euro Account",
        balance: 850.0,
        currency: "EUR",
        change: "+1%",
        type: "fiat",
        img: <Dollar className="w-6 h-6" />
      }
    ],
    crypto: [
      {
        id: 3,
        name: "BTC Savings",
        balance: 1320.0,
        currency: "BTC",
        change: "+3%",
        type: "crypto",
        img: <Btc className="w-6 h-6" />
      },
      {
        id: 4,
        name: "ETH Wallet",
        balance: 2150.0,
        currency: "ETH",
        change: "+5%",
        type: "crypto",
        img: <Dollar className="w-6 h-6" />
      }
    ]
  };

  const sortBy = [
    {
      label: "Balance",
      value: "balance",
      type: "value"
    },
    {
      label: "Account name",
      value: "name",
      type: "text"
    }
  ];

  const handleSortChange = (sortData) => {
    setSortConfig(sortData);
  };

  const handleTypeSelection = (type) => {
    setSelectedType(type);
  };

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const subTabs = ["Fiat", "Crypto"];

  // Get current accounts based on selected type
  const currentAccounts = accounts[selectedType.toLowerCase()];

  // Handler for search input
  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  // Filter accounts based on search term
  const searchFilteredAccounts = currentAccounts.filter((account) => {
    const searchLower = searchTerm.toLowerCase().trim();
    return (
      account.name.toLowerCase().includes(searchLower) ||
      account.currency.toLowerCase().includes(searchLower) ||
      account.balance.toString().includes(searchLower)
    );
  });

  // Sort accounts based on sortConfig
  const sortAccounts = (accounts) => {
    return [...accounts].sort((a, b) => {
      const { sort, order } = sortConfig;

      if (sort === "balance") {
        if (order === "desc") {
          return b.balance - a.balance;
        } else {
          return a.balance - b.balance;
        }
      }

      if (sort === "name") {
        const comparison = a.name
          .toLowerCase()
          .localeCompare(b.name.toLowerCase());
        return order === "desc" ? -comparison : comparison;
      }

      return 0;
    });
  };

  // Get final sorted and filtered accounts
  const filteredAndSortedAccounts = sortAccounts(searchFilteredAccounts);

  // Get add button text based on selected type
  const getAddButtonText = () => selectedType === "Fiat" ? "New Account" : "New Wallet";

  return (
    <>
      <div className="w-full p-4 h-auto bg-white border rounded-2xl border-primary50">
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-sm font-semibold text-textBlack">All Accounts</h2>
          <div className="flex items-center gap-1 cursor-pointer sm:hidden">
            <AddCircle />
            <p className="font-normal text-xs text-textSecondary">Add account</p>
          </div>
        </div>
        {/* Header Section */}
        <div className="flex flex-wrap items-center mt-2 justify-between gap-2 md:flex-nowrap md:space-y-0">
          <SubTabNavigation
            tabs={subTabs}
            width="min-w-[80px]"
            activeTab={selectedType}
            setActiveTab={setSelectedType}
          />
          <div className="flex justify-end w-full gap-2 py-0 md:gap-2 pb-2">
            <SearchBar
              value={searchTerm}
              onValueChange={handleSearch}
              className="md:self-start w-full md:w-52"
              placeholder="Search accounts..."
            />
            <SortModal
              sortBy={sortBy}
              onChange={handleSortChange}
              selected={sortConfig.sort}
              position="right-2"
              className="h-8 w-auto"
            />
          </div>
        </div>

        <div className="flex gap-2 w-full scrollbar-hide whitespace-nowrap overflow-auto">
          {filteredAndSortedAccounts.map((account) => (
            <Link
              key={account.id}
              className="w-[158px]"
              href={`/dashboard/accounts/account-details?type=${selectedType.toLowerCase()}`}
            >
              <div className="relative w-[158px] justify-between flex-shrink-0 p-4 bg-white border rounded-2xl border-primary50 scroll-auto h-[6.3rem]">
                <div className="flex flex-row items-start justify-between">
                  <span className="w-8 h-12 text-sm font-semibold text-textBlack">
                    {account.name}
                  </span>
                  {account.img}
                </div>
                <div className="flex items-end justify-start">
                  <p className="text-sm font-semibold text-textBlack">
                    {account.balance.toFixed(2)}{" "}
                    <span className="text-gray-300">{account.currency}</span>
                  </p>
                </div>
              </div>
            </Link>
          ))}

          <div
            className="flex justify-start h-[6.3rem] p-4 bg-white border border-gray-200 rounded-2xl w-[158px] hover:cursor-pointer"
            onClick={openModal}
          >
            <div className="flex flex-col justify-between w-[158px]">
              <span className="flex items-center justify-center w-6 h-6 border border-black rounded-full">
                +
              </span>
              <p className="text-sm font-semibold text-textBlack">
                {getAddButtonText()}
              </p>
            </div>
          </div>
        </div>
      </div>
      <NewWalletModal isModalOpen={isModalOpen} closeModal={closeModal} />
    </>
  );
};

export default AllAccounts;
