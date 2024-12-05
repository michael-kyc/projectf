import React, { useState } from "react";
import { Checkbox } from "primereact/checkbox";
import CheckBox from "@/components/Elements/Checkbox/CheckBox";

const PermissionsTab = ({ userData, permissions, setPermissions }) => {
  const handleCheckboxChange = (section, group, name) => {
    setPermissions((prevPermissions) => ({
      ...prevPermissions,
      [section]: {
        ...prevPermissions[section],
        [group]: {
          ...prevPermissions[section][group],
          [name]: !prevPermissions[section][group][name],
        },
      },
    }));
  };

  return (
    <div className="container mx-auto space-y-5">
      {/* Account Management */}
      <div className="bg-white p-4 rounded-2xl">
        <h2 className="font-inter text-sm font-semibold leading-5 tracking-tight text-left mb-2">
          Account Management
        </h2>
        <div className="grid grid-cols-2 gap-4">
          {/* User Access */}
          <div className="col-span-2 md:col-span-1">
            <h3 className="font-medium text-sm sm:text-base  text-textBlack mb-2">
              User Access
            </h3>
            <div className="pl-4 space-y-2">
              <label className="flex items-center gap-2 text-sm text-textBlack  text-textBlack">
                <CheckBox
                  checked={permissions.accountManagement.userAccess.viewUsers}
                  onChange={() =>
                    handleCheckboxChange(
                      "accountManagement",
                      "userAccess",
                      "viewUsers"
                    )
                  }
                />
                View Users
              </label>
              <label className="flex items-center gap-2 text-sm text-textBlack">
                <CheckBox
                  checked={permissions.accountManagement.userAccess.editUsers}
                  onChange={() =>
                    handleCheckboxChange(
                      "accountManagement",
                      "userAccess",
                      "editUsers"
                    )
                  }
                />
                Edit Users
              </label>
              <label className="flex items-center gap-2 text-sm text-textBlack">
                <CheckBox
                  checked={permissions.accountManagement.userAccess.deleteUsers}
                  onChange={() =>
                    handleCheckboxChange(
                      "accountManagement",
                      "userAccess",
                      "deleteUsers"
                    )
                  }
                />
                Delete Users
              </label>
              <label className="flex items-center gap-2 text-sm text-textBlack">
                <CheckBox
                  checked={permissions.accountManagement.userAccess.blockUsers}
                  onChange={() =>
                    handleCheckboxChange(
                      "accountManagement",
                      "userAccess",
                      "blockUsers"
                    )
                  }
                />
                Other: Block Users
              </label>
            </div>
          </div>

          {/* Role Management */}
          <div className="col-span-2 md:col-span-1">
            <h3 className="font-medium text-sm sm:text-base  text-textBlack mb-2">
              Role Management
            </h3>
            <div className="space-y-2 pl-4">
              <label className="flex items-center gap-2 text-sm text-textBlack">
                <CheckBox
                  checked={
                    permissions.accountManagement.roleManagement.createRoles
                  }
                  onChange={() =>
                    handleCheckboxChange(
                      "accountManagement",
                      "roleManagement",
                      "createRoles"
                    )
                  }
                />
                Create Roles
              </label>
              <label className="flex items-center gap-2 text-sm text-textBlack">
                <CheckBox
                  checked={
                    permissions.accountManagement.roleManagement.assignRoles
                  }
                  onChange={() =>
                    handleCheckboxChange(
                      "accountManagement",
                      "roleManagement",
                      "assignRoles"
                    )
                  }
                />
                Assign Roles
              </label>
              <label className="flex items-center gap-2 text-sm text-textBlack">
                <CheckBox
                  checked={
                    permissions.accountManagement.roleManagement.editRoles
                  }
                  onChange={() =>
                    handleCheckboxChange(
                      "accountManagement",
                      "roleManagement",
                      "editRoles"
                    )
                  }
                />
                Edit Roles
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Financial Management */}
      <div className="bg-white p-4 rounded-2xl">
        <h2 className="text-sm sm:text-base font-medium mb-4 text-textBlack">
          Financial Management
        </h2>
        <div className="grid grid-cols-2 gap-6">
          {/* Transactions */}
          <div className="col-span-2 md:col-span-1">
            <h3 className="font-medium text-sm sm:text-base  text-textBlack mb-2">
              Transactions
            </h3>
            <div className="space-y-2 pl-4">
              <label className="flex items-center gap-2 text-sm text-textBlack">
                <CheckBox
                  checked={
                    permissions.financialManagement.transactions
                      .viewTransactions
                  }
                  onChange={() =>
                    handleCheckboxChange(
                      "financialManagement",
                      "transactions",
                      "viewTransactions"
                    )
                  }
                />
                View Transactions
              </label>
              <label className="flex items-center gap-2 text-sm text-textBlack">
                <CheckBox
                  checked={
                    permissions.financialManagement.transactions
                      .approveTransactions
                  }
                  onChange={() =>
                    handleCheckboxChange(
                      "financialManagement",
                      "transactions",
                      "approveTransactions"
                    )
                  }
                />
                Approve Transactions
              </label>
              <label className="flex items-center gap-2 text-sm text-textBlack">
                <CheckBox
                  checked={
                    permissions.financialManagement.transactions
                      .exportTransactions
                  }
                  onChange={() =>
                    handleCheckboxChange(
                      "financialManagement",
                      "transactions",
                      "exportTransactions"
                    )
                  }
                />
                Export Transactions
              </label>
            </div>
          </div>

          {/* Reports */}
          <div className="col-span-2 md:col-span-1">
            <h3 className="font-medium text-sm sm:text-base  text-textBlack mb-2">
              Reports
            </h3>
            <div className="space-y-2 pl-4">
              <label className="flex items-center gap-2 text-sm text-textBlack">
                <CheckBox
                  checked={
                    permissions.financialManagement.reports.generateReports
                  }
                  onChange={() =>
                    handleCheckboxChange(
                      "financialManagement",
                      "reports",
                      "generateReports"
                    )
                  }
                />
                Generate Reports
              </label>
              <label className="flex items-center gap-2 text-sm text-textBlack">
                <CheckBox
                  checked={permissions.financialManagement.reports.viewReports}
                  onChange={() =>
                    handleCheckboxChange(
                      "financialManagement",
                      "reports",
                      "viewReports"
                    )
                  }
                />
                View Reports
              </label>
              <label className="flex items-center gap-2 text-sm text-textBlack">
                <CheckBox
                  checked={
                    permissions.financialManagement.reports.downloadReports
                  }
                  onChange={() =>
                    handleCheckboxChange(
                      "financialManagement",
                      "reports",
                      "downloadReports"
                    )
                  }
                />
                Download Reports
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Settings */}
      <div className="bg-white p-4 rounded-2xl ">
        <h2 className="text-sm sm:text-base font-medium mb-4 text-textBlack">
          Settings
        </h2>
        <div className="grid grid-cols-2 gap-6">
          {/* General Settings */}
          <div className="col-span-2 md:col-span-1">
            <h3 className="font-medium text-sm sm:text-base  text-textBlack mb-2">
              General Settings
            </h3>
            <div className="space-y-2 pl-4">
              <label className="flex items-center gap-2 text-sm text-textBlack">
                <CheckBox
                  checked={
                    permissions.settings.generalSettings.editGeneralSettings
                  }
                  onChange={() =>
                    handleCheckboxChange(
                      "settings",
                      "generalSettings",
                      "editGeneralSettings"
                    )
                  }
                />
                Edit General Settings
              </label>
              <label className="flex items-center gap-2 text-sm text-textBlack">
                <CheckBox
                  checked={
                    permissions.settings.generalSettings
                      .changePlatformPreferences
                  }
                  onChange={() =>
                    handleCheckboxChange(
                      "settings",
                      "generalSettings",
                      "changePlatformPreferences"
                    )
                  }
                />
                Change Platform Preferences
              </label>
            </div>
          </div>

          {/* Security */}
          <div className="col-span-2 md:col-span-1">
            <h3 className="font-medium text-sm sm:text-base   text-textBlack mb-2">
              Security
            </h3>
            <div className="space-y-2 pl-4">
              <label className="flex items-center gap-2 text-sm text-textBlack">
                <CheckBox
                  checked={permissions.settings.security.manageSecuritySettings}
                  onChange={() =>
                    handleCheckboxChange(
                      "settings",
                      "security",
                      "manageSecuritySettings"
                    )
                  }
                />
                Manage Security Settings
              </label>
              <label className="flex items-center gap-2 text-sm text-textBlack">
                <CheckBox
                  checked={permissions.settings.security.viewSecurityLogs}
                  onChange={() =>
                    handleCheckboxChange(
                      "settings",
                      "security",
                      "viewSecurityLogs"
                    )
                  }
                />
                View Security Logs
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Debugging: Show Permissions JSON
      <div className="bg-gray-100 p-4 rounded-2xl">
        <h2 className="text-sm sm:text-base font-semibold mb-4">Permissions JSON</h2>
        <pre>{JSON.stringify(permissions, null, 2)}</pre>
      </div> */}
    </div>
  );
};

export default PermissionsTab;
