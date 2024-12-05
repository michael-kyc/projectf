/* eslint-disable @next/next/no-img-element */
"use client";
import { TextButton } from "@/components/Elements/Button/Button";
import Back from "@/Icons/Back";
import { useRouter } from "next/navigation";
import React from "react";

const TopHeader = ({ setIsEditOpen, isEditOpen }) => {
  const router = useRouter();
  return (
    <div className="flex flex-row items-center justify-between py-2 gap-1 md:gap-0 px-2">
      <div className="flex flex-row items-center gap-2 sm:gap-4">
        <button
          onClick={() => {
            router.back();
          }}
        >
          <Back />
        </button>
        <div className="flex items-center gap-1">
          <img
            src={"https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}
            alt="Logo"
            className="w-8 h-8 rounded-full"
          />
          <h1 className="text-[14px] md:text-[14px] font-medium leading-[20px] tracking[-0.005em] text-left">
            Michel Jackson
          </h1>
        </div>
      </div>
      <div className="flex items-center justify-center gap-2">
        {!isEditOpen ? (
          <TextButton
            width="w-20"
            title="Remove"
            textColor="text-red-500"
            backgroundColor="bg-white"
            borderColor="border border-red-500"
          />
        ) : (
          <TextButton
            width="w-20"
            title="Cancel"
            textColor="text-black"
            backgroundColor="bg-white"
            borderColor="border border-primary50"
            onClick={() => setIsEditOpen(false)}
          />
        )}
        <TextButton
          width="w-20"
          title="Edit"
          className="bg-black text-white"
          onClick={() => setIsEditOpen(true)}
        />
      </div>
    </div>
  );
};

export default TopHeader;
