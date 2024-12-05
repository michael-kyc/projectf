import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Chevron from "@/Icons/Chevron"; // Import your Chevron icon here

const CurrencyDropdown = ({ items, selectedItem, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredItems, setFilteredItems] = useState(items);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setFilteredItems(
      items.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, items]);

  const handleSelect = (item) => {
    onSelect(item);
    setIsOpen(false);
    setSearchTerm("");
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <div className="flex gap-1 p-2">
        <Chevron
          className={`transform h-8 w-8  ${
            isOpen ? "rotate-180" : "rotate-0"
          } my-auto`}
        />
        <button
          className="flex items-center w-full gap-2 "
          onClick={() => setIsOpen(!isOpen)}
        >
          <Image
            src={selectedItem.logo}
            alt={selectedItem.name}
            width={22}
            height={22}
          />
          <span>{selectedItem.name}</span>
        </button>
      </div>

      {isOpen && (
        <div
          className={`absolute md:w-[730px] mt-1 px-4  z-10 w-full overflow-y-auto bg-white border border-gray-300 rounded-lg shadow-md max-h-64`}
        >
          <div className="flex items-center justify-between p-2 mt-4">
            <input
              type="text"
              placeholder="Search Currencies"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="relative w-full p-3 border border-gray-300 outline-none rounded-xl"
            />
          
          </div>

          <ul>
            {filteredItems.map((item) => (
              <li
                key={item.name}
                className="flex items-center justify-between gap-2 p-3 cursor-pointer hover:bg-gray-100"
                onClick={() => handleSelect(item)}
              >
                <div className="flex items-start gap-2">
                  <Image
                    src={item.logo}
                    alt={item.name}
                    width={24}
                    height={23}
                  />
                  <p className='flex flex-col gap-0.5'>
                    <span className='font-semibold text-xs text-textBlack'>{item.name}</span>
                    <span className='font-normal text-[11px] text-textBlack'>{item.price}</span>
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-semibold text-textBlack">{item.price}</p>
                  <p className="text-xs font-normal text-textSecondary">{item.amount} USD</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CurrencyDropdown;
