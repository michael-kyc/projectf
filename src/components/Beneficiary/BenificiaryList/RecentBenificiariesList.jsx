/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/navigation";
import React from "react";
import Alice from "@/Icons/imageicon/Alice";

const transactions = [
  {
    id: 1,
    name: "Alice John",
    amount: "$40",
    date: "Mon",
  },
  {
    id: 2,
    name: "Bob Smith",
    amount: "216.520249 USDT",
    date: "4 Sep",
  },
  {
    id: 3,
    name: "Charlie Brown",
    amount: "$180",
    date: "4 Sep",
  },
];

const RecentBenificiariesList = () => {
  const router = useRouter();
  return (
    <div className="w-full flex flex-col gap-2 px-4 pb-2">
      {transactions.map((transaction, index) => (
        <div
          key={transaction.id}
          className={`flex items-center justify-between gap-3 py-4 hover:bg-gray-50 transition-colors duration-200 ${
            index !== transactions.length - 1 && "border-b border-b-gray-100"
          }`}
          onClick={() => {
            router.push("/dashboard/benificiaries/1");
          }}
        >
          <div className="flex items-center gap-2 sm:gap-3">
            <Alice className="object-cover w-8 h-8 border rounded-full" />
            <div className="flex flex-col gap-0.5">
              <span className="text-xs font-medium text-textBlack">
                {transaction.name}
              </span>
              <span className="font-normal text-xs text-textSecondary">
                You sent {transaction.amount}
              </span>
            </div>
          </div>
          <span className="font-normal text-xs text-textSecondary">
            {transaction.date}
          </span>
        </div>
      ))}
    </div>
  );
};

export default RecentBenificiariesList;
