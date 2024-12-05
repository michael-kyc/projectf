"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { AuthButton } from "@/components/Elements/Button/Button";
import DoneImg from "@/Icons/iconsComponent/DoneImg";

export function PasswordResetThankYouComponent() {
  const router = useRouter();
  return (
    <div className="flex flex-col justify-start h-full w-full md:w-[500px] mx-auto">
      <h2 className="mb-2 text-base font-semibold text-textBlack">Thank you</h2>
      <p className="text-xs font-normal text-textSecondary">
        Your password has been reset.
      </p>

      {/* Password Input */}
      <div className="flex flex-col items-center mt-6 lg:mt-10 mb-6 lg:mb-4">
        <DoneImg className="w-[500px] h-[220px]" />
      </div>

      <AuthButton
        title="Go to Sign in"
        className="rounded-lg bg-textBlack"
        onClick={() => router.push("/auth/sign-in")}
      />
    </div>
  );
}
