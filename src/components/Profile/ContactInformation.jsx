"use client";
import { RiSearchLine } from "react-icons/ri";
import DropDown from "@/components/Elements/DropDown/DropDown";
import Country from "../Elements/Country/Country";
import { country as Countries } from "@/data/Country/Country";
import { useState } from "react";
import CountriesPhone from "../Elements/Country/CountriesNumber";

const ContactInformation = ({
  email,
  phoneNumber,
  streetAddress,
  city,
  zipCode,
  stateOptions,
  state,
  countryOptions,
  country,
  onInputChange,
  onStateChange,
  onCountryChange,
}) => {
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({ country: "AE", label: "+971", });
  const Countries = [
    { value: "AE", label: "+971", flag: "🇦🇪" }, // Example for UAE (+971)
    { value: "US", label: "+1", flag: "🇺🇸" },   // Example for USA (+1)
    { value: "IN", label: "+91", flag: "🇮🇳" },   // Example for India (+91)
    // Add other countries and their codes here
  ];

  const handleInputChange = (field, value) => {
    setFormData((prevState) => ({ ...prevState, [field]: value }));
  };

  
  return (
    <div>
      <h2 className="mb-2.5 font-inter text-sm font-semibold text-textBlack leading-[20px] tracking-[-0.005em] text-left">
        Contact Information
      </h2>

      <div className="flex flex-col gap-1">
        {/* First Row: Email and Phone */}
        <div className="flex flex-col justify-between gap-2 md:flex-row ">
          {/* Email */}
          <div className="w-full md:w-1/2">
            <label className="block text-xs font-normal text-textBlack mb-1 leading-4 font-inter">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => onInputChange(e, "email")}
              placeholder="Email"
              className="w-full px-3 py-2.5  border rounded-[10px] h-8 border-primary50 text-xs"
            />
          </div>

          {/* Phone Number */}
          <div className="w-full md:w-1/2">
            <label className="block text-xs font-normal text-textBlack mb-1 leading-4 font-inter">Phone number</label>
            <div className="flex gap-1">
              <div className="flex items-center  rounded-[10px] h-8 border-primary50 text-xs">
                {/* Country Dropdown */}
                <CountriesPhone
                  open={isOpen}
                  onToggle={() => setIsOpen(!isOpen)}
                  onChange={(value) => handleInputChange("country", value)}
                  selectedValue={Countries.find(
                    (option) => option.value === formData.country
                  )}
                  className="w-full h-8 text-xs" // Adjusted width for country dropdown
                  options={Countries.map((countryOption) => ({
                    value: countryOption.value,
                    label: `${countryOption.flag} ${countryOption.label}`,
                  }))} // Including country flag and code in dropdown
                />
              </div>

              <div className="flex items-center w-full">
                <input
                  type="text"
                  value={phoneNumber}
                  onChange={(e) => onInputChange(e, "phoneNumber")}
                  placeholder="Phone number"
                  className="w-full px-3 py-2.5 border rounded-[10px] h-8 border-primary50 text-xs"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Second Row: Address */}
        <div className="relative">
          <label className="block text-xs text-textBlack mb-1 leading-4 font-inter">Street Address</label>
          <div className="flex items-center">
            <RiSearchLine  className="absolute text-gray-400 left-3" />
            <input
              type="text"
              value={streetAddress}
              onChange={(e) => onInputChange(e, "streetAddress")}
              placeholder="123 Main Street, Suite 400"
              className="w-full px-3 py-2.5 text-xs pl-8 border rounded-[10px] h-8 border-primary50"
            />
          </div>
        </div>

        {/* Third Row: City and State */}
        <div className="flex flex-col justify-between gap-2 md:flex-row">
          {/* City */}
          <div className="w-full md:w-1/2">
            <label className="block text-xs text-textBlack mb-1 leading-4 font-inter">City</label>
            <input
              type="text"
              value={city}
              onChange={(e) => onInputChange(e, "city")}
              placeholder="City"
              className="w-full px-3 py-2.5  border rounded-[10px] h-8 border-primary50  text-xs"
            />
          </div>

          {/* State */}
          <div className="w-full md:w-1/2">
            <label className="block text-xs text-textBlack mb-1 leading-4  font-inter">State</label>
            <input
              type="text"
              value={state}
              onChange={(e) => onStateChange(e.target.value)}
              placeholder="State"
              className="w-full px-3 py-2.5  border rounded-[10px] h-8 border-primary50  text-xs"
            />
          </div>
        </div>

        {/* Fourth Row: ZIP Code and Country */}
        <div className="flex flex-col justify-between gap-2 md:flex-row">
          {/* ZIP Code */}
          <div className="w-full md:w-1/2 md:mt-1">
            <label className="block text-xs text-textBlack mb-1 leading-4  font-inter">
              ZIP Code
            </label>
            <input
              type="text"
              value={zipCode}
              onChange={(e) => onInputChange(e, "zipCode")}
              placeholder="ZIP Code"
              className="w-full px-3 py-2.5  border rounded-[10px] h-8 border-primary50  text-xs"
            />
          </div>

          {/* Country */}
          <div className="w-full md:mt-1 md:w-1/2">
            <label className="block text-xs text-textBlack mb-1 leading-4  font-inter">
              Country/Region
            </label>
            <Country
              id="country-selector"
              open={isCountryOpen}
              onToggle={() => setIsCountryOpen(!isCountryOpen)}
              onChange={onCountryChange}
              selectedValue={Countries.find(
                (option) => option.value === country
              )}
              className={`w-full text-xs border rounded-[10px] h-8 border-primary50`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInformation;
