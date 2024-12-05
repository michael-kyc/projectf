"use client";
import Add from "@/Icons/Add";
import AddCircle from "@/Icons/Add-circle";
import Modal from "@/components/Modal/Modal";
import React, { useEffect, useMemo, useState } from "react";
import Country from "@/components/Elements/Country/Country";
import SearchBar from "@/components/Elements/search/SearchBar";
import SortModal from "@/components/Elements/SortModal/SortModal";
import { TextButton } from "@/components/Elements/Button/Button";
import DropDown from "@/components/Elements/DropDown/DropDown";
import { country as Countries } from "@/data/Country/Country";
import CryptoDropdown from "@/components/Otc/CryptoDropDown";
import SubTabNavigation from "@/components/Elements/TabNavigationBar/SubTabsNavigation";
import Dollar from "@/Icons/imageicon/Dollar";
import Btc from "@/Icons/imageicon/Btc";
import Alice from "@/Icons/imageicon/Alice";
import Usd from "@/Icons/CrytpoAssets/Usd";
import Transfer from "@/Icons/imageicon/Transfer";

// Separated accounts data for fiat and crypto remains the same...
const accounts = {
  fiat: [
    {
      id: 1,
      name: "US Dollar Savings",
      balance: 700.0,
      currency: "USD",
      change: "+3%",
      type: "fiat",
      accountNumber: "123456789",
      bankName: "FinBank Ltd",
      branchName: "Downtown Branch",
      swift: "FINBUS33",
      iban: "US29 FINB 1234 5678 90",
      country: "AF", // This should match exactly with the label in Countries array
      img: <Dollar className="w-6 h-6" />
    },
    {
      id: 2,
      name: "Australian Dollar Current",
      balance: 850.0,
      currency: "AUD",
      change: "+1%",
      type: "fiat",
      accountNumber: "987654321",
      bankName: "AusBank Ltd",
      branchName: "Sydney Central",
      swift: "AUSAU2S",
      iban: "AU29 AUSB 9876 5432 10",
      country: "US", // This should match exactly with the label in Countries array
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
      network: "Bitcoin",
      walletAddress: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa",
      country: "US", // This should match exactly with the label in Countries array
      img: <Btc className="w-6 h-6" />
    },
    {
      id: 4,
      name: "ETH Wallet",
      balance: 2150.0,
      currency: "ETH",
      change: "+5%",
      type: "crypto",
      network: "Ethereum",
      walletAddress: "1A1zP1eP5QGefi2DMPTfTL5SLmvkadfhk47",
      country: "US", // This should match exactly with the label in Countries array
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

const AccountFormFields = ({ type, editingAccount }) => {
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  // Initialize selectedCountry with the editingAccount's country data in the correct format
  const [selectedCountry, setSelectedCountry] = useState(() => {
    if (editingAccount?.country) {
      // Find the matching country from Countries array
      const countryData = Countries.find(
        (country) => country.label === editingAccount.country
      );
      return countryData?.value || "";
    }
    return "";
  });

  const handleCountryChange = (value) => {
    setSelectedCountry(value);
  };

  // Format the selected value for the Country component
  const getSelectedCountryValue = () => {
    if (editingAccount?.country) {
      // Find the matching country object from Countries array
      return Countries.find(
        (country) => country.label === editingAccount.country
      );
    }
    // If no editing account or country not found, find by selected value
    return Countries.find((country) => country.value === selectedCountry);
  };

  const currency =
    type === "Fiat"
      ? [
        { value: "USD", label: "USD" },
        { value: "AUD", label: "AUD" }
      ]
      : [
        { value: "BTC", label: "BTC" },
        { value: "ETH", label: "ETH" }
      ];

  if (type === "Crypto") {
    return (
      <>
        <div className="w-full flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 w-full">
            <div className="flex flex-col gap-1 w-full">
              <p className="text-xs font-normal">Currency</p>
              <DropDown
                items={currency}
                className="h-8 w-44 rounded-[10px] py-1 px-2"
                width={"w-full"}
                title="Select currency"
                value={editingAccount?.currency}
                defaultValue={editingAccount?.currency}
              />
            </div>

            <div className="flex flex-col gap-1 w-full">
              <p className="text-xs font-normal">Account Name</p>
              <input
                type="text"
                id="accountName"
                placeholder="Enter account name"
                defaultValue={editingAccount?.name}
                className="block w-full h-8 py-1 px-2 border rounded-[10px] border-primary50 text-xs placeholder:text-xs"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 w-full">
            <div className="flex flex-col gap-1 w-full">
              <p className="text-xs font-normal">Network</p>
              <input
                type="text"
                id="network"
                placeholder="Enter network"
                defaultValue={editingAccount?.network}
                className="block w-full h-8 py-1 px-2 border rounded-[10px] border-primary50 text-xs placeholder:text-xs"
              />
            </div>

            <div className="flex flex-col gap-1 w-full">
              <p className="text-xs font-normal">Wallet Address</p>
              <input
                type="text"
                id="walletAddress"
                placeholder="Enter wallet address"
                defaultValue={editingAccount?.walletAddress}
                className="block w-full h-8 py-1 px-2 border rounded-[10px] border-primary50 text-xs placeholder:text-xs"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 w-full">
            <div className="flex flex-row items-center justify-between gap-2 w-full">
              <div className="flex flex-col gap-1 w-full">
                <p className="text-xs font-normal">Country</p>
                <Country
                  id="country-selector"
                  open={isCountryOpen}
                  onToggle={() => setIsCountryOpen(!isCountryOpen)}
                  onChange={handleCountryChange}
                  selectedValue={getSelectedCountryValue()}
                  className="border border-primary50"
                />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="w-full flex flex-col gap-4">
        <div className="w-full flex flex-col sm:flex-row items-center gap-2 justify-between">
          <div className="flex flex-col gap-1 w-full">
            <p className="text-xs font-normal">Currency</p>
            <DropDown
              items={currency}
              className="h-8 w-44 rounded-[10px] py-1 px-2"
              width={"w-full"}
              title="Select currency"
              value={editingAccount?.currency}
              defaultValue={editingAccount?.currency}
            />
          </div>
          <div className="flex flex-col gap-1 w-full">
            <p className="text-xs font-normal">Account Number</p>
            <input
              type="text"
              id="accountNumber"
              placeholder="Enter account number"
              defaultValue={editingAccount?.accountNumber}
              className="block w-full h-8 py-1 px-2 border rounded-[10px] border-primary50 text-xs placeholder:text-xs"
            />
          </div>
        </div>

        <div className="w-full flex flex-col sm:flex-row items-center gap-2 justify-between">
          <div className="flex flex-col gap-1 w-full">
            <p className="text-xs font-normal">Bank Name</p>
            <input
              type="text"
              id="bankName"
              placeholder="Enter bank name"
              defaultValue={editingAccount?.bankName}
              className="block w-full h-8 py-1 px-2 border rounded-[10px] border-primary50 text-xs placeholder:text-xs"
            />
          </div>
          <div className="flex flex-col gap-1 w-full">
            <p className="text-xs font-normal">Branch Name</p>
            <input
              type="text"
              id="branchName"
              placeholder="Enter branch name"
              defaultValue={editingAccount?.branchName}
              className="block w-full h-8 py-1 px-2 border rounded-[10px] border-primary50 text-xs placeholder:text-xs"
            />
          </div>
        </div>

        <div className="w-full flex flex-col sm:flex-row items-center gap-2 justify-between">
          <div className="flex flex-col gap-1 w-full">
            <p className="text-xs font-normal">SWIFT Code</p>
            <input
              type="text"
              id="swift"
              placeholder="Enter SWIFT code"
              defaultValue={editingAccount?.swift}
              className="block w-full h-8 py-1 px-2 border rounded-[10px] border-primary50 text-xs placeholder:text-xs"
            />
          </div>
          <div className="flex flex-col gap-1 w-full">
            <p className="text-xs font-normal">Account Name</p>
            <input
              type="text"
              id="accountName"
              placeholder="Enter account name"
              defaultValue={editingAccount?.name}
              className="block w-full h-8 py-1 px-2 border rounded-[10px] border-primary50 text-xs placeholder:text-xs"
            />
          </div>
        </div>

        <div className="w-full flex flex-col sm:flex-row items-center gap-2 justify-between">
          <div className="flex flex-col gap-1 w-full">
            <p className="text-xs font-normal">IBAN</p>
            <input
              type="text"
              id="iban"
              placeholder="Enter IBAN"
              defaultValue={editingAccount?.iban}
              className="block w-full h-8 py-1 px-2 border rounded-[10px] border-primary50 text-xs placeholder:text-xs"
            />
          </div>
          <div className="flex flex-col gap-1 w-full">
            <p className="text-xs font-normal">Country</p>
            <Country
              id="country-selector"
              open={isCountryOpen}
              onToggle={() => setIsCountryOpen(!isCountryOpen)}
              onChange={handleCountryChange}
              selectedValue={getSelectedCountryValue()}
              className="border border-primary50 !h-8"
            />
          </div>
        </div>
      </div>
    </>
  );
};

const beneficiaries = [
  { name: "Alice", logo: <Alice className="w-8 h-8" /> },
  {
    name: "Jhon",
    logo: <Alice className="w-8 h-8" />
  }
]

const AccountCard = ({ account, selectedType, onEdit }) => {
  const [selectedAccount, setSelectedAccount] = useState("")
  const [selectedCurrency, setSelectedCurrency] = useState("")
  const [isSendModalOpen, setIsSendModalOpen] = useState(false)
  const [selectedBeneficiary, setSelectedBeneficiary] = useState("Alice")
  const [isCurrencyDropdownOpen, setisCurrencyDropdownOpen] = useState(false)
  const [isSelectedAccountDropdownOpen, setIsSelectedAccountDropdownOpen] = useState("")
  const [isbenificiariesDropdownOpen, setisbenificiariesDropdownOpen] = useState(false)

  const currency = useMemo(() => {
    return selectedType === "Fiat"
      ? [
        {
          name: "USD",
          logo: <Usd className="w-8 h-8" />
        }
      ]
      : [
        {
          name: "BTC",
          logo:  <Btc className="w-8 h-8" />
        }
      ];
  }, [selectedType])

  const accounts = useMemo(() => {
    return selectedType === "Fiat"
      ? [
        {
          name: "USD Saving Account",
          logo: <Usd className="w-8 h-8" />
        },
        {
          name: "USD current Account",
          logo: <Usd className="w-8 h-8" />
        }
      ]
      : [
        {
          name: "BTC current Account",
          logo: <Btc className="w-8 h-8" />
        },
        {
          name: "BTC Saving Account",
          logo: <Btc className="w-8 h-8" />
        }
      ];
  }, [selectedType])

  const handleBeneficiarySelect = (beneficiaries) => {
    setSelectedBeneficiary(beneficiaries);
    setisbenificiariesDropdownOpen(false);
  }

  const handleCurrencySelect = (currency) => {
    setSelectedCurrency(currency);
    setisCurrencyDropdownOpen(false);
  }

  const handleAccountSelect = (account) => {
    setSelectedAccount(account);
    setIsSelectedAccountDropdownOpen(false);
  }

  useEffect(() => {
    setSelectedCurrency(currency[0].name);
    setSelectedAccount(accounts[0].name);
  }, [selectedType, currency, account])

  return (
    <>
      <div className="w-[327px] sm:w-full p-4 border border-gray-100 rounded-xl">
        <div className="w-[327px] sm:w-full flex flex-col lg:flex-row items-start lg:items-center md:justify-between gap-6">
          {/* Header with Currency and Actions */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full overflow-hidden">
               {account.img}
              </div>
              <span className="font-medium">{account.currency}</span>
            </div>
          </div>

          {/* Account Details */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {selectedType === "Fiat" ? (
              <>
                <div className="flex flex-col gap-2 w-full md:w-auto md:min-w-[125px]">
                  <span className="text-xs text-gray-500">Account</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium">
                      {account.accountNumber}
                    </span>
                    <button className="text-gray-400 hover:text-gray-600">
                      <svg
                        className="w-4 h-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="flex flex-col gap-2 w-full md:w-auto md:min-w-[125px]">
                  <span className="text-xs text-gray-500">Bank Name</span>
                  <span className="text-xs font-medium">
                    {account.bankName}
                  </span>
                </div>

                <div className="flex flex-col gap-2 w-full md:w-auto md:min-w-[125px]">
                  <span className="text-xs text-gray-500">IBAN</span>
                  <span className="text-xs font-medium">{account.iban}</span>
                </div>

                <div className="flex flex-col gap-2 w-full md:w-auto md:min-w-[125px]">
                  <span className="text-xs text-gray-500">Country</span>
                  <span className="text-xs font-medium">{account.country}</span>
                </div>
              </>
            ) : (
              <>
                <div className="flex flex-col gap-2 w-full md:w-auto md:min-w-[188px]">
                  <span className="text-xs text-gray-500">Network</span>
                  <span className="text-xs font-medium">{account.network}</span>
                </div>

                <div className="flex flex-col gap-2 w-full md:w-auto md:min-w-[188px]">
                  <span className="text-xs text-gray-500 text-nowrap">Wallet Address</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium">
                      {account.walletAddress}
                    </span>
                    <button className="text-gray-400 hover:text-gray-600">
                      <svg
                        className="w-4 h-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
          {/*<div className="grid grid-cols-1 md:grid-cols-5 gap-6">*/}
          {/*  {selectedType === "Fiat" ? (*/}
          {/*    <>*/}
          {/*      <div className="md:col-span-1" />*/}

          {/*      <div className="flex flex-col gap-1 col-span-1">*/}
          {/*        <span className="text-xs text-gray-500">Account</span>*/}
          {/*        <div className="flex items-center gap-2">*/}
          {/*          <span className="text-xs font-medium">*/}
          {/*            {account.accountNumber}*/}
          {/*          </span>*/}
          {/*          <button className="text-gray-400 hover:text-gray-600">*/}
          {/*            <svg*/}
          {/*              className="w-4 h-4"*/}
          {/*              viewBox="0 0 24 24"*/}
          {/*              fill="none"*/}
          {/*              stroke="currentColor"*/}
          {/*            >*/}
          {/*              <path*/}
          {/*                strokeLinecap="round"*/}
          {/*                strokeLinejoin="round"*/}
          {/*                strokeWidth={2}*/}
          {/*                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"*/}
          {/*              />*/}
          {/*            </svg>*/}
          {/*          </button>*/}
          {/*        </div>*/}
          {/*      </div>*/}

          {/*      <div className="flex flex-col gap-1 col-span-1">*/}
          {/*        <span className="text-xs text-gray-500">Bank Name</span>*/}
          {/*        <span className="text-xs font-medium">*/}
          {/*          {account.bankName}*/}
          {/*        </span>*/}
          {/*      </div>*/}

          {/*      <div className="flex flex-col gap-1 col-span-1">*/}
          {/*        <span className="text-xs text-gray-500">IBAN</span>*/}
          {/*        <span className="text-xs font-medium">{account.iban}</span>*/}
          {/*      </div>*/}

          {/*      <div className="flex flex-col gap-1 col-span-1">*/}
          {/*        <span className="text-xs text-gray-500">Country</span>*/}
          {/*        <span className="text-xs font-medium">{account.country}</span>*/}
          {/*      </div>*/}
          {/*    </>*/}
          {/*  ) : (*/}
          {/*    <>*/}
          {/*      <div className="flex flex-col gap-1 col-span-2">*/}
          {/*        <span className="text-xs text-gray-500">Network</span>*/}
          {/*        <span className="text-xs font-medium">{account.network}</span>*/}
          {/*      </div>*/}

          {/*      <div className="flex flex-col gap-1 col-span-3">*/}
          {/*        <span className="text-xs text-gray-500 text-nowrap">Wallet Address</span>*/}
          {/*        <div className="flex items-center gap-2">*/}
          {/*          <span className="text-xs font-medium">*/}
          {/*            {account.walletAddress}*/}
          {/*          </span>*/}
          {/*          <button className="text-gray-400 hover:text-gray-600">*/}
          {/*            <svg*/}
          {/*              className="w-4 h-4"*/}
          {/*              viewBox="0 0 24 24"*/}
          {/*              fill="none"*/}
          {/*              stroke="currentColor"*/}
          {/*            >*/}
          {/*              <path*/}
          {/*                strokeLinecap="round"*/}
          {/*                strokeLinejoin="round"*/}
          {/*                strokeWidth={2}*/}
          {/*                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"*/}
          {/*              />*/}
          {/*            </svg>*/}
          {/*          </button>*/}
          {/*        </div>*/}
          {/*      </div>*/}
          {/*    </>*/}
          {/*  )}*/}
          {/*</div>*/}

          <div className="flex flex-wrap gap-2 w-full md:w-max">
            <TextButton
              title="Edit"
              width="w-[88px] min-w-[88px]"
              className="border !border-primary50 !text-black bg-white text-nowrap"
              onClick={() => onEdit(account)}
            />
            <TextButton
              title="Transactions"
              width="w-[88px] min-w-[88px]"
              className="bg-white !text-black !border !border-primary50 text-nowrap"
            />

            {selectedType === "Crypto" && (
              <TextButton
                title="QR Code"
                width="w-[88px] min-w-[88px]"
                className="bg-white !text-black !border !border-primary50 text-nowrap"
              />
            )}

            <TextButton
              title="Send Funds"
              width="w-[88px] min-w-[88px]"
              className="bg-white !text-black !border !border-primary50 text-nowrap"
              onClick={() => {
                setIsSendModalOpen(true);
              }}
            />
          </div>
        </div>
      </div>
      <Modal
        isOpen={isSendModalOpen}
        onClose={() => setIsSendModalOpen(false)}
        title="Send Funds"
        customWidth="!max-w-sm md:!max-w-3xl w-full"
        contentClassName="p-0"
      >
        <div className="flex flex-col gap-2 w-full h-max">
          <div className="flex flex-col gap-4 w-full h-max p-4">
            {/* benificiary div */}
            <div className="flex flex-col gap-1 w-full">
              <p className="text-xs font-normal">Beneficiary </p>
              <CryptoDropdown
                width={"w-full"}
                className="inline-flex h-8 justify-between items-center rounded-[10px] bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 border border-primary50"
                currencies={beneficiaries}
                selectedCurrency={selectedBeneficiary}
                isOpen={isbenificiariesDropdownOpen}
                setIsOpen={setisbenificiariesDropdownOpen}
                handleCurrencySelect={handleBeneficiarySelect}
              />
            </div>
            {/* curency div */}
            <div className="flex flex-col gap-1 w-full">
              <div className="flex flex-row items-center justify-between">
                <p className="text-xs font-normal">Currency </p>
                <p className="text-xs font-normal">Avialable 700.00USD </p>
              </div>
              <CryptoDropdown
                width={"w-full"}
                className="inline-flex h-8 justify-between items-center rounded-[10px] bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 border border-primary50"
                currencies={currency}
                selectedCurrency={selectedCurrency}
                isOpen={isCurrencyDropdownOpen}
                setIsOpen={setisCurrencyDropdownOpen}
                handleCurrencySelect={handleCurrencySelect}
              />
            </div>
            {/* Accounts div */}
            <div className="flex flex-col gap-1 w-full">
              <p className="text-xs font-normal">Accounts </p>
              <CryptoDropdown
                width={"w-full"}
                currencies={accounts}
                className="inline-flex h-8 justify-between items-center rounded-[10px] bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 border border-primary50"
                selectedCurrency={selectedAccount}
                isOpen={isSelectedAccountDropdownOpen}
                setIsOpen={setIsSelectedAccountDropdownOpen}
                handleCurrencySelect={handleAccountSelect}
              />
            </div>
            {/* Amount div */}
            <div className="flex flex-col gap-1 w-full">
              <div className="w-full flex flex-row items-center justify-between">
                <p className="text-xs font-normal">Amount </p>
                <div className="flex flex-row items-center gap-1 text-xs">
                  <Transfer className="h-[10px] w-[10px]" />
                  <p>USD</p>
                </div>
              </div>
              <input
                type="text"
                id="iban"
                placeholder="Amount"
                className="block w-full h-8 py-1 px-2 border rounded-[10px] border-primary50 text-xs placeholder:text-xs"
              />
            </div>
          </div>
          <div className="flex items-center justify-end pt-2 px-4 gap-2 border-t pb-2">
            <TextButton
              title="Cancel"
              className={
                "bg-white !text-black h-8 border   border-primary50 !w-[114px] !min-w-[114px]"
              }
            />
            <TextButton
              title={"Send"}
              className={"bg-black text-white h-8  !w-[114px] !min-w-[114px]"}
            />
          </div>
        </div>
      </Modal>
    </>
  );
};

const AllAccountsCard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({
    sort: "balance",
    order: "desc"
  });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedType, setSelectedType] = useState("Fiat");
  const [isModalOpen, setModalOpen] = useState(false);
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [editingAccount, setEditingAccount] = useState(null);
  const handleSearchChange = (value) => {
    setSearchTerm(value);
  };

  const handleCountryChange = (value) => {
    setSelectedCountry(value);
  };

  const handleSortChange = (sortData) => {
    setSortConfig(sortData);
  };

  const handleEdit = (account) => {
    setEditingAccount(account);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingAccount(null);
  };

  const subTabs = ["Fiat", "Crypto"];

  // Get current accounts based on selected type
  const currentAccounts = accounts[selectedType.toLowerCase()];

  // Filter accounts based on search term
  const searchFilteredAccounts = currentAccounts.filter(
    (account) =>
      account.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      account.currency.toLowerCase().includes(searchTerm.toLowerCase()) ||
      account.balance.toString().includes(searchTerm)
  );

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

  return (
    <>
      <div className="p-4 h-max w-full flex flex-col gap-2 bg-white shadow-sm rounded-2xl overflow-hidden border-[1px] border-primary50">
        <div className="w-full flex flex-row items-center justify-between">
          <p className="text-sm font-semibold text-textBlack">All Accounts</p>
          <TextButton
            width="w-auto"
            title="New Wallet"
            textColor="text-textSecondary md:text-white"
            backgroundColor="bg-transparent md:bg-textBlack"
            onClick={() => setModalOpen(true)}
            className="font-normal text-xs"
            icon={(
              <>
                <div className="md:hidden">
                  <AddCircle />
                </div>
                <div className="hidden md:block">
                  <Add fill="white" />
                </div>
              </>
            )}
          />
        </div>

        <div className="flex flex-wrap items-center md:!mt-2 justify-between gap-2 md:flex-nowrap md:gap-0">
          <SubTabNavigation
            width="!w-[80px]"
            tabs={subTabs}
            activeTab={selectedType}
            setActiveTab={setSelectedType}
          />
          <div className="flex justify-start items-center w-full gap-2 pb-0 md:pb-2">
            <SearchBar
              className="sm:self-start w-full md:w-52"
              value={searchTerm}
              onValueChange={handleSearchChange}
            />
            <SortModal
              sortBy={sortBy}
              onChange={handleSortChange}
              selected={sortConfig.sort}
              position="right-2"
              className="w-auto h-8 self-end"
            />
          </div>
        </div>

        {/* Account Cards */}
        <div className="flex sm:flex-col flex-row items-center w-full gap-2 md:gap-4 mt-2 overflow-scroll">
          {filteredAndSortedAccounts.map((account) => (
            <AccountCard
              key={account.id}
              account={account}
              onEdit={handleEdit}
              selectedType={selectedType}
            />
          ))}
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={
          editingAccount
            ? `Edit ${editingAccount.name} Account`
            : `Add New ${selectedType} Account`
        }
        customWidth="!max-w-sm md:!max-w-3xl w-full"
        contentClassName="p-0"
      >
        <div className="flex flex-col gap-2 w-full">
          <div className="p-4 max-h-[70vh] overflow-y-auto">
            <AccountFormFields
              type={selectedType}
              editingAccount={editingAccount}
            />
          </div>

          {/* Modal Footer */}
          <div className="flex items-center justify-end pt-3 px-4 gap-2 border-t pb-2">
            <TextButton
              title="Cancel"
              className={
                "bg-white !text-black h-8 border border-primary50 !w-[114px] !min-w-[114px]"
              }
              onClick={closeModal}
            />
            <TextButton
              title={editingAccount ? "Save Changes" : "Add New Account"}
              className={
                "bg-black text-white h-8 !w-[114px] !min-w-[114px] text-nowrap"
              }
            />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default AllAccountsCard;
