import React from "react";
import Laptop from "@/Icons/imageicon/Laptop";
import Mobile from "@/Icons/imageicon/Mobile";

const PrivacyAndSecurity = () => {
  return (
    <div className="container mx-auto space-y-8">
      {/* Privacy & Security Section */}
      <div>
        <h2 className="mb-4 text-sm font-semibold text-textBlack leading-[20px] tracking-[-0.005em] text-left">
          Privacy & Security
        </h2>
        <div className="space-y-4 text-sm">
          <div className="bg-white p-4 rounded-lg">
            <h3 className="mb-4 text-sm font-semibold text-textBlack leading-[20px] tracking-[-0.005em] text-left ">
              2FA Withdrawal
            </h3>
            <p className=" text-[12px] font-medium leading-[16px] text-left text-textSecondary">
              Enable biometric or passcode authentication when withdrawing from
              your watwallet.
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <h3 className="mb-4 text-sm font-semibold text-textBlack leading-[20px] tracking-[-0.005em] text-left">
              Change Passcode
            </h3>
            <p className=" text-[12px] font-medium leading-[16px] text-left text-textSecondary">
              Change the passcode used to log in to the app.
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <h3 className="mb-4 text-sm font-semibold text-textBlack leading-[20px] tracking-[-0.005em] text-left">
              Change Password
            </h3>
            <p className=" text-[12px] font-medium leading-[16px] text-left text-textSecondary  ">
              Change the password for your app account.
            </p>
          </div>
        </div>
      </div>

      {/* Manage Linked Accounts Section */}
      <div className="text-sm">
        <h2 className="text-sm font-bold text-textBlack mb-4">
          Manage linked accounts
        </h2>
        <p className=" text-[12px] font-medium leading-[16px] text-left text-textSecondary mb-4">
          John Doe signed in on these devices or has been in the last 28 days.
          There might be multiple activity sessions from the same device.
        </p>

        <div className="space-y-4">
          {/* Mac computer session */}
          <div className="bg-white p-4 rounded-lg  items-center flex flex-row justify-start ">
            <div className="flex flex-row  items-center">
              <Laptop className="w-12 h-12" />
              <h3 className="font-semibold ml-2  text-textBlack">
                1 session on Mac computer
              </h3>
            </div>
            <div className="w-52"></div>

            <div className="flex flex-col">
              <p className="text-textBlack text-sm font-normal mb-2">Mac OS</p>
              <p className="text-gray-500 text-sm font-normal">
                United Kingdom
              </p>
              <p className="text-gray-500 text-sm font-normal">Google Chrome</p>
              <p className="text-blue-500 mt-2 text-sm font-normal">
                ✓ Your current session
              </p>
            </div>
          </div>

          {/* iPhone session */}

          <div className="bg-white p-4 rounded-lg  items-center flex flex-row justify-start ">
            <div className="flex flex-row  items-center">
              <Mobile className="w-12 h-12" />
              <h3 className="font-semibold  text-textBlack">
                1 session on iPhone{" "}
              </h3>
            </div>
            <div className="w-52"></div>

            <div className="flex flex-col pl-16">
              <p className="text-textBlack text-sm font-normal mb-2">
                John’s iPhone
              </p>
              <p className="text-gray-500 text-sm font-normal">
                United Kingdom
              </p>
              <p className="text-gray-500 text-sm font-normal">
                39 minutes ago
              </p>
              <p className="text-gray-500 text-sm font-normal">
                iOS Account Manager, iOS
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyAndSecurity;
