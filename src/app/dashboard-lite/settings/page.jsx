"use client"
import React, { useState } from "react";
import GeneralTab from "@/components/Settings/GeneralTab";
import SecurityTab from "@/components/Settings/SecurityTab";
import SessionsTab from "@/components/Settings/SessionsTab";
import LegalTab from "@/components/Settings/LegalTab";
import Container from "@/components/Container/Container";
import TabNavigationBar from "@/components/Elements/TabNavigationBar/TabNavigationBar";

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { name: 'General', content: <GeneralTab /> },
    { name: 'Security', content: <SecurityTab /> },
    { name: 'Sessions', content: <SessionsTab /> },
  ];

  return (
    <>
      <Container pageName={"Settings"}>
        <div className="mx-auto max-w">
          {/** Tabs Navigation */}
          <TabNavigationBar tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />

          {/** Tab Content */}
          <div className="mt-4 rounded-lg">
            <div>{tabs[activeTab].content}</div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default SettingsPage;
