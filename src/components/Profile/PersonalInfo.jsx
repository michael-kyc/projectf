import React from 'react';
import Copy from "@/Icons/Copy";

const PersonalInfo = ({ customerDetails }) => {
  const fullAddress = `${customerDetails?.streetAddress}, ${customerDetails?.city}, ${customerDetails?.state} ${customerDetails?.zipCode} ${customerDetails?.country}`;

  return (
      <div className="w-full p-4 bg-white shadow-sm rounded-2xl">
        <h2 className="mb-[10px] text-[14px] font-semibold leading-5 text-left text-textBlack">Contact Information</h2>

        <div className="flex flex-col justify-between w-full gap-3 md:flex-row">
          <div className="flex flex-col gap-1 w-full">
            <p className="text-[12px] font-medium leading-4 text-left text-textSecondary mb-2 ">Email Address</p>
            <p className="flex items-center gap-2 text-[12px] font-semibold leading-4 text-blue-600 text-left">
              {customerDetails?.email || "alexajohn@gmail.com"} 
              <Copy />
            </p>
          </div>
          <div className="w-full text-[12px] flex flex-col gap-1">
            <p className="text-[12px] font-medium leading-4 text-left text-textSecondary mb-2">Phone Number</p>
            <p className="flex items-center gap-2 text-[12px] font-semibold leading-4 text-blue-600 text-left mb-3">
              {customerDetails?.phoneNumber || "+971 786 7966"}
              <Copy />
            </p>
          </div>
        </div>

        <div className="w-full mt-3 flex flex-col gap-2">
          <p className="text-[12px] font-medium leading-4 text-left text-textSecondary">Address</p>
          <p className="font-inter text-[12px] font-semibold leading-[16px] text-left">
            {fullAddress}
          </p>
        </div>
      </div>
  );
};

export default PersonalInfo;