import React from "react";
import { TextButton } from "../Elements/Button/Button";
import Btc from "@/Icons/imageicon/Btc";
import USDT from "@/Icons/imageicon/USDT";

const CryptoAssets = () => {
  const assets = [
    {
      id: "btc",
      name: "BTC",
      fullName: "Bitcoin",
      icon: (
        <div className="flex items-center justify-center w-8 h-8">
          <Btc className="w-8 h-8" />
        </div>
      ),
      balance: "0.00000000",
      usdValue: "$ 0.00",
      costPrice: "₮ 0.00",
      pnl: "$ 0.00",
      showExtra: true,
    },
    {
      id: "usdt",
      name: "USDT",
      fullName: "Tether",
      icon: (
        <div className="flex items-center justify-center w-8 h-8">
          <USDT className="w-8 h-8" />
        </div>
      ),
      balance: "0.00000000",
      usdValue: "$ 0.00",
      showExtra: false,
    },
  ];

  return (
    <div className="h-auto p-4 bg-white border rounded-2xl border-primary50">
      <h2 className="mb-6 font-semibold text-cm">Assets</h2>

      <div className="space-y-6">
        {assets.map((asset) => (
          <div key={asset.id} className="space-y-[2px]">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                {asset.icon}
                <div>
                  <div className="text-sm">{asset.name}</div>
                  <div className="text-xs text-gray-500">{asset.fullName}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm">{asset.balance}</div>
                <div className="text-xs text-gray-500">{asset.usdValue}</div>
              </div>
            </div>

            {asset.showExtra && (
              <div className="pl-[45px]">
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    Cost price
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M1.5 7C1.5 6 1.75 5.07292 2.25 4.21875C2.73958 3.39583 3.39583 2.73958 4.21875 2.25C5.07292 1.75 6 1.5 7 1.5C8 1.5 8.92708 1.75 9.78125 2.25C10.6042 2.73958 11.2604 3.39583 11.75 4.21875C12.25 5.07292 12.5 6 12.5 7C12.5 8 12.25 8.92708 11.75 9.78125C11.2604 10.6042 10.6042 11.2604 9.78125 11.75C8.92708 12.25 8 12.5 7 12.5C6 12.5 5.07292 12.25 4.21875 11.75C3.39583 11.2604 2.73958 10.6042 2.25 9.78125C1.75 8.92708 1.5 8 1.5 7ZM7 0.5C5.82292 0.5 4.72917 0.796875 3.71875 1.39062C2.73958 1.96354 1.96354 2.73958 1.39062 3.71875C0.796875 4.72917 0.5 5.82292 0.5 7C0.5 8.17708 0.796875 9.27083 1.39062 10.2812C1.96354 11.2604 2.73958 12.0365 3.71875 12.6094C4.72917 13.2031 5.82292 13.5 7 13.5C8.17708 13.5 9.27083 13.2031 10.2812 12.6094C11.2604 12.0365 12.0365 11.2604 12.6094 10.2812C13.2031 9.27083 13.5 8.17708 13.5 7C13.5 5.82292 13.2031 4.72917 12.6094 3.71875C12.0365 2.73958 11.2604 1.96354 10.2812 1.39062C9.27083 0.796875 8.17708 0.5 7 0.5ZM8.14062 5.14062C8.01562 5.27604 7.85938 5.34375 7.67188 5.34375C7.48438 5.34375 7.32552 5.27865 7.19531 5.14844C7.0651 5.01823 7 4.85938 7 4.67188C7 4.48438 7.0651 4.32552 7.19531 4.19531C7.32552 4.0651 7.48438 4 7.67188 4C7.85938 4 8.01823 4.0651 8.14844 4.19531C8.27865 4.32552 8.34375 4.48438 8.34375 4.67188C8.34375 4.85938 8.27604 5.01562 8.14062 5.14062ZM8.375 9.53125C8.07292 9.63542 7.85417 9.70833 7.71875 9.75C7.53125 9.8125 7.33854 9.83854 7.14062 9.82812C6.81771 9.82812 6.5625 9.76042 6.375 9.625C6.29167 9.55208 6.22396 9.46875 6.17188 9.375C6.11979 9.28125 6.09375 9.17708 6.09375 9.0625C6.09375 8.97917 6.10156 8.89062 6.11719 8.79688C6.13281 8.70312 6.15625 8.60417 6.1875 8.5L6.53125 7.40625C6.54167 7.35417 6.54688 7.30208 6.54688 7.25V7.23438C6.54688 7.18229 6.55208 7.14583 6.5625 7.125C6.58333 7.02083 6.59375 6.91667 6.59375 6.8125C6.59375 6.73958 6.59115 6.6875 6.58594 6.65625C6.58073 6.625 6.5625 6.59635 6.53125 6.57031C6.5 6.54427 6.41667 6.53125 6.28125 6.53125L6.17188 6.54688C6.08854 6.54688 6 6.55729 5.90625 6.57812C5.86458 6.58854 5.82031 6.59375 5.77344 6.59375C5.72656 6.59375 5.69271 6.59896 5.67188 6.60938L5.76562 6.26562C5.97396 6.19271 6.1875 6.125 6.40625 6.0625C6.59375 6.01042 6.78646 5.98438 6.98438 5.98438C7.31771 5.98438 7.56771 6.05208 7.73438 6.1875C7.99479 6.38542 8.125 6.56771 8.125 6.73438L8.09375 6.98438C8.08333 7.09896 8.0625 7.20833 8.03125 7.3125L7.57812 8.39062C7.54688 8.49479 7.52344 8.59115 7.50781 8.67969C7.49219 8.76823 7.47917 8.85417 7.46875 8.9375C7.46875 9.08333 7.50521 9.18229 7.57812 9.23438C7.65104 9.28646 7.77604 9.3125 7.95312 9.3125C8.03646 9.3125 8.13281 9.29948 8.24219 9.27344C8.35156 9.2474 8.42708 9.22396 8.46875 9.20312L8.375 9.53125Z"
                        fill="#4D4D4D"
                      />
                    </svg>
                  </div>
                  <span>{asset.costPrice}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    Todays PnL
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M1.5 7C1.5 6 1.75 5.07292 2.25 4.21875C2.73958 3.39583 3.39583 2.73958 4.21875 2.25C5.07292 1.75 6 1.5 7 1.5C8 1.5 8.92708 1.75 9.78125 2.25C10.6042 2.73958 11.2604 3.39583 11.75 4.21875C12.25 5.07292 12.5 6 12.5 7C12.5 8 12.25 8.92708 11.75 9.78125C11.2604 10.6042 10.6042 11.2604 9.78125 11.75C8.92708 12.25 8 12.5 7 12.5C6 12.5 5.07292 12.25 4.21875 11.75C3.39583 11.2604 2.73958 10.6042 2.25 9.78125C1.75 8.92708 1.5 8 1.5 7ZM7 0.5C5.82292 0.5 4.72917 0.796875 3.71875 1.39062C2.73958 1.96354 1.96354 2.73958 1.39062 3.71875C0.796875 4.72917 0.5 5.82292 0.5 7C0.5 8.17708 0.796875 9.27083 1.39062 10.2812C1.96354 11.2604 2.73958 12.0365 3.71875 12.6094C4.72917 13.2031 5.82292 13.5 7 13.5C8.17708 13.5 9.27083 13.2031 10.2812 12.6094C11.2604 12.0365 12.0365 11.2604 12.6094 10.2812C13.2031 9.27083 13.5 8.17708 13.5 7C13.5 5.82292 13.2031 4.72917 12.6094 3.71875C12.0365 2.73958 11.2604 1.96354 10.2812 1.39062C9.27083 0.796875 8.17708 0.5 7 0.5ZM8.14062 5.14062C8.01562 5.27604 7.85938 5.34375 7.67188 5.34375C7.48438 5.34375 7.32552 5.27865 7.19531 5.14844C7.0651 5.01823 7 4.85938 7 4.67188C7 4.48438 7.0651 4.32552 7.19531 4.19531C7.32552 4.0651 7.48438 4 7.67188 4C7.85938 4 8.01823 4.0651 8.14844 4.19531C8.27865 4.32552 8.34375 4.48438 8.34375 4.67188C8.34375 4.85938 8.27604 5.01562 8.14062 5.14062ZM8.375 9.53125C8.07292 9.63542 7.85417 9.70833 7.71875 9.75C7.53125 9.8125 7.33854 9.83854 7.14062 9.82812C6.81771 9.82812 6.5625 9.76042 6.375 9.625C6.29167 9.55208 6.22396 9.46875 6.17188 9.375C6.11979 9.28125 6.09375 9.17708 6.09375 9.0625C6.09375 8.97917 6.10156 8.89062 6.11719 8.79688C6.13281 8.70312 6.15625 8.60417 6.1875 8.5L6.53125 7.40625C6.54167 7.35417 6.54688 7.30208 6.54688 7.25V7.23438C6.54688 7.18229 6.55208 7.14583 6.5625 7.125C6.58333 7.02083 6.59375 6.91667 6.59375 6.8125C6.59375 6.73958 6.59115 6.6875 6.58594 6.65625C6.58073 6.625 6.5625 6.59635 6.53125 6.57031C6.5 6.54427 6.41667 6.53125 6.28125 6.53125L6.17188 6.54688C6.08854 6.54688 6 6.55729 5.90625 6.57812C5.86458 6.58854 5.82031 6.59375 5.77344 6.59375C5.72656 6.59375 5.69271 6.59896 5.67188 6.60938L5.76562 6.26562C5.97396 6.19271 6.1875 6.125 6.40625 6.0625C6.59375 6.01042 6.78646 5.98438 6.98438 5.98438C7.31771 5.98438 7.56771 6.05208 7.73438 6.1875C7.99479 6.38542 8.125 6.56771 8.125 6.73438L8.09375 6.98438C8.08333 7.09896 8.0625 7.20833 8.03125 7.3125L7.57812 8.39062C7.54688 8.49479 7.52344 8.59115 7.50781 8.67969C7.49219 8.76823 7.47917 8.85417 7.46875 8.9375C7.46875 9.08333 7.50521 9.18229 7.57812 9.23438C7.65104 9.28646 7.77604 9.3125 7.95312 9.3125C8.03646 9.3125 8.13281 9.29948 8.24219 9.27344C8.35156 9.2474 8.42708 9.22396 8.46875 9.20312L8.375 9.53125Z"
                        fill="#4D4D4D"
                      />
                    </svg>
                  </div>
                  <span>{asset.pnl}</span>
                </div>
              </div>
            )}
          </div>
        ))}

        <div className="grid grid-cols-2 gap-3 pt-4">
          <TextButton
            title="Deposit"
            className="w-full px-10 py-2 mt-3 h-8 text-sm !text-black bg-white border border-primary50 rounded-[10px]"
          />
          <TextButton
            title="Transfer"
            className="w-full px-10 py-2 mt-3 h-8 text-sm !text-black bg-white border border-primary50 rounded-[10px]"
          />
        </div>
      </div>
    </div>
  );
};

export default CryptoAssets;