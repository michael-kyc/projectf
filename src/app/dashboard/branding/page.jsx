"use client";

import NavBar from "@/components/NavBar/NavBar";
import React, { useState } from "react";
import TopBar from "@/components/Team/TopBar/TopBar";
import DropDown from "@/components/Elements/DropDown/DropDown";
import LogoPlaceholder from "@/Icons/LogoPlaceholder";

const BrandingPage = () => {
  const thems = [
    { label: 1, value: "theme 1" },
    { label: 2, value: "theme 2" },
  ];

  // Placeholder function for file upload
  const handleFileUpload = (e) => {
    console.log(e.target.files[0]);
  };

  return (
    <NavBar pageName={"Branding"}>
      <TopBar />
      <div className="h-6"></div>
      <div className="bg-white p-6 rounded-2xl max-w-7xl ">
        <h2 className="text-xl text-textBlack font-medium mb-6">Branding</h2>

        <div className="grid grid-cols-2 gap-6 mb-8">
          {/* Logo Section */}
          <div className="border-2 bg-grey50 border-dashed border-gray-300 rounded-2xl p-6 flex flex-col items-center justify-center">
            <LogoPlaceholder />
            <p className="text-sm bg-grey50 text-gray-500 mt-2 mb-2">
              Drag and drop image here, or click add image
            </p>
            <button className="bg-white border border-gray-2 text-sm text-gray-700 py-2 px-6 rounded-full hover:bg-gray-200">
              Add image
            </button>
            <input type="file" className="hidden" onChange={handleFileUpload} />
          </div>

          {/* Icon Section */}
          <div className="border-2 bg-grey50 border-dashed border-gray-300 rounded-2xl p-6 flex flex-col items-center justify-center">
            <LogoPlaceholder />
            <p className="text-sm text-gray-500 mb-2 mt-2">
              Drag and drop icon here, or click add icon
            </p>
            <button className="bg-white border border-gray-2 text-sm text-gray-700 py-2 px-6 rounded-full hover:bg-gray-200">
              Add icon
            </button>
            <input type="file" className="hidden" onChange={handleFileUpload} />
          </div>
        </div>

        {/* Theme, Custom CSS, App Style Section */}
        <div className="grid grid-cols-3 gap-4 items-center">
          {/* Theme Section */}
          <div>
            <div className="text-sm text-textBlack font-normal mb-2">Theme</div>
            <DropDown items={thems} className={"w-full"} />
          </div>

          {/* Custom CSS Upload */}
          <div>
            <div className="text-sm text-textBlack font-normal mb-2">Custom CSS</div>
            <div className="border-2 h-12 border-dashed border-gray-300 rounded-2xl flex items-center justify-center cursor-pointer hover:bg-grey50">
              <input type="file" className="hidden" onChange={handleFileUpload} />
              <p className="text-gray-500 text-sm text-center">
                <span className="font-semibold">Click here to upload</span> 
              </p>
            </div>
          </div>

          {/* App Style Upload */}
          <div>
            <div className="text-sm text-textBlack font-normal mb-2">App Style</div>
            <div className="border-2 h-12 border-dashed border-gray-300 rounded-2xl flex items-center justify-center cursor-pointer hover:bg-grey50">
              <input type="file" className="hidden" onChange={handleFileUpload} />
              <p className="text-gray-500 text-sm text-center">
                <span className="font-semibold">Click here to upload</span> 
              </p>
            </div>
          </div>
        </div>
      </div>
    </NavBar>
  );
};

export default BrandingPage;
