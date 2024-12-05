"use client";
import { useState } from "react";
import Image from "next/image";
import AuthHeader from "@/components/sign-up/AuthHeader";
import { ResetPasswordComponent } from "@/components/Forget/ResetPassword";
import { PasswordResetThankYouComponent } from "@/components/Forget/ThankYou";
import { CreateNewPasswordComponent } from "@/components/Forget/CreateNewPassword";
import BackArrow from "@/Icons/iconsComponent/BackArrow";

export default function ForgetPasswordPage() {
  const [step, setStep] = useState(1);

  const handleNextStep = () => setStep(step + 1);
  const handleBackStep = () => setStep(step - 1);

  return (
    <div className="grid h-screen grid-cols-2">
      <div className="flex flex-col items-center w-full col-span-2 px-4 bg-white lg:col-span-1">
        <div className="flex flex-col pt-12">
          <div className="mb-20 lg:mb-32">
            <AuthHeader title="WalletName" />
          </div>
          {step !== 1 && (
            <div className="flex items-center gap-2 mb-4">
              <BackArrow className="w-14 h-14" />
              <span
                onClick={handleBackStep}
                className="text-xs font-normal cursor-pointer text-textBlack"
              >
                Back
              </span>
            </div>
          )}
          {step === 1 && <ResetPasswordComponent onNext={handleNextStep} />}
          {step === 2 && <CreateNewPasswordComponent onNext={handleNextStep} />}
          {step === 3 && <PasswordResetThankYouComponent />}
        </div>
      </div>

      <div className="relative hidden w-full lg:col-span-1 lg:block">
      </div>
    </div>
  );
}
