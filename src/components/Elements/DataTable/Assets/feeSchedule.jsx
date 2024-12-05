import React, { useState } from "react";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import {
  FeeTemplate,
  RulesTemplate,
  AssetIdTemplate,
  NetworkActionTemplate,
  ActivityNameTemplate
} from "@/components/Elements/DataTable/templates";
import useIsMobile from "@/hooks/useIsMobile";
import { Checkbox } from "primereact/checkbox";
import TableTopCard from "@/components/Elements/DataTable/topCard";

const AssetsFeeScheduleDataTableComponent = ({
  data,
  title,
  btnText,
  isSortable,
  handleClick,
  filteredData,
  handleSearch,
  openEditModal,
  openDeleteModal,
  setSingleScheme,
  handleSortChange,
  handleFilterChange,
  isSortVisible = true,
  isAddBtnVisible = true,
  isFilterVisible = true,
  isSearchVisible = true,
  isStatementVisible = true,
  isFilterValueVisible = false
}) => {
  const isMobile = useIsMobile();
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="bg-white rounded-2xl border border-primary50 overflow-x-auto pt-3">
      <TableTopCard
        title={title}
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
          paginatorClassName="justify-end"
          stateKey="dt-state-demo-local"
          paginatorTemplate="CurrentPageReport PrevPageLink PageLinks NextPageLink"
          currentPageReportTemplate={`Showing {first} to {last} of {totalRecords} ${title?.toLowerCase()}`}
          // selection={selectedCustomer}
          // onSelectionChange={(e) => setSelectedCustomer(e.value)}
          // onClick={handleClick}
        >
          <Column
            header={
              <div className="flex items-start gap-1">
                <Checkbox className="custom-checkbox" checked={false} />
                <p className="text-xs font-medium text-textBlack">ID</p>
              </div>
            }
            body={AssetIdTemplate}
            sortable={!!isSortable}
            sortField="representative.name"
            className="text-xs font-medium text-textBlack"
          />
          <Column
            sortable={!!isSortable}
            body={ActivityNameTemplate}
            className="text-xs font-medium text-textLight"
            header={
              <p className="text-xs font-medium text-textBlack">
                Activity Name
              </p>
            }
          />
          <Column
            hidden={isMobile}
            body={RulesTemplate}
            sortable={!!isSortable}
            className="text-xs font-medium text-textLight"
            header={<p className="text-xs font-medium text-textBlack">Rules</p>}
          />
          <Column
            hidden={isMobile}
            body={FeeTemplate}
            sortable={!!isSortable}
            className="text-xs font-medium text-textLight"
            header={
              <p className="text-xs font-medium text-textBlack">Service Fee</p>
            }
          />
          <Column
            sortable={!!isSortable}
            className="text-xs font-medium text-textBlack"
            header={
              <p className="text-xs font-medium text-textBlack">Action</p>
            }
            body={(rowData) =>
              NetworkActionTemplate(
                rowData,
                setSingleScheme,
                openEditModal,
                openDeleteModal
              )
            }
          />
        </DataTable>
      ) : (
        <p className="flex items-center w-full p-4">
          No {title?.toLowerCase()} available to show
        </p>
      )}
    </div>
  );
};

export default AssetsFeeScheduleDataTableComponent;
