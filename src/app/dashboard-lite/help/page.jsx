"use client"
import React, { useEffect, useRef, useState } from "react";
import NavBar from "@/components/NavBar/NavBar";
import HelpCenterBody from "@/components/HelpCenter/HelpCenterBody"

export default function HelpCenterPage() {

  return (
    <>
      <NavBar>
        <HelpCenterBody />
      </NavBar>
    </>
  )
}
