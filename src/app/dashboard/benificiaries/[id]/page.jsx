"use client";
import BeneficiaryDetailsBody from "@/components/Beneficiary/BenificiaryDetails/BeneficiaryDetailsBody";
import Container from "@/components/Container/Container";
import React, { useState } from "react";

const BenificiaryDetails = () => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  return (
    <Container pageName={"Beneficiary Details"}>
      <div className="w-full h-max sm:pl-2">
        <BeneficiaryDetailsBody setIsEditOpen={setIsEditOpen} isEditOpen={isEditOpen} />
      </div>
    </Container>
  );
};

export default BenificiaryDetails;
