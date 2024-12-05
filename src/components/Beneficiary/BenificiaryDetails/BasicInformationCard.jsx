import Ukflag from "@/Icons/iconsComponent/Ukflag";
import Image from "next/image";
import React from "react";

const profileDat_1 = [
  {
    label: "Full Name",
    value: "Charlie John Brown",
  },
  {
    label: "Email Address",
    value: "emilyzhang@gmail.com",
    copyable: true,
    isEmail: true,
  },
];

const profileDat_2 = [
  {
    label: "Beneficiary Type",
    value: "Individual",
  },
  {
    label: "Email Address",
    value: "emily11@gmail.com",
    copyable: true,
    isEmail: true,
  },
];

const profileData_3 = [
  {
    label: "Date Registered",
    value: "Sep 10-2022",
  },
  {
    label: "Citizenship",
    value: "United Kingdom",
    flagSrc: Ukflag,
    flag: true,
  },
];

const BasicInformationCard = () => {
  const handleCopy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      // You can add a toast notification here if needed
      alert("Copied to clipboard!"); // Or replace with your preferred notification
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div className="w-full p-4 mx-auto bg-white rounded-2xl border border-primary50">
      <h2 className="mb-4 text-[14px] font-semibold leading-5 tracking-tighter text-left">
        Basic Information
      </h2>
      <div className="grid grid-cols-1 gap-2 md:grid-cols-3 md:gap-3">
        {/* First Column */}
        <div className="flex flex-col gap-2 md:gap-3">
          {profileDat_1.map((item, index) => (
            <div key={index} className="flex flex-col gap-2">
              <p className="text-xs text-textSecondary">{item.label}</p>
              <div className="flex items-center gap-2">
                <p
                  className={`text-xs font-semibold ${
                    item.isEmail ? "text-blue-600" : ""
                  }`}
                >
                  {item.value}
                </p>
                {item.copyable && (
                  <button
                    onClick={() => handleCopy(item.value)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Second Column */}
        <div className="flex flex-col gap-2 md:gap-3">
          {profileDat_2.map((item, index) => (
            <div key={index} className="flex flex-col gap-2">
              <p className="text-xs text-textSecondary">{item.label}</p>
              <div className="flex items-center gap-2">
                <p
                  className={`text-xs font-semibold ${
                    item.isEmail ? "text-blue-600" : ""
                  }`}
                >
                  {item.value}
                </p>
                {item.copyable && (
                  <button
                    onClick={() => handleCopy(item.value)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Third Column */}
        <div className="flex flex-col gap-2 md:gap-3">
          {profileData_3.map((item, index) => (
            <div key={index} className="flex flex-col gap-2">
              <p className="text-xs text-textSecondary">{item.label}</p>
              <div className="flex items-center gap-2">
                {item.flagSrc && (
                  <item.flagSrc />
                )}
                <p className="text-xs font-semibold">{item.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BasicInformationCard;
