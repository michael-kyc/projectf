"use client";

import NavBar from "@/components/NavBar/NavBar";
import React, { useState } from "react";
import TopBar from "@/components/Team/TopBar/TopBar";
import DropDown from "@/components/Elements/DropDown/DropDown";
import LogoPlaceholder from "@/Icons/LogoPlaceholder";

const BrandingTab = () => {
  const [logoPreview, setLogoPreview] = useState(null);
  const [iconPreview, setIconPreview] = useState(null);

  const thems = [
    { label: 1, value: "theme 1" },
    { label: 2, value: "theme 2" },
  ];

  const handleImageUpload = (e, setPreview) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Image preview component
  const ImagePreview = ({ src, alt, onRemove }) => (
    <div className="relative group">
      <img 
        src={src} 
        alt={alt}
        className="w-16 h-16 object-contain"  // Matching LogoPlaceholder size
      />
      <button
        onClick={onRemove}
        className="absolute p-1 text-white bg-red-500 rounded-full -top-2 -right-2 hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
        aria-label="Remove image"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-3 h-3"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );

  return (
    <div>
      <div className="p-4 bg-white rounded-2xl">
        <h2 className="mb-2 text-sm font-semibold text-textBlack">Branding</h2>

        <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2">
          {/* Logo Section */}
          <div>
            <div className="mb-2 text-xs font-normal text-textBlack">Logo</div>
            <div className="flex flex-col items-center justify-center p-4 border-2 border-gray-300 border-dashed bg-grey50 rounded-2xl min-h-[160px]">
              {logoPreview ? (
                <ImagePreview
                  src={logoPreview}
                  alt="Selected logo"
                  onRemove={() => setLogoPreview(null)}
                />
              ) : (
                <>
                  <LogoPlaceholder />
                  <p className="mt-2 mb-2 text-xs text-gray-500 bg-gray-50">
                    Drag and drop image here, or click add image
                  </p>
                </>
              )}
              <input
                type="file"
                className="hidden"
                id="image-upload"
                accept="image/*"
                onChange={(e) => handleImageUpload(e, setLogoPreview)}
              />
              <label
                htmlFor="image-upload"
                className="px-6 py-2 mt-2 text-xs text-gray-700 bg-white border rounded-[10px] border-gray-2 hover:bg-gray-200 cursor-pointer"
              >
                {logoPreview ? 'Change image' : 'Add image'}
              </label>
            </div>
          </div>

          {/* Icon Section */}
          <div>
            <div className="mb-2 text-xs font-normal text-textBlack">Icon</div>
            <div className="flex flex-col items-center justify-center p-4 border-2 border-gray-300 border-dashed bg-grey50 rounded-2xl min-h-[160px]">
              {iconPreview ? (
                <ImagePreview
                  src={iconPreview}
                  alt="Selected icon"
                  onRemove={() => setIconPreview(null)}
                />
              ) : (
                <>
                  <LogoPlaceholder />
                  <p className="mt-2 mb-2 text-xs text-gray-500">
                    Drag and drop icon here, or click add icon
                  </p>
                </>
              )}
              <input
                type="file"
                className="hidden"
                id="icon-upload"
                accept="image/*"
                onChange={(e) => handleImageUpload(e, setIconPreview)}
              />
              <label
                htmlFor="icon-upload"
                className="px-6 py-2 mt-2 text-xs text-gray-700 bg-white border rounded-[10px] border-gray-2 hover:bg-gray-200 cursor-pointer"
              >
                {iconPreview ? 'Change icon' : 'Add icon'}
              </label>
            </div>
          </div>
        </div>

        {/* Theme, Custom CSS, App Style Section */}
        <div className="grid items-center grid-cols-1 gap-4 md:grid-cols-3">
          {/* Theme Section */}
          <div>
            <div className="mb-2 text-xs font-normal text-textBlack">Theme</div>
            <DropDown items={thems} className={"w-full h-8 rounded-[10px]"} />
          </div>

          {/* Custom CSS Upload */}
          <div>
            <div className="mb-2 text-xs font-normal text-textBlack">
              Custom CSS
            </div>
            <div className="flex items-center justify-center h-8 p-3 border border-primary50 border-dashed cursor-pointer rounded-[10px] hover:bg-grey50">
              <input
                type="file"
                id="custom-css-upload"
                className="hidden"
                accept=".css"
                onChange={(e) => console.log(e.target.files[0])}
              />
              <label
                htmlFor="custom-css-upload"
                className="w-full text-xs text-center text-gray-500 cursor-pointer"
              >
                Click here to upload
              </label>
            </div>
          </div>

          {/* App Style Upload */}
          <div>
            <div className="mb-2 text-xs font-normal text-textBlack">
              App Style
            </div>
            <div className="flex items-center justify-center h-8 p-3 border border-primary50 border-dashed cursor-pointer rounded-[10px] hover:bg-grey50">
              <input
                type="file"
                id="app-style-upload"
                className="hidden"
                onChange={(e) => console.log(e.target.files[0])}
              />
              <label
                htmlFor="app-style-upload"
                className="w-full text-xs text-center text-gray-500 cursor-pointer"
              >
                Click here to upload
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandingTab;