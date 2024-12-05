"use client";

import AuthHeader from "@/components/Register/AuthHeader";
import { ChooseService } from "@/components/Register/ChooseService";
import { CreateUsernameComponent } from "@/components/Register/CreateUsername";
import { EmailInputComponent } from "@/components/Register/EmailInputs";
import { MobileNumberComponent } from "@/components/Register/MobileNumber";
import { PasscodeComponent } from "@/components/Register/Passcode";
import { PasswordComponent } from "@/components/Register/Password";
import { VerificationComponent } from "@/components/Register/Verification";
import { AllDone } from "@/components/Register/AllDone";
import Image from "next/image";
import { useState } from "react";
import BackArrow from "@/Icons/iconsComponent/BackArrow";

export default function WalletFlow() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({})

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
          {step === 1 && <ChooseService onNext={handleNextStep} />}
          {step === 2 && (
            <EmailInputComponent
              onBack={handleBackStep}
              setFormData={setFormData}
              onContinue={handleNextStep}
            />
          )}
          {step === 3 && (
            <VerificationComponent
              type="Email"
              onBack={handleBackStep}
              setFormData={setFormData}
              onContinue={handleNextStep}
              contactInfo="johndoe@gmail.com"
              changeInfoText="Change Email Address"
            />
          )}
          {step === 4 && (
            <MobileNumberComponent
              onBack={handleBackStep}
              setFormData={setFormData}
              onContinue={handleNextStep}
            />
          )}
          {step === 5 && (
            <VerificationComponent
              type="Mobile"
              onBack={handleBackStep}
              setFormData={setFormData}
              contactInfo="500067867837"
              onContinue={handleNextStep}
              changeInfoText="Change Mobile Number"
            />
          )}
          {step === 6 && (
            <PasswordComponent
              onBack={handleBackStep}
              setFormData={setFormData}
              onConfirm={handleNextStep}
            />
          )}
          {step === 7 && (
            <PasscodeComponent
              title="Create Passcode"
              onBack={handleBackStep}
              setFormData={setFormData}
              onConfirm={handleNextStep}
              subtitle="Set up your passcode for quick and secure access to all app features."
            />
          )}
          {step === 8 && (
            <PasscodeComponent
              title="Repeat Passcode"
              onBack={handleBackStep}
              setFormData={setFormData}
              onConfirm={handleNextStep}
              subtitle="Set up your passcode for quick and secure access to all app features."
            />
          )}
          {step === 9 && (
            <CreateUsernameComponent
              onBack={handleBackStep}
              onCreate={handleNextStep}
              setFormData={setFormData}
            />
          )}
          {step === 10 && <AllDone />}
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
