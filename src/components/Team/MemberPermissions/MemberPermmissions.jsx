"use client";
import React from "react";
import UserCardsInfo from "../UserInfo/UserInfo";
import Cross from "@/Icons/Cross";
import Check from "@/Icons/Check";

const MemberPermissions = ({ userData }) => {
  const permissions = userData?.permission || {};

  const PermissionItem = ({ label, isAllowed }) => (
    <li className="flex text-sm flex-row  gap-2">
      {isAllowed ? <Check /> : <Cross />}
      <p>{label}</p>
    </li>
  );

  const PermissionSection = ({ title, isAllowed, items }) => (
    <div>
      <h4 className="font-medium text-sm mb-2 flex flex-row gap-4">
        {isAllowed ? <Check /> : <Cross />}
        <p>{title}</p>
      </h4>
      <ul className="space-y-2 text-textBlack pl-4 text-[12px] font-normal leading-4">
        {items.map((item, index) => (
          <PermissionItem
            key={index}
            label={item.label}
            isAllowed={item.isAllowed}
          />
        ))}
      </ul>
    </div>
  );

  return (
    <div className="  mx-auto grid grid-cols-3 gap-6 mb-8">
      <div className="col-span-3 md:col-span-2 space-y-6">
        {/* Account Management */}
        <div className="bg-white p-4  rounded-2xl">
          <h3 className="mb-4 text-sm font-semibold text-textBlack leading-[20px] tracking-[-0.005em] text-left">
            Account Management
          </h3>
          <div className="grid grid-cols-2 gap-6">
            <PermissionSection
              title="User Access"
              isAllowed={permissions.userAccess}
              items={[
                { label: "View Users", isAllowed: permissions.viewUsers },
                { label: "Edit Users", isAllowed: permissions.editUsers },
                { label: "Delete Users", isAllowed: permissions.deleteUsers },
                { label: "Block Users", isAllowed: permissions.blockUsers },
              ]}
            />
            <PermissionSection
              title="Role Management"
              isAllowed={permissions.roleManagement}
              items={[
                { label: "Create Roles", isAllowed: permissions.createRoles },
                { label: "Assign Roles", isAllowed: permissions.assignRoles },
                { label: "Edit Roles", isAllowed: permissions.editRoles },
              ]}
            />
          </div>
        </div>

        {/* Financial Management */}
        <div className="bg-white p-4  rounded-2xl">
          <h3 className="mb-4 text-sm font-semibold text-textBlack leading-[20px] tracking-[-0.005em] text-left">
            Financial Management
          </h3>
          <div className="grid grid-cols-2 gap-6">
            <PermissionSection
              title="Transactions"
              isAllowed={permissions.transactions}
              items={[
                {
                  label: "View Transactions",
                  isAllowed: permissions.viewTransactions,
                },
                {
                  label: "Approve Transactions",
                  isAllowed: permissions.approveTransactions,
                },
                {
                  label: "Export Transactions",
                  isAllowed: permissions.exportTransactions,
                },
              ]}
            />
            <PermissionSection
              title="Reports"
              isAllowed={permissions.reports}
              items={[
                { label: "View Reports", isAllowed: permissions.viewReports },
                {
                  label: "Approve Reports",
                  isAllowed: permissions.approveReports,
                },
                {
                  label: "Export Reports",
                  isAllowed: permissions.exportReports,
                },
              ]}
            />
          </div>
        </div>

        {/* Settings */}
        <div className="bg-white p-4  rounded-2xl">
          <h3 className="mb-4 text-sm font-semibold text-textBlack leading-[20px] tracking-[-0.005em] text-left">
            Settings
          </h3>
          <div className="grid grid-cols-2 gap-6">
            <PermissionSection
              title="General Settings"
              isAllowed={permissions.generalSettings}
              items={[
                {
                  label: "Edit General Settings",
                  isAllowed: permissions.editGeneralSettings,
                },
                {
                  label: "Change Platform Preferences",
                  isAllowed: permissions.changePlatformPreferences,
                },
              ]}
            />
            <PermissionSection
              title="Security"
              isAllowed={permissions.security}
              items={[
                {
                  label: "Manage Security Settings",
                  isAllowed: permissions.manageSecuritySettings,
                },
                {
                  label: "View Security Logs",
                  isAllowed: permissions.viewSecurityLogs,
                },
              ]}
            />
          </div>
        </div>
      </div>

      <div className="col-span-3 md:col-span-1">
        <UserCardsInfo userData={userData} />
      </div>
    </div>
  );
};

export default MemberPermissions;
