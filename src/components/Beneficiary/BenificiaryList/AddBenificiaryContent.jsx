import TabNavigationBar from "@/components/Elements/TabNavigationBar/TabNavigationBar";
import TabNavigationBarMobile from "@/components/Elements/TabNavigationBar/TabNavigationBarMobile";
import React, { useState } from "react";

import Back from "@/Icons/Back";

import IndividualTab from "@/components/AddBeneficiary/IndividualTab";
import BusinessTab from "@/components/AddBeneficiary/BusineesTab";
import DropDown from "@/components/Elements/DropDown/DropDown";
import SubTabNavigation from "@/components/Elements/TabNavigationBar/SubTabsNavigation";

const country = [
  { value: "1", label: "USA" },
  { value: "2", label: "UAE" }
];
const currency = [
  { value: "1", label: "USD" },
  { value: "2", label: "BTC" }
];
const AddBenificiaryContent = ({ onNext, onBack, onAdd }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedType, setSelectedType] = useState("Account Number");
  const subTabs = ["Account Number", "IBAN"];
  const tabs = [
    {
      name: "Individual",
      content: (
        <IndividualTab
          onNext={onNext}
          onBack={onBack}
          onAdd={onAdd}
          showActionBtn={false}
        />
      )
    },
    {
      name: "Business",
      content: (
        <BusinessTab
          onNext={onNext}
          onBack={onBack}
          onAdd={onAdd}
          showActionBtn={false}
        />
      )
    }
  ];

  return (
    <div className="items-center justify-center w-full bg-white max-h-[70vh] overflow-y-auto">
      <div className="flex-col p-4">
        <div className="md:hidden">
          <TabNavigationBarMobile
            tabs={tabs}
            width="w-full"
            activeTab={activeTab}
            className="bg-white"
            setActiveTab={setActiveTab}
          />
        </div>
        <div className="hidden md:block">
          <TabNavigationBar
            tabs={tabs}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        </div>
        <div className="mt-4 rounded-lg">
          {/* <div>{tabs[activeTab].content}</div> */}
          <div>
            <div className="space-y-4">
              <div className="mb-2 flex flex-col gap-1">
                <h2 className="text-xs">Country of recipient’s account</h2>
                <DropDown
                  items={country}
                  className="h-8 py-1 px-2 w-44 rounded-[10px]"
                  width={"w-full"}
                  title="Select country"
                />
              </div>
              <div className="mb-2 flex flex-col gap-1">
                <h2 className="text-xs">Currency</h2>
                <DropDown
                  items={currency}
                  className="h-8 w-44 rounded-[10px] py-1 px-2"
                  width={"w-full"}
                  title="Select currency"
                />
              </div>
              <div className="flex flex-row flex-wrap items-center justify-between gap-2 md:gap-0">
                <h2 className="text-sm font-semibold">Account details</h2>
                <div className="w-max h-max">
                  <SubTabNavigation
                    tabs={subTabs}
                    width="min-w-[80px]"
                    activeTab={selectedType}
                    setActiveTab={setSelectedType}
                  />
                </div>
              </div>
              {selectedType === subTabs[0] && (
                <IndividualTab
                  onNext={onNext}
                  onBack={onBack}
                  onAdd={onAdd}
                  showActionBtn={false}
                />
              )}
              {selectedType === subTabs[1] && (
                <BusinessTab
                  onNext={onNext}
                  onBack={onBack}
                  onAdd={onAdd}
                  showActionBtn={false}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBenificiaryContent;
