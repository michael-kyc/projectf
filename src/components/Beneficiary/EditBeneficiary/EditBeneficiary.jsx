import BasicInformationForm from "@/components/Profile/BasicInformationForm";
import CombinedCard from "@/components/Profile/CombinedCard";
import ContactInformation from "@/components/Profile/ContactInformation";
import React, { useState } from "react";
import DropDown from "@/components/Elements/DropDown/DropDown";

const EditBeneficiary = ({showCombinedCard = false}) => {
  const [formData, setFormData] = useState({});
  const [profileImage, setProfileImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  const gender = [
    { value: "1", label: "Male" },
    { value: "2", label: "Female" },
  ];

  const statusValue = [
    { value: "1", label: "Active" },
    { value: "2", label: "Suspend" },
  ];

  const roleValue = [
    { value: "1", label: "Admin" },
    { value: "2", label: "User" },
  ];

  const handleAddNote = () => {
    console.log("Add Note Clicked");
  };

  const genderOptions = [
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
  ];

  const citizenshipOptions = [
    { value: "United Kingdom", label: "United Kingdom" },
    { value: "United States", label: "United States" },
  ];
  const stateOptions = [
    { value: "IL", label: "Illinois" },
    { value: "NY", label: "New York" },
    { value: "CA", label: "California" },
    { value: "TX", label: "Texas" },
  ];

  const countryOptions = [
    { value: "US", label: "United States" },
    { value: "UK", label: "United Kingdom" },
    { value: "AE", label: "United Arab Emirates" },
    { value: "IN", label: "India" },
  ];

  const handleInputChange = (e, field) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleGenderChange = (value) => {
    setFormData({ ...formData, gender: value });
  };

  const handleStateChange = (value) => {
    setFormData({ ...formData, state: value });
  };

  const handleCitizenshipChange = (value) => {
    setFormData({ ...formData, citizenship: value });
  };

  const handleCountryChange = (value) => {
    setFormData({ ...formData, country: value });
  };

  const updateOnRoleChange = (value) => {
    const role = value.value === "1" ? "Admin" : "User";
    setFormData({ ...formData, role: role });
  };

  const updateOnStatusChange = (value) => {
    const status = value.value !== "2";
    setFormData({ ...formData, status: status });
  };

  return (
    <>
      <div
        className={`flex flex-col ${
          showCombinedCard ? "" : ""
        } md:flex-row gap-2`}
      >
        <div
          className={`flex flex-col w-full gap-2 ${
            showCombinedCard ? "md:w-2/3" : "w-full"
          }`}
        >
          <div className="p-4 bg-white rounded-2xl">
            {/* <h2 className="mb-3 text-sm sm:text-base font-semibold">
            Profile Picture
          </h2> */}
            <p className="mb-1 text-xs text-gray-500">Photo</p>
            <div className=" bg-gray-50 p-4 text-center border-[1px] border-gray-300 border-dashed rounded-2xl">
              {profileImage ? (
                <img
                  src={
                    profileImage ||
                    "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                  }
                  alt="Profile"
                  className="w-32 h-32 rounded-full mx-auto"
                />
              ) : (
                <div className="flex flex-col items-center justify-center">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                    alt="Placeholder"
                    className="w-8 h-8 rounded-full mb-2"
                  />
                  <p className="text-xs text-gray-400">
                    Drag and drop image here, or click add image
                  </p>
                </div>
              )}
              <input
                type="file"
                onChange={handleImageChange}
                className="hidden"
                id="upload"
              />
              <div className="mt-3">
                <label
                  htmlFor="upload"
                  className="px-4 py-1.5 bg-white text-xs  text-gray-600 border border-gray-300 rounded-xl cursor-pointer font-inter"
                >
                  {profileImage ? "Replace image" : "Add image"}
                </label>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="p-4 bg-white shadow-sm rounded-2xl">
              <BasicInformationForm
                firstName={formData.first_name}
                lastName={formData.last_name}
                dateOfBirth={formData.dateOfBirth}
                genderOptions={genderOptions}
                selectedGender={formData.gender}
                citizenshipOptions={citizenshipOptions}
                selectedCitizenship={formData?.citizenship}
                dateRegistered={formData.dateRegistered}
                onInputChange={handleInputChange}
                onGenderChange={handleGenderChange}
                onCitizenshipChange={handleCitizenshipChange}
              />
            </div>
            <div className="p-4 bg-white shadow-sm rounded-2xl">
              <ContactInformation
                {...formData}
                stateOptions={stateOptions}
                countryOptions={countryOptions}
                onInputChange={handleInputChange}
                onStateChange={handleStateChange}
                onCountryChange={handleCountryChange}
              />
            </div>
          </div>
        </div>

        {/* Right Sidebar Section */}
        {showCombinedCard && (
          <div className="flex flex-col w-full gap-2 md:w-1/3">
            <CombinedCard
              status="Active"
              role="Admin"
              onAddNote={handleAddNote}
              showDropdown={true}
              input={true}
              showinput={
                <>
                  <div className="w-full ">
                    <label className="font-inter text-xs font-normal leading-4 text-left">
                      Username
                    </label>
                    <input
                      type="text"
                      placeholder="First Name"
                      className="w-full px-3 py-2.5  border rounded-[10px] h-[32px] border-gray-300  text-xs"
                    />
                  </div>
                </>
              }
              dropdownComponent={
                <DropDown
                  onSelect={updateOnStatusChange}
                  items={statusValue}
                  initialItems={[
                    {
                      value: formData.status ? "1" : "2",
                      label: formData.status ? "Active" : "Suspend",
                    },
                  ]}
                  className="w-full px-3 py-2.5 mt-1 border rounded-[10px] h-[32px] border-gray-300 rounded-xl text-xs"
                />
              }
              dropdownRole={
                <DropDown
                  onSelect={updateOnRoleChange}
                  items={roleValue}
                  initialItems={[
                    {
                      value: formData.role ? "1" : "2",
                      label: formData.role ? "Admin" : "User",
                    },
                  ]}
                  className="w-full px-3 py-2.5 mt-1 border rounded-[10px] h-[32px] border-gray-300 rounded-xl text-xs"
                />
              }
            />
          </div>
        )}
      </div>
    </>
  );
};

export default EditBeneficiary;
