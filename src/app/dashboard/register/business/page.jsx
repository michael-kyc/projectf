'use client'
import BusinessCreateAccount from "@/components/register/business/create-business";
import EntityVerification from "@/components/register/business/entity-verification";
import EntityVerificationModal from "@/components/register/business/verification-modal";
import Image from 'next/image'
import React, { useState } from "react"
import Container from "@/components/Container/Container";
import BusinessAccountType from "@/components/register/business/account-type"
import BackArrow from "@/Icons/iconsComponent/BackArrow";

const titles = [
  'Choose business account type',
  'Create a business account',
  'Entity Verification'
]
const RegisterBusiness = () => {
  const [activeStep, setActiveStep] = useState(0)
  const [isVerificationModalOpen, setVerificationModalOpen] = useState(false)

  const toggleVerificationModal = () => setVerificationModalOpen(prev => !prev)
  const handleNext = () => setActiveStep(step => step + 1)

  return (
    <Container pageName={"Dashboard"}>
      <div className="flex items-start justify-center h-screen bg-creamy mt-2 sm:mt-6">
        <div className="w-full sm:w-[500px] flex flex-col justify-between gap-4 rounded-2xl border-[1px] border-primary50 p-4 bg-white">
          <div className="flex items-center gap-2">
            {activeStep !== 0 && (
              <BackArrow></BackArrow>
            )}
            <h2 className="font-semibold text-sm text-textBlack">{titles[activeStep]}</h2>
          </div>

          {activeStep === 0 ? (
            <BusinessAccountType onNext={handleNext} />
          ) : activeStep === 1 ? (
            <BusinessCreateAccount onNext={handleNext} />
          ) : (
            <EntityVerification onNext={toggleVerificationModal}/>
          )}
        </div>
      </div>
      <EntityVerificationModal isModalOpen={isVerificationModalOpen} closeModal={toggleVerificationModal} />
    </Container>
  )
}

export default RegisterBusiness
