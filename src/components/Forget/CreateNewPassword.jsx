"use client";
import { useState } from "react";
import AuthInput from "@/components/Elements/Input/AuthInput";
import { AuthButton } from "@/components/Elements/Button/Button";

export function CreateNewPasswordComponent({ onNext }) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <div className="flex flex-col justify-start h-full w-full md:w-[500px] mx-auto">
      <h2 className="mb-2 text-base font-semibold text-textBlack">
        Create New Password
      </h2>
      <p className="text-xs font-normal text-textSecondary">
        Create a strong password to keep your account secure.
      </p>

      {/* Password Input */}
      <div className="mt-6 lg:mt-10 mb-4">
        <AuthInput
          type="password"
          value={password}
          label="New Password*"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="mb-6 lg:mb-10">
        <AuthInput
          type="password"
          value={confirmPassword}
          label="Confirm new Password*"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>

      <AuthButton
        className="rounded-lg bg-textBlack"
        title="Set new password"
        onClick={onNext}
      />
    </div>
  );
}
