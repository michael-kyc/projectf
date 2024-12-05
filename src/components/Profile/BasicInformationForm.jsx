import React from "react";
import DropDown from "@/components/Elements/DropDown/DropDown";
import { FaCalendarAlt } from "react-icons/fa";
import CalendarIcon from "@/Icons/Calendar";

const BasicInformationForm = ({
  firstName,
  lastName,
  dateOfBirth,
  genderOptions,
  selectedGender,
  citizenshipOptions,
  selectedCitizenship,
  dateRegistered,
  onInputChange,
  onGenderChange,
  onCitizenshipChange
}) => {
  return (
    <>
      <h2 className="mb-2.5 font-inter text-textBlack text-sm font-semibold leading-[20px] tracking-[-0.005em] text-left">
        Basic Information
      </h2>

      <div className="flex flex-col gap-2">
        {/* First Row */}
        <div className="flex flex-col justify-between space-x-0 md:flex-row gap-2">
          {/* First Name */}
          <div className="w-full md:w-1/2">
            <label className="block text-xs text-textBlack font-normal leading-4 font-inter">First Name</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => onInputChange(e, "first_name")}
              placeholder="First Name"
              className="w-full px-3 py-2.5 mt-1 border rounded-[10px] h-[32px] border-primary50  text-xs text-textBlack"
            />
          </div>

          {/* Last Name */}
          <div className="w-full md:w-1/2">
            <label className="block text-xs text-textBlack font-normal leading-4 font-inter">
              Last Name
            </label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => onInputChange(e, "last_name")}
              placeholder="Last Name"
              className="w-full px-3 py-2.5 mt-1 border rounded-[10px] h-[32px] border-primary50  text-xs text-textBlack"
            />
          </div>
        </div>

        {/* Second Row */}
        <div className="flex flex-col justify-between space-x-0 md:flex-row gap-2">
          {/* Date of Birth */}
          <div className="relative w-full my-auto md:w-1/2">
            <label className="block text-xs text-textBlack font-normal leading-4 font-inter">Date of Birth</label>
            <div className="relative flex items-center">
              {/* Calendar Icon inside the input */}
              <CalendarIcon className="absolute top-[55%] left-3  transform -translate-y-1/2 w-[16px] h-[16px] pointer-events-none  " />
              <input
                // type="date"
                className="w-full px-2 py-2.5 pl-10 mt-1 border rounded-[10px]  text-textSecondary h-[32px] border-primary50 text-[12px]"
                value={dateOfBirth}
                onChange={(e) => onInputChange(e, "dateOfBirth")}
                defaultValue="Jan 09 -2024"
              />
            </div>
          </div>

          {/* Gender */}
          <div className="w-full md:w-1/2">
            <label className="block text-xs text-textBlack font-normal leading-4 font-inter ">
              Gender
            </label>
            <DropDown
              items={genderOptions}
              selectedItem={selectedGender}
              onChange={onGenderChange}
              className="w-full px-3 py-2.5 mt-1 border rounded-[10px] h-[32px] border-primary50  text-xs text-textBlack"
            />
          </div>
        </div>

        {/* Third Row */}
        <div className="flex flex-col justify-between space-x-0 md:flex-row gap-2">
          {/* Date Registered */}
          <div className="relative w-full md:w-1/2">
            <label className="block text-xs text-textBlack font-normal leading-4 font-inter">
              Date Registered
            </label>
            <div className="relative flex items-center">
              {/* Calendar Icon inside the input */}
              <CalendarIcon className="absolute top-[55%] left-3 transform -translate-y-1/2 w-[16px  h-[16px] pointer-events-none" />
              <input
                // type="date"
                className="w-full px-3 py-2.5 pl-10 mt-1 border text-textSecondary rounded-[10px] h-[32px] border-primary50 text-[12px]"
                value={dateOfBirth}
                onChange={(e) => onInputChange(e, "dateOfBirth")}
                defaultValue="Jan 09 -2024"
              />
            </div>
          </div>

          {/* Citizenship */}
          <div className="w-full md:w-1/2">
            <label className="block text-xs text-textBlack font-normal leading-4 font-inter md:mb-1">
              Citizenship
            </label>
            <DropDown
              items={citizenshipOptions}
              selectedItem={selectedCitizenship}
              onChange={onCitizenshipChange}
              className="w-full px-3 py-2.5  border rounded-[10px] h-[32px] border-primary50  text-[12px]"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default BasicInformationForm;
