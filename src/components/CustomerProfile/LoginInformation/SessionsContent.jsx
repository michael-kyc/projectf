import React from "react";
import Image from "next/image";
import SessionItem from "@/components/Settings/SessionItem";
import SessionsTab from "@/components/Settings/SessionsTab";

const SessionsContent = () => {
  const sessions = [
    {
      deviceName: "1 session on Mac computer",
      deviceImage: "/assets/icons/mac-computer.svg",
      sessions: "1",
      location: "Mac OS, UAE",
      browser: "Google Chrome",
      isCurrentSession: true,
      canSignOut: false,
      time: "",
      deviceType: "Mac",
    },
    {
      deviceName: "John's iPhone",
      deviceImage: "/assets/icons/iphone.svg",
      sessions: "1",
      location: "Iraq",
      browser: "iOS Account Manager, iOS",
      isCurrentSession: false,
      canSignOut: true,
      time: "39 minutes ago",
      onSignOut: () => alert("Signed out of John's iPhone"),
    },
  ];

  return (
    <>
      <SessionsTab/>
    </>
  );
};

export default SessionsContent;
