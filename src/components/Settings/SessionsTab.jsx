"use client";
import React from "react";
import SessionItem from "./SessionItem";

export default function SessionsTab() {
  const sessions = [
    {
      id: 1,
      deviceType: "Mac",
      deviceName: "1 session on Mac computer",
      location: "UAE",
      browser: "Google Chrome",
      lastActive: "39 minutes",
      isCurrentSession: true,
    },
    {
      id: 2,
      deviceType: "Phone",
      deviceName: "1 session on iPhone",
      location: "Iraq",
      browser: "iOS Account Manager, iOS",
      lastActive: "39 minutes",
      isCurrentSession: false,
    },
  ];

  // Example sign out handler
  const handleSignOut = (id) => {
    console.log(`Signing out session with id: ${id}`);
  };

  return (
    <>
      <div className="p-4 mt-3 bg-white border shadow-sm rounded-xl border-primary50">
          <h2 className="font-semibold text-sm leading-[20px] tracking[-0.005em] text-textBlack mb-2 text-left">
            Manage linked accounts
          </h2>
          <p className="mb-2 text-textSecondary text-xs">
            You’re signed in on these devices or have been in the last 28 days.
            There might be multiple activity sessions from the same device.
          </p>
        <div className="flex flex-col gap-2">
          {sessions.map((session) => (
            <SessionItem
              key={session.id}
              deviceType={session.deviceType}
              deviceName={session.deviceName}
              location={session.location}
              browser={session.browser}
              isCurrentSession={session.isCurrentSession}
              lastActive={session.lastActive}
              signOutHandler={() => handleSignOut(session.id)}
            />
          ))}
        </div>
      </div>
    </>
  );
}
