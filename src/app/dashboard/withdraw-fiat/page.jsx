"use client"
import React, { useState, useEffect } from "react";
import Container from "@/components/Container/Container";
import ChooseBeneficiary from "@/components/WithdrawFiat/ChooseBeneficiary";
import ConfirmExchange from "@/components/WithdrawFiat/ConfirmExchange";
import PaymentProcessing from "@/components/WithdrawFiat/PaymentProcessing";
import AddBeneficiary from "@/components/AddBeneficiary/AddBeneficiary";
import PaymentSent from "@/components/WithdrawFiat/PaymentSent";
import WithdrawFiat from "@/components/WithdrawFiat/WithdrawFiat";

export default function WithdrawPage() {
  const [step, setStep] = useState(1);

  const goToWithdraw = () => setStep(2);
  const goToConfirmExchange = () => setStep(3);
  const goToProcessing = () => setStep(4);
  const goToSent = () => setStep(5);
  const goToAddBeneficiary = () => setStep(6);
  const goBack = () => setStep(step - 1);

  return (
    <>
      <Container pageName={"Accounts"}>
        {step === 1 && <ChooseBeneficiary onNext={goToWithdraw} onAdd={goToAddBeneficiary} />}
        {step === 2 && <WithdrawFiat onNext={goToConfirmExchange} onBack={goBack} />}
        {step === 3 && <ConfirmExchange onNext={goToProcessing} onBack={goBack} />}
        {step === 4 && <PaymentProcessing onNext={goToSent} onBack={goBack} />}
        {step === 5 && <PaymentSent onBack={goBack} />}
        {step === 6 && <AddBeneficiary onNext={goToAddBeneficiary} onBack={() => setStep(1)} onAdd={goToProcessing} />}
      </Container>
    </>
  )
}