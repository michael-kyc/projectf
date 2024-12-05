import React, { useState, useEffect } from 'react';
import CheckBox from '@/components/Elements/Checkbox/CheckBox';
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import DateTime from '@/components/Elements/DateTime/DateTime';
import "primereact/resources/primereact.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "./List.css";
import Tag from '@/components/Elements/Tag/Tag';
import Action from '@/components/Elements/Action/Action';
import SortModal from "@/components/Elements/SortModal/SortModal";
import FilterModal from "@/components/Elements/FilterModal/FilterModal";
import Search from '@/Icons/Search';
import Statement from '@/Icons/Statement';

export default function List({ companies }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState("");

  const sortBy = [
    {
      label: "Balance",
      value: "balace",
      type: "date",
    },
    {
      label: "Account Name",
      value: "accountname",
      type: "text",
    },
  ];

  const filterSample = [
    {
      label: "Amount",
      icon: "Icon",
      value: "amount",
      type: "string",
      options: [
        {
          label: "10 K",
          icon: "Icon",
          value: "10",
        },
      ],
    },
    {
      label: "Amount",
      icon: "Icon",
      value: "amountc",
      type: "string",
      options: [
        {
          label: "10 K",
          icon: "Icon",
          value: "10",
        },
      ],
    },
    {
      label: "Amount",
      icon: "Icon",
      value: "amountd",
      type: "date",
    },
    {
      label: "Amount",
      icon: "Icon",
      value: "amountr",
      type: "category",
      category: [
        {
          value: "Fiatd",
          label: "Fiat",
          options: [
            {
              label: "10 K",
              value: "10",
            },
          ],
        },
        {
          value: "Fiatre",
          label: "Fiat",
          icon: "Icon",
          options: [
            {
              label: "10 K",
              icon: "Icon",
              value: "10",
            },
          ],
        },
      ],
    },
  ];

  useEffect(() => {
    setData(companies);
  }, [companies]);

  const handleOption = (option) => { };

  const companyIdTemplate = (rowData) => {
    return (
      <div className="flex align-items-center gap-2">
        <div className="flex flex-row">
          <CheckBox></CheckBox>
          <p>{rowData?.id}</p>
        </div>
      </div>
    );
  };

  const companyNameTemplate = (rowData) => {
    return (
      <div className="flex align-items-center gap-2">
        <div className="flex flex-row">
          <p className="text-blue-600 cursor-pointer">{rowData?.name}</p>
        </div>
      </div>
    );
  };

  const companyDateJoinedTemplate = (rowData) => {
    return (
      <div className="flex align-items-center gap-2">
        <div className="flex flex-row">
          <DateTime date={rowData?.created_at}></DateTime>
        </div>
      </div>
    );
  };

  const companyLastActivityTemplate = (rowData) => {
    return (
      <div className="flex align-items-center gap-2">
        <div className="flex flex-row">
          <DateTime date={rowData?.updated_at}></DateTime>
        </div>
      </div>
    );
  };

  const companyStatusTemplate = (rowData) => {
    const status = rowData.status
      ? rowData.active
        ? "success"
        : "danger"
      : "warning";
    return (
      <Tag
        status={status}
        text={
          status == "success"
            ? "Active"
            : status == "danger"
              ? "Suspended"
              : "Pending"
        }
      ></Tag>
    );
  };

  const companyActionTemplate = (rowData) => {
    const status = rowData.status
      ? rowData.active
        ? "success"
        : "danger"
      : "warning";
    return (
      <Action>
        {status == "warning" && (
          <li
            onClick={() => handleOption("Approve")}
            className="px-4 py-2 text-green-600 cursor-pointer hover:bg-gray-50"
          >
            Approve
          </li>
        )}
        <li
          onClick={() => handleOption("View Details")}
          className="px-4 text-textBlack py-2 cursor-pointer hover:bg-gray-50"
        >
          View Details
        </li>
        <li
          onClick={() => handleOption("Request More Info")}
          className="px-4  text-textBlack py-2 cursor-pointer hover:bg-gray-50"
        >
          Request More Info
        </li>
        {status == "warning" && (
          <li
            onClick={() => handleOption("Reject")}
            className="px-4 py-2 text-red-600 cursor-pointer hover:bg-gray-50"
          >
            Reject
          </li>
        )}
        {status == "success" && (
          <li
            onClick={() => handleOption("Suspend")}
            className="px-4 py-2 text-red-600 cursor-pointer hover:bg-gray-50"
          >
            Suspend
          </li>
        )}
        {status == "danger" && (
          <li
            onClick={() => handleOption("Activate")}
            className="px-4 py-2 text-green-600 cursor-pointer hover:bg-gray-50"
          >
            Activate
          </li>
        )}
      </Action>
    );
  };

  const handleSortChange = (sort) => {
    //SORT Logic
  };

  const handleFilterChange = (filter) => {
    //Filter Logic
  };


  return (
    <>
      <div className="bg-white border rounded-2xl  overflow-x-auto w-full">
        <div className="text-textBlack ml-4 mt-4 font-semibold text-lg">
          Transactions
        </div>
        {data ? (
          <>
            <div className="flex flex-row items-center h-20 px-4 justify-between">
              <div className="flex items-center border border-primary50 rounded-xl pr-3 p-2 w-72">
                <Search />
                <input
                  type="text"
                  placeholder="Search"
                  className="custom-placeholder ml-2 border-none outline-none w-72"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex space-x-4 items-center">
                <button
                  className="w-28 flex justify-center items-center p-2.5 border border-primary50 rounded-xl bg-white text-center text-sm font-normal"
                >
                  <div className="">
                    <Statement />
                  </div>
                  <span className="ml-2 text-sm">Statement</span>
                </button>
                <SortModal
                  sortBy={sortBy}
                  onChange={handleSortChange}
                ></SortModal>
                <FilterModal filters={filterSample} onChange={handleFilterChange}></FilterModal>
              </div>
            </div>

            <DataTable
              value={data}
              paginator
              paginatorTemplate="CurrentPageReport PrevPageLink PageLinks NextPageLink"
              currentPageReportTemplate="Showing {first} to {last} of {totalRecords} companies"
              rows={20}
              // selection={selectedCustomer}
              // onSelectionChange={(e) => setSelectedCustomer(e.value)}
              selectionMode="single"
              // onClick={handleClick}
              dataKey="id"
              stateStorage="session"
              stateKey="dt-state-demo-local"
            >
              <Column
                header={
                  <div className="flex flex-row">
                    <CheckBox></CheckBox>
                    <p>ID</p>
                  </div>
                }
                body={companyIdTemplate}
                sortable
                sortField="representative.name"
                style={{ width: "10%" }}
              ></Column>
              <Column
                header="Transaction Type"
                body={companyNameTemplate}
                sortable
                style={{ width: "20%" }}
              ></Column>
              <Column
                header="Currency"
                body={companyDateJoinedTemplate}
                sortable
                style={{ width: "20%" }}
              ></Column>
              <Column
                header="To/From"
                body={companyLastActivityTemplate}
                sortable
                style={{ width: "20%" }}
              ></Column>
              <Column
                header="Status"
                body={companyStatusTemplate}
                sortable
                style={{ width: "20%" }}
              ></Column>
              <Column
                header="Action"
                body={companyActionTemplate}
                sortable
                style={{ width: "5%" }}
              ></Column>
            </DataTable>
          </>
        ) : (
          <p className="flex items-center w-full p-4">
            No transactions available to show
          </p>
        )}
      </div>
    </>
  );
};
