import React, { useState, useEffect } from "react";
import "primereact/resources/primereact.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "../List/List.css";
import Action from "@/components/Elements/Action/Action";
import TeamStatusTemplate from "@/components/Companies/TeamTab/TeamStatusTemplate";
import { useRouter } from "next/navigation";
import useApi from "@/hooks/useApi";
import ConfirmationModal from "@/components/Elements/ConfirmationModal";
import useIsMobile from "@/hooks/useIsMobile";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Checkbox } from "primereact/checkbox";
import DateTime from "@/components/Elements/DateTime/DateTime";
import TableTopCard from "@/components/Elements/DataTable/topCard";
import { paginatorTemplate } from "@/components/Elements/PaginationTemplate/PaginationTemplate";

export default function TeamTable({
  companyTeam,
  company_id,
  fetchCompanyTeam,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState(companyTeam);
  const { fetchData } = useApi();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({});
  const [filteredData, setFilteredData] = useState(companyTeam);
  const isMobile = useIsMobile();

  const router = useRouter();

  const handleSearch = (searchTerm) => {
    const filtered = companyTeam.filter((company) =>
      company?.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
  };

  useEffect(() => {
    setData(companyTeam);
  }, [companyTeam]);

  async function handleUserStatus(user) {
    const { result, error } = await fetchData(`/users/${user.user_id}`, {
      method: "PUT",
      body: {
        status: user.status,
      },
    });
    if (error) {
      setIsModalOpen(false);
    } else {
      await fetchCompanyTeam();
      setIsModalOpen(false);
    }
  }

  const handleOption = async (option, data) => {
    let content = {};
    switch (option) {
      case "Add Member":
        router.push(`/dashboard/team?companyId=${company_id}&option=Add`);
        break;
      case "Edit Details":
        router.push(
          `/dashboard/team?userId=${data}&companyId=${company_id}&option=Edit`
        );
        break;
      case "View Details":
        router.push(
          `/dashboard/team?userId=${data}&companyId=${company_id}&option=View`
        );
        break;
      case "status":
        content = {
          title: ` ${data.status ? "Activate" : "Suspend"}`,
          description: `Are you sure you want to ${
            data.status ? "Confirm activate" : "Confirm Suspension"
          } this user?`,
          confirmText: data.status ? "Activate" : "suspend",
          confirmColor: data.status ? "bg-primary" : "bg-alert500",
          onConfirm: () => handleUserStatus(data),
        };
        setModalContent(content);
        setIsModalOpen(true);
        break;
      default:
        console.log("Unknown action:", option);
        return;
    }
  };

  const handleSortChange = (sort) => {
    //SORT Logic
  };

  const handleFilterChange = (filter) => {
    //Filter Logic
  };

  const teamIdTemplate = (rowData) => {
    return (
      <div className="flex items-start gap-1">
        <Checkbox className="custom-checkbox" checked={false} />
        <p className="text-xs font-medium text-textBlack">#{rowData?.id}</p>
      </div>
    );
  };

  const userNameTemplate = (rowData) => {
    return (
      <div className="flex gap-2 align-items-center">
        <div className="flex flex-row items-center justify-center">
          <span className="w-3 h-3 mr-2 bg-green-500 rounded-full"></span>
          <p>{rowData?.first_name + " " + rowData?.last_name}</p>
        </div>
      </div>
    );
  };

  const userEmailTemplate = (rowData) => {
    return <p>{rowData?.email}</p>;
  };

  const userRoleTemplate = (rowData) => {
    return <p>{rowData?.role}</p>;
  };

  const lastLoginTemplate = (rowData) => {
    return (
      <div className="flex gap-2 align-items-center">
        <DateTime date={rowData?.updated_at}></DateTime>
      </div>
    );
  };

  const userStatusTemplate = (rowData) => {
    return <TeamStatusTemplate status={rowData?.status} />;
  };

  const userActionTemplate = (rowData) => {
    return (
      <Action>
        <li
          onClick={() => handleOption("View Details", rowData?.user_id)}
          className="px-4 py-2 cursor-pointer text-textBlack hover:bg-gray-50"
        >
          View Details
        </li>
        <li
          onClick={() => handleOption("Edit Details", rowData?.user_id)}
          className="px-4 py-2 cursor-pointer text-textBlack hover:bg-gray-50"
        >
          Edit Details
        </li>
        <li
          className={`font-medium px-4 py-1 rounded-full cursor-pointer ${
            !rowData?.status ? "text-green500" : "text-red-500"
          }`}
          onClick={() =>
            handleOption("status", {
              status: !rowData?.status,
              user_id: rowData?.id,
            })
          }
        >
          {rowData?.status ? "Suspend" : "Active"}
        </li>
      </Action>
    );
  };

  return (
    <>
      <div  className="pt-3 overflow-x-auto bg-white border rounded-2xl border-primary50">
        <TableTopCard
          title={"Team"}
          btnText={"Add new member"}
          handleClick={() => handleOption("Add Member", "")}
          isStatementVisible={false}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          handleSortChange={handleSortChange}
          handleFilterChange={handleFilterChange}
        />
        {data ? (
          <>
            <DataTable
              value={data}
              paginator
              paginatorTemplate="CurrentPageReport PrevPageLink PageLinks NextPageLink"
              currentPageReportTemplate="Showing {first} to {last} of {totalRecords} companies"
              rows={40}
              // selection={selectedCustomer}
              // onSelectionChange={(e) => setSelectedCustomer(e.value)}
              selectionMode="single"
              dataKey="id"
              stateStorage="session"
              stateKey="dt-state-demo-local"
            >
              <Column
                header={
                  <div className="flex items-start gap-1">
                    <Checkbox className="custom-checkbox" checked={false} />
                    <p className="text-xs font-medium text-textBlack">ID</p>
                  </div>
                }
                body={teamIdTemplate}
                sortable
                sortField="representative.name"
              ></Column>
              <Column
                header={
                  <p className="text-xs font-medium text-textBlack">
                    User Name
                  </p>
                }
                body={userNameTemplate}
                className="text-xs font-medium text-textLight"
                sortable
              ></Column>
              <Column
                header={
                  <p className="text-xs font-medium text-textBlack">
                    Email Address
                  </p>
                }
                body={userEmailTemplate}
                className="text-xs font-medium text-textLight"
                hidden={isMobile}
                sortable
              ></Column>
              <Column
                header={
                  <p className="text-xs font-medium text-textBlack">Role</p>
                }
                body={userRoleTemplate}
                className="text-xs font-medium text-textLight"
                hidden={isMobile}
                sortable
              ></Column>
              <Column
                header={
                  <p className="text-xs font-medium text-textBlack">Status</p>
                }
                body={userStatusTemplate}
                className="text-xs font-medium text-textBlack"
                hidden={isMobile}
                sortable
              ></Column>
              <Column
                header={
                  <p className="text-xs font-medium text-textBlack">
                    Last Login
                  </p>
                }
                body={lastLoginTemplate}
                className="text-xs font-medium text-textBlack"
                hidden={isMobile}
                sortable
              ></Column>
              <Column
                header={
                  <p className="text-xs font-medium text-textBlack">Action</p>
                }
                body={userActionTemplate}
                hidden={isMobile}
                sortable
              ></Column>
            </DataTable>
          </>
        ) : (
          <p className="flex items-center w-full p-4">
            No teams available to show
          </p>
        )}
      </div>

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={modalContent.title}
        description={modalContent.description}
        confirmText={modalContent.confirmText}
        confirmColor={modalContent.confirmColor}
        onConfirm={modalContent.onConfirm}
        showForm={modalContent.showForm}
      />
    </>
  );
}
