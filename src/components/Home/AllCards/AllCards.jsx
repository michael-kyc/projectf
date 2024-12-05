"use client";
import AddCircle from "@/Icons/Add-circle";
import Link from "next/link";
import React, { useState } from "react";
import SearchBar from "@/components/Elements/search/SearchBar";
import SortModal from "@/components/Elements/SortModal/SortModal";
import NewFiatModal from "@/components/Accounts/Modals/NewFiatModal";
import SubTabNavigation from "@/components/Elements/TabNavigationBar/SubTabsNavigation";
import Mastercard from "@/Icons/imageicon/Mastercard";
import Visa from "@/Icons/imageicon/Visa";

const AllCards = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({
    sort: "balance",
    order: "desc",
  });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedType, setSelectedType] = useState("Virtual card");
  const [isModalOpen, setModalOpen] = useState(false);

  const cards = {
    "Virtual card": [
      {
        id: 1,
        name: "Mastercard",
        desc: "Card ending with 012",
        balance: 2895.15,
        currency: "USD",
        change: "+3%",
        type: "virtual",
        image: <Mastercard className='w-6 h-6' />
      },
      {
        id: 2,
        name: "Visa",
        desc: "Card ending with 892",
        balance: 2895.15,
        currency: "AUD",
        change: "+3%",
        type: "virtual",
        image: <Visa className='w-6 h-6' />
      },
    ],
    "Physical card": [
      {
        id: 3,
        name: "Master Premium",
        desc: "Card ending with 445",
        balance: 3500.0,
        currency: "USD",
        change: "+2%",
        type: "physical",
        image: <Mastercard className='w-6 h-6' />
      },
      {
        id: 4,
        name: "Visa Platinum",
        desc: "Card ending with 778",
        balance: 4200.5,
        currency: "EUR",
        change: "+4%",
        type: "physical",
        image: <Visa className='w-6 h-6' />
      },
    ],
  };

  const sortBy = [
    {
      label: "Balance",
      value: "balance",
      type: "value",
    },
    {
      label: "Card name",
      value: "name",
      type: "text",
    },
  ];

  const handleSortChange = (sortData) => {
    setSortConfig(sortData);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleTypeSelection = (type) => {
    setSelectedType(type);
  };

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const subTabs = ["Virtual card", "Physical card"];

  // Get current cards based on selected type
  const currentCards = cards[selectedType];

  // Filter cards based on search term
  const searchFilteredCards = currentCards.filter(
    (card) =>
      card.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      card.desc.toLowerCase().includes(searchTerm.toLowerCase()) ||
      card.currency.toLowerCase().includes(searchTerm.toLowerCase()) ||
      card.balance.toString().includes(searchTerm)
  );

  // Sort cards based on sortConfig
  const sortCards = (cards) => {
    return [...cards].sort((a, b) => {
      const { sort, order } = sortConfig;

      if (sort === "balance") {
        if (order === "desc") {
          return b.balance - a.balance; // Highest to Lowest
        } else {
          return a.balance - b.balance; // Lowest to Highest
        }
      }

      if (sort === "name") {
        const comparison = a.name
          .toLowerCase()
          .localeCompare(b.name.toLowerCase());
        return order === "desc" ? -comparison : comparison; // desc = A-Z, asc = Z-A
      }

      return 0;
    });
  };

  // Get final sorted and filtered cards
  const filteredAndSortedCards = sortCards(searchFilteredCards);

  return (
    <>
      <div className="w-full p-4 h-auto bg-white border rounded-2xl border-primary50">
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-sm font-semibold text-textBlack">All Cards</h2>
          <div className="flex items-center gap-1 cursor-pointer sm:hidden">
            <AddCircle />
            <p className="font-normal text-xs text-textSecondary">Add card</p>
          </div>
        </div>
        {/* Header Section */}
        <div className="flex flex-wrap items-center mt-2 mb-2 justify-between gap-2 md:flex-nowrap md:space-y-0">
          <SubTabNavigation
            tabs={subTabs}
            width="min-w-[90px]"
            activeTab={selectedType}
            setActiveTab={setSelectedType}
          />
          <div className="flex justify-end w-full gap-2 py-0 pb-2">
            <SearchBar
              value={searchTerm}
              onValueChange={setSearchTerm}
              className="self-start w-full md:w-52"
            />
            <SortModal
              sortBy={sortBy}
              position="right-2 w-auto"
              selected={sortConfig.sort}
              onChange={handleSortChange}
            />
          </div>
        </div>

        <div className="flex w-full gap-2 scrollbar-hide -mt-[8px]  overflow-auto">
          {filteredAndSortedCards.map((card) => (
            <Link
              key={card.id}
              className="w-[158px]"
              href={`/dashboard/accounts/card-details?type=${selectedType}`}
            >
              <div className="flex justify-start w-[158px] h-[6.3rem] p-4 bg-white border border-gray-200 rounded-2xl hover:cursor-pointer">
                <div className="flex flex-col justify-between w-full">
                  <div className="flex flex-row items-center justify-between w-full gap-2">
                    <div className="w-full">
                      <div className="flex flex-row items-center justify-between w-full">
                        <p className="text-sm font-semibold text-textBlack text-nowrap">
                          {card.name}
                        </p>
                        {card.image}
                      </div>

                      <p className="text-[10px] text-cardDes">{card.desc}</p>
                    </div>
                  </div>
                  <p className="h-12 pt-4 text-sm font-semibold text-textBlack">
                    {card.balance.toFixed(2)}{" "}
                    <span className="text-gray-300">{card.currency}</span>
                  </p>
                </div>
              </div>
            </Link>
          ))}

          <div
            onClick={openModal}
            className="flex justify-start h-[6.3rem] p-4 bg-white border border-gray-200 w-[158px] rounded-2xl hover:cursor-pointer"
          >
            <div className="flex flex-col justify-between w-[158px]">
              <span className="flex items-center justify-center w-6 h-6 border border-black rounded-full">
                +
              </span>
              <p className="text-sm font-semibold text-textBlack">New Card</p>
            </div>
          </div>
        </div>
      </div>
      <NewFiatModal isModalOpen={isModalOpen} closeModal={closeModal} />
    </>
  );
};

export default AllCards;
