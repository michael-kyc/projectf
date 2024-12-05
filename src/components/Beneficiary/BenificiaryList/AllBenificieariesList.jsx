/* eslint-disable @next/next/no-img-element */
import ChevronRight from "@/Icons/ChevronRight";
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

const AllBenificieariesList = () => {
  const router = useRouter();
  return (
    <div className="w-full flex flex-col gap-2 px-4 pb-2">
      {transactions.map((transaction, index) => (
        <div
          key={index}
          className={`flex items-center justify-between py-4 hover:bg-gray-50 transition-colors duration-200 ${
            index !== transactions.length - 1 && "border-b border-b-gray-100"
          }`}
          onClick={() => router.push("/dashboard/benificiaries/1")}
        >
          <div className="flex items-center space-x-3">
            <Alice className="object-cover w-8 h-8 border rounded-full" />
            <div className="flex flex-col">
              <span className="text-xs font-medium text-gray-900">
                {transaction.name}
              </span>
              {/* <span className="text-xs text-gray-500">
                You sent {transaction.amount}
              </span> */}
            </div>
          </div>
          <ChevronRight className="h-[14px] w-[14px]" />
        </div>
      ))}
    </div>
  );
};

export default AllBenificieariesList;
