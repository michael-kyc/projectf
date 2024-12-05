import React, { useState } from "react";
import DropDown from "@/components/Elements/DropDown/DropDown";

const TotalAssets = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Metaverse", "Gaming", "Defi", "NFT"];
  const assets = [
    {
      symbol: "BTCUSDT",
      name: "Bitcoin",
      price: "$23,495",
      change: "+23%",
      changeColor: "text-green-500",
      bgColor: "bg-green-100",
    },
    {
      symbol: "AXSUSDT",
      name: "Axie Infinity",
      price: "$15.9",
      change: "-7.8%",
      changeColor: "text-red-500",
      bgColor: "bg-red-100",
    },
    {
      symbol: "ETHUSDT",
      name: "Ethereum",
      price: "$15,978",
      change: "-0.3%",
      changeColor: "text-red-500",
      bgColor: "bg-red-100",
    },
    {
      symbol: "SOLUSDT",
      name: "Solana",
      price: "$495",
      change: "+11.1%",
      changeColor: "text-green-500",
      bgColor: "bg-green-100",
    },
    {
      symbol: "BNBUSDT",
      name: "Binance",
      price: "$267",
      change: "+6.7%",
      changeColor: "text-green-500",
      bgColor: "bg-green-100",
    },
    {
      symbol: "ADAUSDT",
      name: "Cardano",
      price: "$0.49",
      change: "-1.4%",
      changeColor: "text-red-500",
      bgColor: "bg-red-100",
    },
    {
      symbol: "ADAUSDQ",
      name: "Cardano",
      price: "$0.49",
      change: "-1.4%",
      changeColor: "text-red-500",
      bgColor: "bg-red-100",
    },
  ];

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const asset = [
    { value: "1", label: "Crypto" },
    { value: "2", label: "Fiat" },
  ];

  return (
    <div className="w-full h-[420px] p-4 bg-white shadow-sm rounded-2xl border border-primary50">
      {/* Header Section with Dropdown */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-[14px] font-semibold leading-[20px] tracking-[-0.005em] text-left text-textBlack">Total Assets</h2>
        <div className="">
          <DropDown
            defaultValue={{ value: "1", label: "Crypto" }}
            items={asset}
            title="Select asset type"
          />
        </div>
      </div>

      {/* <div className="grid grid-cols-1 sm:grid-cols-5 justify-between w-full mb-4 text-sm gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryClick(category)}
            className={`w-full px-4 py-2 text-xs font-semibold rounded-lg ${
              selectedCategory === category ? " text-blue500" : "bg-grey text-textBlack"
            }`}
          >
            {category}
          </button>
        ))}
      </div> */}

      <div>
        {assets.map((asset) => (
          <div
            key={asset.symbol}
            class="flex flex-row  py-3 transition duration-200 hover:bg-gray-50 gap-x-10"
          >
            <div className="flex-grow text-[12px] font-medium leading-[16px] truncate  text-textBlack mb-2">
              {asset.symbol}
            </div>
            <div className="flex-grow text-[12px] font-medium leading-[16px] text-left text-textSecondary truncate mb-2">
              {asset.name}
            </div>
            <div className="flex-grow text-[12px] font-semibold leading-[16px] text-right text-black">
              {asset.price}
            </div>
            <div
              className={`flex-shrink-0 w-16 text-xs font-medium text-center inline-block px-2 py-1 rounded-full ${asset.bgColor} ${asset.changeColor}`}
            >
              {asset.change}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TotalAssets;
