"use client";
import React, {useState, useEffect, useCallback} from "react";
import SessionItem from "./SessionItem";
import { useUser} from "@/app/context/UserContext";
import useApi from "@/hooks/useApi";
export default function SessionsTab() {
  // const sessions = [
  //   {
  //     id: 1,
  //     deviceType: "Mac",
  //     deviceName: "1 session on Mac computer",
  //     location: "UAE",
  //     browser: "Google Chrome",
  //     lastActive: "39 minutes",
  //     isCurrentSession: true,
  //   },
  //   {
  //     id: 2,
  //     deviceType: "Phone",
  //     deviceName: "1 session on iPhone",
  //     location: "Iraq",
  //     browser: "iOS Account Manager, iOS",
  //     lastActive: "39 minutes",
  //     isCurrentSession: false,
  //   },
  // ];

  const [sessions, setSessions] = useState([])
  const { user, fetchUser } = useUser();
  const { fetchData, loading, error } = useApi();
  useEffect(() => {
    if (!user) return
    const mappedSessions = user.sessions.map((session, index, arr) => {
      const isCurrentSession = index === arr.length - 1; // Last created session
      // Calculate the time difference from now to session creation
      const createdDate = new Date(session.created);
      const now = new Date();
      const diffInMs = now.getTime() - createdDate.getTime();

      const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
      const diffInHours = Math.floor(diffInMinutes / 60);
      const diffInDays = Math.floor(diffInHours / 24);

      const remainingHours = diffInHours % 24;
      const remainingMinutes = diffInMinutes % 60;

      // Build the "time ago" string
      const timeAgoParts = [];
      if (diffInDays > 0) timeAgoParts.push(`${diffInDays} day${diffInDays > 1 ? 's' : ''}`);
      if (remainingHours > 0) timeAgoParts.push(`${remainingHours} hour${remainingHours > 1 ? 's' : ''}`);
      if (remainingMinutes > 0) timeAgoParts.push(`${remainingMinutes} minute${remainingMinutes > 1 ? 's' : ''}`);
      const timeAgo = timeAgoParts.length > 0 ? timeAgoParts.join(', ') + '' : 'just now';

      return {
        id: session.id,
        deviceType: session.device_type || "Unknown Device",
        deviceName: `1 session on ${session.device_type || "Unknown"} device`,
        location: session.city !== "Unknown" && session.country !== "Unknown"
          ? `${session.city}, ${session.country}`
          : "Unknown",
        browser: session.browser || "Unknown Browser",
        lastActive: timeAgo,
        isCurrentSession,
      };
    });
    
    setSessions(mappedSessions)
  }, [user])
  // Example sign out handler
  const handleSignOut = useCallback(async (id) => {
    const { result, error } = await fetchData(`/auth/logoutSession`, {
      method: "POST",
      body: {
        id: id
      }
    });
    if (!error) {
      if (result.status === 'success') {
        fetchUser()
      }
    }
  }, []);

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
