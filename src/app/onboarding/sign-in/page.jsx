"use client";
import Image from "next/image";
import { useState } from "react";
import AuthHeader from "@/components/Register/AuthHeader";
import { SignInComponent } from "@/components/sign-in/SignIn";
import EnterCodeComponent from "@/components/sign-in/EnterCode";
import BackArrow from "@/Icons/iconsComponent/BackArrow";

export default function SignInPage() {
  const [step, setStep] = useState(1);

  const handleNextStep = () => {
    if (step === 11) {
      setStep(1);
    } else {
      setStep(step + 1);
    }
  };
  const handleBackStep = () => {
    setStep(step - 1);
  };

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
          {step === 1 && <SignInComponent handleNextStep={handleNextStep} />}
          {step === 2 && <EnterCodeComponent />}
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
