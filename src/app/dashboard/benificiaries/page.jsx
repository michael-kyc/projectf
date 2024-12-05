"use client";
import React from "react";
import Container from "@/components/Container/Container";
import BeneficiaryBody from "@/components/Beneficiary/BenificiaryList/BeneficiaryBody";

const page = () => {
  return (
    <Container pageName="Beneficary">
      <BeneficiaryBody />
    </Container>
  );
};

export default page;
