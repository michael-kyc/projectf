import DropDown from "@/components/Elements/DropDown/DropDown";
import React, { useEffect, useRef, useState } from "react";
import Copy from "@/Icons/Copy";
import CombinedCard from "@/components/Profile/CombinedCard";
import BasicInformation from "@/components/Profile/BasicInformation";
import PersonalInfo from "@/components/Profile/PersonalInfo";
import EditProfile from "@/components/Profile/EditProfile";

const userData = [
  { label: "Full Name", value: "Emily John Zhang" },
  { label: "Account Type", value: "Individual" },
  { label: "Date of birth", value: "Mar 27 -1994" },
  { label: "Passport Number", value: "1372847892" },
  { label: "Date Registered", value: "Sep 10 -2022" }
];

const userData_two = [
  { label: "Current Occupation", value: "Chief Development Officer (CDO)" },
  { label: "Account Plan", value: "Plus +" },
  { label: "Place of birth", value: "Liverpool" },
  { label: "Citizenship", value: "United Kingdom" },
  { label: "Last Login", value: "Aug 20 -2024" }
];

const contactData = [
  {
    label: "Email Address",
    value: "Emilyzhang@gmail.com",
    isCopyable: true
  },
  {
    label: "Phone Number",
    value: "+971 786 7966",
    isCopyable: true
  },
  {
    label: "Residential Address",
    value: ["123 Main Street, Suite 400", "Springfield, IL 62704", "USA"],
    isCopyable: false
  }
];

const riskData = [
  { label: "Risk Score", value: "100%" },
  { label: "Transaction Flags", value: "XXXXXXXXXX" },
  { label: "PEP Affiliation Flag", value: "XXXXXXXXXX" },
  { label: "Blacklisted Occasions", value: "XXXXXXXXXX" }
];

const riskData_two = [
  { label: "Account Flags", value: "XXXXXXXXXX" },
  { label: "Suspicious Activity Flags", value: "XXXXXXXXXX" },
  { label: "Transaction Limit Breach Flag", value: "XXXXXXXXXX" },
  { label: "Blocked Occasions", value: "XXXXXXXXXX" }
];

const statusValue = [
  { value: "1", label: "Active" },
  { value: "2", label: "Suspend" }
];

export default function CustomerProfileOverviewTab({
  customerDetails,
  formData,
  setFormData,
  showSecondComponent
}) {
  const handleAddNote = () => {
    console.log("Add note clicked");
  };

  const updateOnStatusChange = (value) => {
    const status = value.value !== "2";
    setFormData({ ...formData, status: status });
  };

  return (
    <>
      <div className="flex flex-col justify-between gap-3 md:flex-row">
        {/* Left Section */}
        <div className="flex flex-col w-full gap-3 md:w-2/3">
          {!showSecondComponent ? (
            <div className="flex flex-col justify-between gap-3 md:flex-row">
              {/* Left Section */}
              <div className="flex flex-col w-full gap-3">
                <BasicInformation customerDetails={customerDetails} />
                <PersonalInfo customerDetails={customerDetails} />
              </div>
              {/* Right Section */}
              {/* <div className="flex flex-col gap-3  md:w-[50%] w-full">
                <CombinedCard
                  status={customerDetails?.status ? "Active" : "Inactive"}
                  role={customerDetails?.role}
                  onAddNote={handleAddNote}
                />
              </div> */}
            </div>
          ) : (
            <EditProfile
              formData={formData}
              setFormData={setFormData}
              showCombinedCard={false}
            />
          )}
          <div className="p-4 bg-white shadow-sm rounded-2xl">
            <h2 className="mb-4 text-sm font-semibold text-textBlack leading-5 tracking-tighter text-left">
              Risk Level
            </h2>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {/* Column 1 */}
              <div className="flex flex-col justify-between gap-3 ">
                {riskData.map((item, index) => (
                  <div className={`flex flex-col ${showSecondComponent ? 'gap-1' : 'gap-2'}`} key={index}>
                    <p className={`text-xs font-normal ${showSecondComponent ? 'text-textBlack' : 'text-textSecondary'}`}>{item.label}</p>
                    {showSecondComponent ? (
                      <input
                        type="text"
                        value={item.value}
                        placeholder={item.label}
                        onChange={(e) => onInputChange(e, item.label)}
                        className="w-full px-3 py-2.5 border rounded-[10px] h-[32px] border-primary50  text-xs text-textBlack"
                      />
                    ) : (
                      <p className="text-xs font-semibold text-textBlack">{item.value}</p>
                    )}
                  </div>
                ))}
              </div>

              {/* Column 2 */}
              <div className="flex flex-col w-full gap-3">
                {riskData_two.map((item, index) => (
                  <div className={`flex flex-col ${showSecondComponent ? 'gap-1' : 'gap-2'}`} key={index}>
                    <p className={`text-xs font-normal ${showSecondComponent ? 'text-textBlack' : 'text-textSecondary'}`}>{item.label}</p>
                    {showSecondComponent ? (
                      <input
                        type="text"
                        value={item.value}
                        placeholder={item.label}
                        onChange={(e) => onInputChange(e, item.label)}
                        className="w-full px-3 py-2.5 border rounded-[10px] h-[32px] border-primary50  text-xs text-textBlack"
                      />
                    ) : (
                      <p className="text-xs font-semibold text-textBlack">{item.value}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex flex-col w-full gap-3 mb-3 md:mt-0 md:w-1/3 md:mb-0 ">
          <CombinedCard
            input={showSecondComponent}
            role="Admin"
            status="Active"
            showUserRole={false}
            onAddNote={handleAddNote}
            showDropdown={showSecondComponent}
            showinput={
              <div className="w-full ">
                <label className="font-inter text-xs font-normal leading-4 text-left">Username</label>
                <input
                  type="text"
                  placeholder="First Name"
                  className="w-full px-3 py-2.5 border rounded-[10px] h-8 border-gray-300 text-xs text-textBlack"
                />
              </div>
            }
            dropdownComponent={
              <DropDown
                onSelect={updateOnStatusChange}
                items={statusValue}
                initialItems={[
                  {
                    value: "1",
                    label: "Active"
                  }
                ]}
                className="w-full px-3 py-2.5 mt-1 border rounded-[10px] h-8 border-primary50 text-xs"
              />
            }
          />
        </div>
      </div>
    </>
  );
}
