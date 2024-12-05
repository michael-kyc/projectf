"use client";
import { useState } from "react";
import Image from "next/image";
import AuthHeader from "@/components/Register/AuthHeader";
import { VerifyEmailComponent } from "@/components/Forget/VerifyEmail";
import { ResetPasswordComponent } from "@/components/Forget/ResetPassword";
import { PasswordResetThankYouComponent } from "@/components/Forget/ThankYou";
import { CreateNewPasswordComponent } from "@/components/Forget/CreateNewPassword";
import BackArrow from "@/Icons/iconsComponent/BackArrow";

export default function ForgetPasswordPage() {
  const [step, setStep] = useState(1);

  const handleNextStep = () => setStep(step + 1);
  const handleBackStep = () => setStep(step - 1);

  return (
    <div className="grid grid-cols-2 h-screen">
      <div className="col-span-2 lg:col-span-1 w-full bg-white flex flex-col items-center px-4">
        <div className="flex flex-col pt-12">
          <div className="mb-32">
            <AuthHeader title="WalletName" />
          </div>
          {step !== 1 && (
            <div
              className="flex items-center gap-2 mb-4"
              onClick={handleBackStep}
            >
              <BackArrow></BackArrow>
              <span
                onClick={handleBackStep}
                className="font-normal text-xs text-textBlack cursor-pointer"
              >
                Back
              </span>
            </div>
          )}
          {step === 1 && <ResetPasswordComponent onNext={handleNextStep} />}
          {step === 2 && (
            <VerifyEmailComponent
              onNext={handleNextStep}
              onBack={handleBackStep}
            />
          )}
          {step === 3 && <CreateNewPasswordComponent onNext={handleNextStep} />}
          {step === 4 && <PasswordResetThankYouComponent />}
        </div>
      </div>

      <div className="lg:col-span-1 relative hidden w-full lg:block">
        <Image
          src={"/assets/images/signUp.jpg"}
          layout="fill"
          objectFit="cover"
          alt="City view"
        />
      </div>
    </div>
  );
}
