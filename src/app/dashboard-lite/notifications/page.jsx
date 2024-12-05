"use client"
import React, { useEffect, useRef, useState } from "react";
import NavBar from "@/components/NavBar/NavBar";
import NotificationsBody from "@/components/Notifications/NotificationsBody";


export default function NotificationsPage() {

  return (
    <>
      <NavBar>
        <NotificationsBody />
      </NavBar>
    </>
  )
}
