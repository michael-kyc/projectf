import React, { useState } from "react";
import Button from "@/components/Elements/Button/Button";
import Modal from "@/components/Elements/Modal/Modal";
import Search from "@/Icons/Search";
import Btc from "@/Icons/imageicon/Btc";

const NewWalletModal = ({ isModalOpen, closeModal }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const languages = [
    {
      name: "Bitcoin",
      symbol: "BTC",
      value: "btc",
    },
    {
      name: "Tether USD",
      symbol: "USD",
      value: "usd",
    },
    {
      name: "Litecoin",
      symbol: "LTC",
      value: "ltc",
    },
  ];

  const [selectedLanguage, setSelectedLanguage] = useState("All cash accounts");

  // Update the state correctly for radio input change
  const handleLanguageChange = (e) => {
    setSelectedLanguage(e.target.value); // Use e.target.value to capture the selected value
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value); // Should be e.target.value for input change
  };

  // Filter the list of languages based on the search term
  const filteredLanguages = languages.filter((language) =>
    language.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Add a new wallet"
        customWidth="max-w-[96%] sm:max-w-lg"
      >
        {/* Modal Body */}
        <div className="p-4">
          {/* Search Input */}
          <div className="flex items-center mb-4 border border-gray-300 rounded-[10px]  pr-3 p-3 h-8 text-xs">
            <Search />
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={handleSearchChange}
              className="ml-2 border-none outline-none w-full w-full"
            />
          </div>

          {/* List of Languages */}
          <div className="gap-y-2">
            {filteredLanguages.map((language, index) => (
              <label
                key={index} // Ensure key is unique
                className="flex items-center justify-between w-full py-4 space-x-2 border-b cursor-pointer"
              >
                <div className="flex flex-row items-center space-x-2">
                  <Btc className="size-6" />
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold">
                      {language.name}
                    </span>
                    <span className="text-[11px] text-textSecondary">
                      {language.symbol}
                    </span>
                  </div>
                </div>
                <div>
                  <input
                    type="radio"
                    value={language.name} // Use language.name as the value for the radio button
                    checked={selectedLanguage === language.name}
                    onChange={handleLanguageChange}
                    className="form-radio text-textBlack focus:ring-black accent-black"
                  />
                </div>
              </label>
            ))}
          </div>
        </div>
        {/* Modal Footer */}
        <div className="flex justify-end p-4 gap-2 border-t">
          <Button
            title="Cancel"
            className={"bg-white text-black h-8 text-xs"}
            onClick={closeModal}
          />
          <Button
            title="Create Wallet"
            className={"bg-primary text-white h-8 text-xs"}
          />
        </div>
      </Modal>
    </>
  );
};

export default NewWalletModal;
