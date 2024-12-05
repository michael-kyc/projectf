import React from "react";

const CombinedCard = ({
  username = "@alexajohn",
  status,
  role,
  onAddNote,
  onChangeUsername,
  showDropdown = false,
  dropdownComponent = null,
  dropdownRole = null,
  showUserRole = true,
  input = false,
  showinput = null
}) => {
  console.log({ showDropdown })
  return (
    <>
      {/* username card */}
      <div className="p-4 bg-white shadow-sm rounded-2xl">
        <div className="flex justify-between mb-1.5 ">
          <p className="my-auto  w-full text-textBlack h-[20px] font-inter text-sm font-semibold leading-[20px] tracking-[-0.005em] text-left">
            {input ? "Change Username" : "Username"}
          </p>
          {/* Conditionally render the button */}
          {!input && (
            <button className="text-xs text-blue-600 font-medium leading-4 text-left">
              Change
            </button>
          )}
        </div>

        {/* Display the username or the input field */}
        {!input ? (
          <p className="font-inter text-sm font-medium leading-4 text-left mt-3">@alexajohn</p>
        ) : (
          showinput && <div className="mb-2">{showinput}</div>
        )}

        <p className="mt-3 text-xs text-gray-500 flex items-center mb-2">
        <span className="mr-1 flex items-center justify-center w-4 h-4 bg-customYellow border border-customYellow rounded-full text-white font-bold text-[10px]">
          !
        </span>
          You can change your username once a year.
        </p>
      </div>

      {/* Status Card */}
      <div className="p-4 bg-white shadow-sm rounded-2xl">
        <div className="flex justify-between mb-2">
          <p className="my-auto w-[79px] h-[20px] font-inter text-sm text-textBlack font-semibold leading-[20px] tracking-[-0.005em] text-left ">Status</p>
          {showDropdown && (
            <span
              className={`px-8 py-1.5  ${
                status === "Active" ? " text-green-600 bg-green-100" : " text-red-400 bg-red-100"
              } rounded-full`}
            >
              <p className="w-full mx-auto text-xs font-medium text-center">{status}</p>
            </span>
          )}
        </div>

        <div className="flex items-center justify-between">
          <p className="text-xs text-gray-500 ">Status</p>
          {!showDropdown && (
            <span
              className={`px-8 py-1.5 text-xs h-7 ${
                status === "Active" ? " text-green-600 bg-green-100" : " text-red-600 bg-red-100"
              } rounded-full`}
            >
              <p className="text-xs font-medium w-fulltext-center">{status}</p>
            </span>
          )}
        </div>
        {showDropdown && dropdownComponent && <div className="">{dropdownComponent}</div>}
      </div>

      {/* User Role Card */}
      {showUserRole && (
        <div className="p-4 bg-white rounded-2xl ">
          <div className="flex justify-between mb-2">
            <p className="my-auto w-[65px] h-[20px] font-inter text-sm  text-textBlack font-semibold leading-[20px] tracking-[-0.005em] text-left">
              User Role
            </p>
            {showDropdown && (
              <span className="px-8 py-1.5 text-gray-600 bg-gray-200  rounded-full h-[28px]  text-center text-xs font-medium leading-4">
                <p className="w-full text-xs font-medium text-center">{role}</p>
              </span>
            )}
          </div>
          <div className="flex items-center justify-between">
            <p className="text-xs text-gray-500">Role</p>
            {!showDropdown && (
              <span className="px-8 py-1.5 text-xs text-gray-600 bg-gray-200 rounded-full">
                <p className="w-full mx-auto text-xs font-medium text-center">{role}</p>
              </span>
            )}
          </div>
          {showDropdown && dropdownRole && <div>{dropdownRole}</div>}
        </div>
      )}

      {/* Private Note Card */}
      <div className="p-4 bg-white shadow-sm rounded-2xl space-y-2">
        <div className="flex items-center justify-between">
          <p className="my-auto w-[81px] h-[20px] font-inter text-sm  text-textBlack font-semibold leading-[20px] tracking-[-0.005em] text-left text-nowrap">
            Private note
          </p>
          <button className="text-xs font-medium leading-4 text-left text-blue-600" onClick={onAddNote}>
            + Add Note
          </button>
        </div>
        <p className="text-xs text-gray-500">Only visible to you</p>
      </div>
    </>
  );
};

export default CombinedCard;
