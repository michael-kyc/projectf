"use client";
import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import { z } from "zod"; // Make sure to install zod in your project

import EditAddMemberInformation from "@/components/Team/EditAddMemberInformation/EditAddMemberInformation";
import AccountActionsTab from "@/components/CustomerProfile/AccountActionsTab";
import UserCardsInfo from "../UserInfo/UserInfo";
import PermissionsTab from "../PermissionsTab/PermissionsTab";
import AllAccounts from "@/components/Home/AllAccounts/AllAccounts";
import AllCards from "@/components/Home/AllCards/AllCards";
import ActivityLogsTab from "@/components/CustomerProfile/ActivityLogsTab";
import useApi from "@/hooks/useApi";
import { useRouter } from "next/navigation";

const EditAddMember = forwardRef(({ isEdit, userData, company_id }, ref) => {
  const { fetchData, loading, error } = useApi();
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState("User Information");
  const [formValidation, setFormValidation] = useState({});
  const [formData, setFormData] = useState({
    fullName: "",
    dateRegistered: "",
    dateOfBirth: "",
    gender: "",
    email: "",
    phoneNumber: "",
    streetAddress: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    image: "",
    role: "",
  });
  const [permissions, setPermissions] = useState({
    accountManagement: {
      userAccess: {
        viewUsers: false,
        editUsers: false,
        deleteUsers: false,
        blockUsers: false,
      },
      roleManagement: {
        createRoles: false,
        assignRoles: false,
        editRoles: false,
        other: false,
      },
    },
    financialManagement: {
      transactions: {
        viewTransactions: false,
        approveTransactions: false,
        exportTransactions: true,
      },
      reports: {
        generateReports: false,
        viewReports: false,
        downloadReports: false,
      },
    },
    settings: {
      generalSettings: {
        editGeneralSettings: false,
        changePlatformPreferences: false,
      },
      security: {
        manageSecuritySettings: false,
        viewSecurityLogs: false,
      },
    },
  });


  // Define the validation schema
  const memberSchema = z.object({
    fullName: z.string().min(1, "Full name is required"),
    dateRegistered: z.string().min(1, "Date registered is required"),
    dateOfBirth: z.string().min(1, "Date of birth is required"),
    email: z.string().email("Invalid email address"),
    phoneNumber: z.string().min(1, "Phone number is required"),
    streetAddress: z.string().min(1, "Street address is required"),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    zipCode: z.string().min(1, "ZIP code is required"),
    country: z.string().min(1, "Country is required"),
  });

// Validation function
  const handleMemberFormValidation = (formData, schema) => {
    const request = {
      fullName: formData.fullName,
      dateRegistered: formData.dateRegistered,
      dateOfBirth: formData.dateOfBirth,
      gender: formData.gender,
      email: formData.email,
      phoneNumber: formData.phoneNumber,
      streetAddress: formData.streetAddress,
      city: formData.city,
      state: formData.state,
      zipCode: formData.zipCode,
      country: formData.country,
    };

    return schema.safeParse(request);
  };

  useEffect(() => {
    if (isEdit && userData) {
      setFormData({
        fullName: `${userData?.first_name} ${userData?.last_name}` ?? "",
        dateRegistered: userData?.userProfile?.dateRegistered ?? "",
        dateOfBirth: userData?.userProfile?.dateOfBirth ?? "",
        gender: userData?.userProfile?.gender ?? "",
        email: userData?.email ?? "",
        phoneNumber: userData?.userProfile?.phoneNumber ?? "",
        streetAddress: userData?.userProfile?.streetAddress ?? "",
        city: userData?.userProfile?.city ?? "",
        state: userData?.userProfile?.state ?? "",
        zipCode: userData?.userProfile?.zipCode ?? "",
        country: userData?.userProfile?.country ?? "",
        image: userData?.userProfile?.image ?? "",
        role: userData?.role ?? "user",
      });
    }

    // Populate permissions
    if (userData?.permission) {
      setPermissions({
        accountManagement: {
          userAccess: {
            viewUsers: userData.permission.viewUsers ?? false,
            editUsers: userData.permission.editUsers ?? false,
            deleteUsers: userData.permission.deleteUsers ?? false,
            blockUsers: userData.permission.blockUsers ?? false,
          },
          roleManagement: {
            createRoles: userData.permission.createRoles ?? false,
            assignRoles: userData.permission.assignRoles ?? false,
            editRoles: userData.permission.editRoles ?? false,
            other: userData.permission.roleManagement ?? false,
          },
        },
        financialManagement: {
          transactions: {
            viewTransactions: userData.permission.viewTransactions ?? false,
            approveTransactions:
              userData.permission.approveTransactions ?? false,
            exportTransactions: userData.permission.exportTransactions ?? false,
          },
          reports: {
            generateReports: userData.permission.reports ?? false,
            viewReports: userData.permission.viewReports ?? false,
            downloadReports: userData.permission.exportReports ?? false,
          },
        },
        settings: {
          generalSettings: {
            editGeneralSettings:
              userData.permission.editGeneralSettings ?? false,
            changePlatformPreferences:
              userData.permission.changePlatformPreferences ?? false,
          },
          security: {
            manageSecuritySettings:
              userData.permission.manageSecuritySettings ?? false,
            viewSecurityLogs: userData.permission.viewSecurityLogs ?? false,
          },
        },
      });
    }
  }, [isEdit, userData]);

  const submitFormData = async () => {

    const validationResult = handleMemberFormValidation(formData, memberSchema);
    setFormValidation(validationResult);
    if (validationResult.success){
      const requestBody = {
        user: {
          first_name: formData.fullName.split(" ")[0],
          last_name: formData.fullName.split(" ").slice(1).join(" "),
          email: formData.email,
          role: formData.role,
          company_id: company_id,
          ...(!isEdit && { password: '12345678' }),
        },
        profile: {
          image: formData.image,
          dateRegistered: formData.dateRegistered,
          dateOfBirth: formData.dateOfBirth,
          gender: formData.gender,
          phoneNumber: formData.phoneNumber,
          streetAddress: formData.streetAddress,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
          country: formData.country,
        },
        permissions: permissions,
      };

      const permissionRequestBody = {
        userAccess: true,
        userAccessDetails: {
          viewUsers: permissions.accountManagement.userAccess.viewUsers,
          editUsers: permissions.accountManagement.userAccess.editUsers,
          deleteUsers: permissions.accountManagement.userAccess.deleteUsers,
          blockUsers: permissions.accountManagement.userAccess.blockUsers,
        },
        roleManagement: true,
        roleManagementDetails: {
          createRoles: permissions.accountManagement.roleManagement.createRoles,
          assignRoles: permissions.accountManagement.roleManagement.assignRoles,
          editRoles: permissions.accountManagement.roleManagement.editRoles,
        },
        transactions: true,
        transactionsDetails: {
          viewTransactions:
          permissions.financialManagement.transactions.viewTransactions,
          approveTransactions:
          permissions.financialManagement.transactions.approveTransactions,
          exportTransactions:
          permissions.financialManagement.transactions.exportTransactions,
        },
        reports: true,
        reportsDetails: {
          viewTransactions:
          permissions.financialManagement.reports.generateReports,
          approveTransactions:
          permissions.financialManagement.reports.viewReports,
          exportTransactions:
          permissions.financialManagement.reports.downloadReports,
        },
        generalSettings: false,
        generalSettingsDetails: {
          editGeneralSettings:
          permissions.settings.generalSettings.editGeneralSettings,
          changePlatformPreferences:
          permissions.settings.generalSettings.changePlatformPreferences,
          exportTransactions: false,
        },
        security: true,
        securityDetails: {
          manageSecuritySettings:
          permissions.settings.security.manageSecuritySettings,
          viewSecurityLogs: permissions.settings.security.viewSecurityLogs,
        },
      };

      let promiseEditUserData, promiseUpdateUserPermission;

      if (isEdit) {
        promiseEditUserData = fetchData(
            `/company-teams/update-user/${userData.id}`,
            {
              method: "PATCH",
              body: requestBody,
            }
        );
        promiseUpdateUserPermission = fetchData(
            `/company-teams/permission/${userData?.user_id}`,
            {
              method: "PUT",
              body: permissionRequestBody,
            }
        );
      } else {
        const {result, error} = await fetchData(
            '/company-teams/create-user-with-profile',
            {
              method: "POST",
              body: requestBody,
            }
        );
        // Assuming we need to set permissions for a new user as well
        promiseUpdateUserPermission = fetchData(
            `/company-teams/permission/${result?.user?.user_id}`,
            {
              method: "POST",
              body: permissionRequestBody,
            }
        );
      }

      try {
        const [userData, permissionData] = await Promise.all([promiseEditUserData, promiseUpdateUserPermission]);
        router.push(`/dashboard/company/${company_id}?tab=3`);
      } catch (error) {
        console.error("Error while processing user data:", error);
      }
    }
  };

  useImperativeHandle(ref, () => ({
    submitFormData,
  }));

  const renderContent = () => {
    switch (selectedTab) {
      case "User Information":
        return (
          <UserInformation
            userData={userData}
            isEdit={isEdit}
            formData={formData}
            setFormData={setFormData}
            formValidation={formValidation}
          />
        );
      case "Permissions":
        return (
          <EditPermissions
            formData={formData}
            setFormData={setFormData}
            userData={userData}
            permissions={permissions}
            setPermissions={setPermissions}
            isEdit={isEdit}
          />
        );
      case "Wallets & Cards":
        return <EditWalletsAndCards userData={userData} />;
      case "Activity Log":
        return <EditActivityLog userData={userData} />;
      case "Account Actions":
        return <EditAccountActions userData={userData} />;
      default:
        return null;
    }
  };

  const tabs = isEdit
    ? [
        "User Information",
        "Permissions",
        "Wallets & Cards",
        "Activity Log",
        "Account Actions",
      ]
    : ["User Information", "Permissions"];

  return (
    <div className="w-full">
      <div className="flex flex-wrap justify-between bg-white rounded-lg md:flex-nowrap mt-1">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`py-2 text-xs m-1 focus:outline-none w-full h-10 ${
              isEdit ? "w-1/5" : "w-1/2"
            } focus:outline-none ${
              selectedTab === tab
                ? "border border-primary50 rounded-lg bg-grey50"
                : "text-textLight hover:text-primary"
            }`}
            onClick={() => setSelectedTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="mt-2">{renderContent()}</div>
    </div>
  );
});
EditAddMember.displayName = "EditAddMember";

const UserInformation = ({ userData, isEdit, formData, setFormData, formValidation }) => (
  <div className="grid grid-cols-12 gap-6">
    <div className="col-span-12 md:col-span-8">
      <EditAddMemberInformation
        isEdit={isEdit}
        formData={formData}
        setFormData={setFormData}
        validation={formValidation}
      />
    </div>

    <div className="col-span-12 md:col-span-4">
      <UserCardsInfo isEdit={isEdit}
                     userData={userData}
        formData={formData}
        setFormData={setFormData}
      />
    </div>
  </div>
);

const EditPermissions = ({
  userData,
  setPermissions,
  permissions,
  setFormData,
  formData, isEdit
}) => (
  <div className="grid grid-cols-12 gap-4">
    <div className="col-span-12 md:col-span-8">
      <PermissionsTab
        userData={userData}
        permissions={permissions}
        setPermissions={setPermissions}
      />
    </div>

    <div className="col-span-12 md:col-span-4">
      <UserCardsInfo isEdit={isEdit}
        userData={userData}
        formData={formData}
        setFormData={setFormData}
      />
    </div>
  </div>
);

const EditWalletsAndCards = ({ userData }) => (
  <div>
    <div className="flex flex-col space-y-6">
      <AllAccounts userData={userData} />
      <AllCards userData={userData} />
    </div>
  </div>
);

const EditActivityLog = ({ userData }) => (
  <div>
    <ActivityLogsTab activityLogs={userData?.activityLogs} />
  </div>
);

const EditAccountActions = ({ userData }) => (
  <div>
    <AccountActionsTab userData={userData} />
  </div>
);

export default EditAddMember;
