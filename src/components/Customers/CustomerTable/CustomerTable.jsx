import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Checkbox } from "primereact/checkbox";
import useIsMobile from "@/hooks/useIsMobile";
import DateTime from "@/components/Elements/DateTime/DateTime";
import Action from "@/components/Elements/Action/Action";
import TeamStatusTemplate from "@/components/Companies/TeamTab/TeamStatusTemplate";
import TableTopCard from "@/components/Elements/DataTable/topCard";
import { paginatorTemplate } from "@/components/Elements/PaginationTemplate/PaginationTemplate";

const CustomerTable = ({ companyCustomers, handleOption }) => {
  const [isModalOpen, setModalOpen] = useState(null); // Track which row modal is open for
  const [checkedRows, setCheckedRows] = useState([]); // Track selected rows (checkbox)
  const isMobile = useIsMobile();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSortChange = (sort) => {
    //SORT Logic
  };

  const handleFilterChange = (filter) => {
    //Filter Logic
  };

  const data = React.useMemo(() => companyCustomers, [companyCustomers]);

  const closeModal = () => setModalOpen(null);

  const customerIdTemplate = (rowData) => {
    return (
      <div className="flex items-start gap-1">
        <Checkbox className="custom-checkbox" checked={false} />
        <p className="text-xs font-medium leading-4 text-textBlack text-left">#{rowData?.id}</p>
      </div>
    );
  };

  const customerNameTemplate = (rowData) => {
    return (
      <div className="flex gap-2 align-items-center">
        <div className="flex flex-row">
          <p className="text-blue-600 cursor-pointer">{rowData?.first_name}</p>
        </div>
      </div>
    );
  };

  const customerEmailTemplate = (rowData) => {
    return <p>{rowData?.email}</p>;
  };

  const customerPhoneNumberTemplate = (rowData) => {
    return <p>{rowData?.phone}</p>;
  };

  const customerCountryTemplate = (rowData) => {
    return <p>{rowData?.country}</p>;
  };

  const customerDateJoinedTemplate = (rowData) => {
    return (
      <div className="flex gap-2 align-items-center">
        <div className="flex flex-row">
          <DateTime date={rowData?.created_at}></DateTime>
        </div>
      </div>
    );
  };

  const customerTypeTemplate = (rowData) => {
    return <p>{rowData?.role}</p>;
  };

  const customerLastActivityTemplate = (rowData) => {
    return (
      <div className="flex gap-2 align-items-center">
        <DateTime date={rowData?.updated_at}></DateTime>
      </div>
    );
  };

  const customerStatusTemplate = (rowData) => {
    return <TeamStatusTemplate status={rowData?.status} />;
  };

  const customerActionTemplate = (rowData) => {
    return (
      <Action>
        <ul className="py-1">
          {!rowData?.status && (
            <li
              onClick={() => handleOption("Approve", rowData?.id)}
              className="px-4 py-2 text-green-600 cursor-pointer hover:bg-gray-50"
            >
              Approve
            </li>
          )}
          <li
            onClick={() => handleOption("View Details", rowData?.user_id)}
            className="px-4 py-2 cursor-pointer text-textBlack hover:bg-gray-50"
          >
            View Details
          </li>
          <li
            onClick={() => handleOption("Request More Info")}
            className="px-4 py-2 cursor-pointer text-textBlack hover:bg-gray-50"
          >
            Request More Info
          </li>
          {rowData?.status && (
            <li
              onClick={() => handleOption("Suspend", rowData?.id)}
              className="px-4 py-2 text-red-600 cursor-pointer hover:bg-gray-50"
            >
              Suspend
            </li>
          )}
        </ul>
      </Action>
    );
  };

  const toggleModal = (id) => {
    setModalOpen(isModalOpen === id ? null : id);
  };

  const handleCheckboxChange = (id) => {
    if (checkedRows.includes(id)) {
      setCheckedRows(checkedRows.filter((rowId) => rowId !== id));
    } else {
      setCheckedRows([...checkedRows, id]);
    }
  };

  return (
    <div className="pt-3 overflow-x-auto bg-white border rounded-2xl border-primary50">
      <TableTopCard
        title={"Customers"}
        handleClick={() => addFeeScheme()}
        isStatementVisible={false}
        isAddBtnVisible={false}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        handleSortChange={handleSortChange}
        handleFilterChange={handleFilterChange}
      />
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
              <p className="text-xs font-medium leading-4 text-textBlack text-left">ID</p>
            </div>
          }
          body={customerIdTemplate}
          sortable
        ></Column>
        <Column
          header={
            <p className="text-xs font-medium leading-4 text-textBlack text-left">Customer Name</p>
          }
          body={customerNameTemplate}
          className="text-xs font-medium text-textLight"
          sortable
        ></Column>
        <Column
          header={
            <p className="text-xs font-medium leading-4 text-textBlack text-left">Email Address</p>
          }
          body={customerEmailTemplate}
          className="text-xs font-medium text-textLight"
          hidden={isMobile}
          sortable
        ></Column>
        <Column
          header={
            <p className="text-xs font-medium leading-4 text-textBlack text-left">Phone Number</p>
          }
          body={customerPhoneNumberTemplate}
          className="text-xs font-medium text-textLight"
          hidden={isMobile}
          sortable
        ></Column>
        <Column
          header={<p className="text-xs font-medium leading-4 text-textBlack text-left">Country</p>}
          body={customerCountryTemplate}
          className="text-xs font-medium text-textLight"
          hidden={isMobile}
          sortable
        ></Column>
        <Column
          header={
            <p className="text-xs font-medium leading-4 text-textBlack text-left">Date Joined</p>
          }
          body={customerDateJoinedTemplate}
          className="text-xs font-medium text-textLight"
          hidden={isMobile}
          sortable
        ></Column>
        <Column
          header={<p className="text-xs font-medium leading-4 text-textBlack text-left">Type</p>}
          body={customerTypeTemplate}
          className="text-xs font-medium text-textLight"
          hidden={isMobile}
          sortable
        ></Column>
        <Column
          header={
            <p className="text-xs font-medium leading-4 text-textBlack text-left">Last Activity</p>
          }
          body={customerLastActivityTemplate}
          className="text-xs font-medium text-textLight"
          hidden={isMobile}
          sortable
        ></Column>
        <Column
          header={<p className="text-xs font-medium leading-4 text-textBlack text-left">Status</p>}
          body={customerStatusTemplate}
          className="text-xs font-medium leading-4 text-textBlack text-left"
          hidden={isMobile}
          sortable
        ></Column>
        <Column
          header={<p className="text-xs font-medium leading-4 text-textBlack text-left">Action</p>}
          body={customerActionTemplate}
          hidden={isMobile}
          sortable
        ></Column>
      </DataTable>
    </div>
  );
};

export default CustomerTable;
