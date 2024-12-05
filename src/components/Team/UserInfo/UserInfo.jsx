"use client";
import DropDown from "@/components/Elements/DropDown/DropDown";
import React from "react";

const UserCardsInfo = ({ userData, formData, setFormData, isEdit = true }) => {
  const role = [
    { value: "1", label: "Standard user" },
    { value: "2", label: "Admin" },
  ];

  const userRole = userData?.role === "user" ? "Standard user" : "Admin";

  return (
    <div className="space-y-6 ">
      {isEdit && (
        <div className="bg-white p-4 rounded-2xl text-sm">
          <h3 className="mb-4 text-sm  font-semibold text-textBlack">
            User Status
          </h3>
          <div className="flex flex-row items-center justify-between">
            <p className="text-textBlack text-sm">Status</p>
            <p
              className={`font-medium px-4 py-1 rounded-full ${
                userData?.status
                  ? "bg-green50 text-green500"
                  : "bg-red-100 text-red-500"
              }`}
            >
              {userData?.status ? "Active" : "Suspend"}
            </p>
          </div>
        </div>
      )}
      <div className="bg-white p-4 rounded-2xl">
        <div className="flex flex-row items-center justify-between mb-4">
          <h3 className="mb-4 text-sm  font-semibold text-textBlack">
            User Role
          </h3>
          <p
            className={`font-medium px-4 py-1 rounded-full ${
              userRole === "Admin"
                ? "bg-primary50 text-primary300"
                : "bg-blue-100 text-blue-500"
            } text-sm`}
          >
            {userRole}
          </p>
        </div>
        <DropDown
          defaultValue={
            userData?.role === "user"
              ? { value: "1", label: "Standard user" }
              : { value: "2", label: "Admin" }
          }
          onSelect={(value) => {
            setFormData &&
              setFormData({
                ...formData,
                role: value.value === "2" ? "admin" : "user",
              });
          }}
          items={role}
          className="w-full"
          title={userRole}
        />
      </div>
      {isEdit && (
        <>
          <div className="bg-white p-4 rounded-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-semibold text-textBlack">
                Additional Information
              </h3>
              <button className="text-blue-500 text-[12px] font-medium leading-4">
                + Add Note
              </button>
            </div>
            <p className="text-gray-500 text-sm">
              {userData?.userProfile?.authenticator_secret
                ? "Two-factor authentication is enabled."
                : "No additional information available at this time."}
            </p>
          </div>

          <div className="bg-white p-4 rounded-2xl text-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-semibold text-textBlack">
                Private Note
              </h3>
              <button className="text-blue-500 text-[12px] font-medium leading-4">
                + Add Note
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UserCardsInfo;
