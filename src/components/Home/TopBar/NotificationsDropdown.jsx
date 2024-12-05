import React, { useState } from "react";
import TabWithCount from "./TabWithCount";

const notificationsData = [
  {
    id: 1,
    icon: "AB", // Placeholder for avatar
    title: "Pending Approval",
    description: "A new company is awaiting your approval.",
    time: "2m",
    isUnread: true,
  },
  {
    id: 2,
    icon: "📤", // Placeholder for upload icon
    title: "File uploaded",
    description: "Your file has successfully been uploaded",
    time: "14h",
    isUnread: false,
  },
  {
    id: 3,
    icon: "🔑", // Placeholder for reset icon
    title: "Password reset",
    description: "Your file has successfully been uploaded",
    time: "14h",
    isUnread: false,
  },
];

const NotificationsDropdown = ({ closeDropdown }) => {
  const [activeTab, setActiveTab] = useState("All");

  return (
    <div className="absolute bg-white border border-gray-300 shadow-lg w-60 md:w-96 right-20 md:right-44 rounded-xl top-14">
      <div className="p-4 space-y-4">
        <div className="text-sm font-semibold">Notifications</div>

        {/* Tabs */}
        <div className="relative flex pb-2 space-x-4 text-xs border-b border-gray-300">
          <button
            className={`relative pb-2 ${activeTab === "All" ? "font-semibold text-black" : "text-gray-500"}`}
            onClick={() => setActiveTab("All")}
          >
            <TabWithCount label="All" count={notificationsData.length} />
            {activeTab === "All" && <span className="absolute left-0 bottom-[-10px] w-full h-[3px] bg-black"></span>}
          </button>

          <button
            className={`relative pb-2 ${activeTab === "Unread" ? "font-semibold text-black" : "text-gray-500"}`}
            onClick={() => setActiveTab("Unread")}
          >
            <TabWithCount label="Unread" count={0} />
            {activeTab === "Unread" && <span className="absolute left-0 bottom-[-10px] w-full h-[3px] bg-black"></span>}
          </button>
        </div>

        {/* Notifications List */}
        <div className="divide-y">
          {notificationsData.map((notification) => (
            <div key={notification.id} className="flex items-center justify-between py-2">
              <div className="flex items-center space-x-2">
                {/* Notification Icon */}
                <div className="flex items-center justify-center w-8 h-8 text-gray-700 bg-gray-200 rounded-full">
                  {notification.icon}
                </div>
                {/* Notification Text */}
                <div>
                  <p className="text-xs font-semibold">{notification.title}</p>
                  <p className="text-[11px] text-gray-500">{notification.description}</p>
                </div>
              </div>
              {/* Notification Time */}
              <div className="text-[11px] text-gray-500">{notification.time}</div>
            </div>
          ))}
        </div>
      </div>

      {/* View All Button */}
      <div className="py-3 bg-gray-50">
        <button
          className="w-full py-2 text-xs font-semibold text-center rounded-lg text-primary"
          onClick={closeDropdown}
        >
          View all
        </button>
      </div>
    </div>
  );
};

export default NotificationsDropdown;
