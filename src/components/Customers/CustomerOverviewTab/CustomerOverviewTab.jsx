import React, { useState } from "react";
import SubTabNavigation from "@/components/Elements/TabNavigationBar/SubTabsNavigation";
import ProfileOverviewTab from "@/components/CustomerProfile/ProfileOverviewTab";
import AccountActionsTab from "@/components/CustomerProfile/AccountActionsTab";
import RelatedAccountsTab from "@/components/CustomerProfile/RelatedAccountsTab";
import ActivityLogsTab from "@/components/CustomerProfile/ActivityLogsTab";
import CustomerProfileOverviewTab from "../CustomerProfileOverview/CustomerProfileOverview";

const CustomerOverviewTab = ({
  customerDetails,
  formData,
  setFormData,
  showSecondComponent,
}) => {
  const [activeSubTab, setActiveSubTab] = useState(0);

  const subTabs = [
    {
      name: "Information",
      content: (
        <CustomerProfileOverviewTab
          customerDetails={customerDetails}
          formData={formData}
          setFormData={setFormData}
          showSecondComponent={showSecondComponent}
        />
      ),
    },
    { name: "Financial Summary", content: <AccountActionsTab /> },
    { name: "Related Accounts", content: <RelatedAccountsTab /> },
    { name: "Activity Log", content: <ActivityLogsTab /> },
  ];

  return (
    <div>
      <SubTabNavigation
        tabs={subTabs}
        activeTab={activeSubTab}
        setActiveTab={setActiveSubTab}
        selectIndex={true}
      />
      <div className="mt-3 rounded-lg">
        <div>{subTabs[activeSubTab].content}</div>
      </div>
    </div>
  );
};
export default CustomerOverviewTab;
