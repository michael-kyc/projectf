"use client";
import React from "react";
import NavBar from "@/components/NavBar/NavBar";
import ProfileBody from "@/components/Profile/ProfileBody";

export default function ProfilePage() {
  return (
    <>
      <NavBar pageName={"Company Management "}>
        <ProfileBody customerDetails={{}} />
      </NavBar>
    </>
  );
}
