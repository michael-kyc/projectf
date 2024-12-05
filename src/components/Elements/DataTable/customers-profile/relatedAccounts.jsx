import React, { useState } from 'react'
import { Column } from "primereact/column"
import { DataTable } from "primereact/datatable"
import useIsMobile from "@/hooks/useIsMobile"
import { Checkbox } from "primereact/checkbox"
import TableTopCard from "@/components/Elements/DataTable/topCard"
import { AssetActionTemplate, AssetIdTemplate } from "@/components/Elements/DataTable/templates"

const RelatedAccountsTableComponent = ({
  data,
  title,
  btnText,
  isSortable,
  handleClick,
  filteredData,
  handleSearch,
  handleRowClick,
  handleSortChange,
  handleFilterChange,
  isSortVisible = true,
  isAddBtnVisible = true,
  isFilterVisible = true,
  isSearchVisible = true,
  isStatementVisible = true,
  isFilterValueVisible = false
}) => {
  const isMobile = useIsMobile()
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <div className="pt-3 overflow-x-auto bg-white border rounded-2xl border-primary50">
      <TableTopCard
        title={"Customers"}
        btnText={btnText}
        searchTerm={searchTerm}
        handleClick={handleClick}
        handleSearch={handleSearch}
        isSortVisible={isSortVisible}
        setSearchTerm={setSearchTerm}
        isAddBtnVisible={isAddBtnVisible}
        isFilterVisible={isFilterVisible}
        isSearchVisible={isSearchVisible}
        handleSortChange={handleSortChange}
        isStatementVisible={isStatementVisible}
        handleFilterChange={handleFilterChange}
        isFilterValueVisible={isFilterValueVisible}
      />

      {data ? (
        <DataTable
          paginator
          rows={20}
          dataKey="id"
          value={searchTerm?.length ? filteredData : data}
          selectionMode="single"
          stateStorage="session"
          stateKey="dt-state-demo-local"
          paginatorTemplate="CurrentPageReport PrevPageLink PageLinks NextPageLink"
          currentPageReportTemplate={`Showing {first} to {last} of {totalRecords} ${title?.toLowerCase()}`}
          onClick={handleRowClick}
          // selection={selectedCustomer}
          // onSelectionChange={(e) => setSelectedCustomer(e.value)}
        >
          <Column
            header={
              <div className="flex items-start gap-1">
                <Checkbox className="custom-checkbox" checked={false} />
                <p className="font-medium text-xs leading-[16px] text-left text-textBlack">ID</p>
              </div>
            }
            body={AssetIdTemplate}
            sortable={!!isSortable}
            sortField="representative.name"
            className="text-xs font-medium text-textBlack"
          />
          <Column
            header={<p className="font-medium text-xs leading-[16px] text-left text-textBlack">Customer Name</p>}
            body={row => row?.customerName}
            sortable={!!isSortable}
            sortField="representative.name"
            className="font-medium text-xs leading-[16px] text-left text-blue500"
          />
          <Column
            sortable={!!isSortable}
            body={row => row?.emailAddress}
            className="font-medium text-xs leading-[16px] text-left text-blue500"
            header={<p className="font-medium text-xs leading-[16px] text-left text-textBlack">Email Address</p>}
          />
          <Column
            hidden={isMobile}
            sortable={!!isSortable}
            body={row => row?.country}
            className="font-medium text-xs leading-[16px] text-left text-textLight"
            header={<p className="font-medium text-xs leading-[16px] text-left text-textBlack">Country</p>}
          />
          <Column
            hidden={isMobile}
            sortable={!!isSortable}
            body={row => row.date}
            className="font-medium text-xs leading-[16px] text-left text-textLight"
            header={<p className="font-medium text-xs leading-[16px] text-left text-textBlack">Date</p>}
          />
          <Column
            hidden={isMobile}
            sortable={!!isSortable}
            body={row => row.lastActivity}
            className="font-medium text-xs leading-[16px] text-left text-textLight"
            header={<p className="font-medium text-xs leading-[16px] text-left text-textBlack">Last Activity</p>}
          />
          <Column
            hidden={isMobile}
            sortable={!!isSortable}
            body={row => (
              <div
                className={`px-2 py-1 rounded-full w-24 text-center text-xs ${
                  row?.status === "Active"
                    ? "bg-green-100 text-green-600"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {row?.status}
              </div>
            )}
            className="text-xs font-medium text-textLight"
            header={<p className="font-medium text-xs leading-[16px] text-left text-textBlack">Status</p>}
          />
          <Column
            hidden={isMobile}
            sortable={!!isSortable}
            body={AssetActionTemplate}
            className="text-xs font-medium text-textLight"
            header={<p className="font-medium text-xs leading-[16px] text-left text-textBlack">Action</p>}
          />
        </DataTable>
      ) : (
        <p className="flex items-center w-full p-4">
          No {title?.toLowerCase()} available to show
        </p>
      )}
    </div>
  )
}

export default RelatedAccountsTableComponent
