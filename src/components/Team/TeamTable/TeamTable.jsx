"use client";
import React, { useState } from "react";
import { useTable } from "react-table";
import Search from "@/Icons/Search";
import VerticalThreeDots from "@/Icons/VerticalThreeDots";
import CheckBox from "../../Elements/Checkbox/CheckBox";
import ChevronRight from "@/Icons/ChevronRight";
import ChevronLeft from "@/Icons/ChevronLeft";

const TeamTable = ({onSelectOption ,addMember}) => {
    const [isChecked, setIsChecked] = useState(false);
    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    // State to handle dropdown visibility for each row
    const [dropdownOpen, setDropdownOpen] = useState(null);

    // Toggle function to open/close dropdown using row.original.id
    const toggleDropdown = (rowId) => {
        setDropdownOpen((prev) => (prev === rowId ? null : rowId));
    };

    const data = React.useMemo(
        () => [
            {
                id: "#302012",
                userName: "John Doe",
                emailAddress: "Johndoe@gmail.com",
                phoneNumber: "00971 3453 56743",
                role: "Admin",
                dateJoined: "Sep 23 -2023",
                lastLogin: "Sep 23 -2023",
                status: "Active",
            },
            {
                id: "#302013",
                userName: "John Doe",
                emailAddress: "Johndoe@gmail.com",
                phoneNumber: "00971 3453 56743",
                role: "Standard User",
                dateJoined: "Sep 23 -2023",
                lastLogin: "Sep 23 -2023",
                status: "Inactive",
            },
        ],
        []
    );

    const columns = React.useMemo(
        () => [
            {
                Header: "ID",
                accessor: "id",
                Cell: ({ value }) => <a href="#" className="text-primary font-semibold">{value}</a>,
            },
            {
                Header: "User Name",
                accessor: "userName",
                Cell: ({ value }) => <a href="#" className="text-blue-500">{value}</a>,
            },
            {
                Header: "Email Address",
                accessor: "emailAddress",
            },
            {
                Header: "Phone Number",
                accessor: "phoneNumber",
            },
            {
                Header: "Role",
                accessor: "role",
            },
            {
                Header: "Date Joined",
                accessor: "dateJoined",
            },
            {
                Header: "Last Login",
                accessor: "lastLogin",
            },
            {
                Header: "Status",
                accessor: "status",
                Cell: ({ value }) => (
                    <div
                        className={`px-2 py-1 rounded-full w-24 text-center text-xs ${value === "Active" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                            }`}
                    >
                        {value}
                    </div>
                ),
            },
            {
                Header: "Action",
                accessor: "action",
                Cell: ({ row }) => (
                    <div className="relative">
                        <button
                            className="text-primary hover:text-gray-600"
                            onClick={() => toggleDropdown(row.original.id)} // Use row.original.id
                        >
                            <VerticalThreeDots />
                        </button>

                        {/* Dropdown */}
                        {dropdownOpen === row.original.id && ( // Compare with row.original.id
                            <div className="absolute right-0 mt-2 w-36 bg-white shadow-lg rounded-2xl z-10 ">
                                <ul className="py-1">
                                    <li className="px-4 py-2 text-sm text-textBlack hover:bg-gray-100 cursor-pointer "       onClick={() => onSelectOption("View")}>
                                        View
                                    </li>
                                    <li className="px-4 py-2 text-sm text-textBlack hover:bg-gray-100 cursor-pointer"  onClick={() => onSelectOption("Edit")} >
                                        Edit
                                    </li>
                                    <li className="px-4 py-2 text-sm text-textBlack hover:bg-gray-100 cursor-pointer" onClick={() => onSelectOption("Pause")} >
                                        Pause
                                    </li>
                                    <li className="px-4 py-2 text-sm text-red-600 hover:bg-gray-100 cursor-pointer" onClick={() => onSelectOption("Delete")} >
                                        Delete
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                ),
            },
        ],
        [dropdownOpen]
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data });

    return (
        <>
            <div className="bg-white p-6 rounded-2xl">
                <h2 className="text-lg text-textBlack font-semibold mb-4">Team</h2>
                <div className="relative overflow-x-auto">
                    <div className="flex flex-row items-center mb-4 space-x-2 justify-between">
                        <div className="flex items-center border border-gray-300 rounded-2xl pr-3 p-3 w-1/4">
                            <Search />
                            <input
                                type="text"
                                placeholder="Search"
                                className="ml-2 border-none outline-none w-full"
                            />
                        </div>
                        <div className="flex flex-row items-center space-x-4">
                            <button 
                              onClick={() => addMember("Add Member")} // Use row.original.id
                            className="bg-black text-white rounded-xl px-5 text-sm py-2" >
                                Add new member
                              
                            </button>
                        </div>
                    </div>
                    <table key={rows.id} className="w-full text-left border-collapse">
                        <thead>
                            {headerGroups.map(headerGroup => (
                                <tr key={headerGroup.id} className="border-b border-gray-200">
                                    {headerGroup.headers.map(column => (
                                        <th
                                            key={column.id}
                                            className="px-4 py-4 text-sm font-medium bg-grey50"
                                        >
                                            <div className="flex flex-row">
                                                {column.id === "id" ? (
                                                    <CheckBox
                                                        checked={isChecked}
                                                        onChange={handleCheckboxChange}
                                                    />
                                                ) : null}
                                                {column.render("Header")}
                                            </div>
                                        </th>
                                    ))}
                                </tr>
                            ))}
                        </thead>
                        <tbody key={rows.id}>
                            {rows.map(row => {
                                prepareRow(row);
                                return (
                                    <tr
                                        key={row.original.id} // Use row.original.id here
                                        className="border-b border-gray-200  cursor-pointer"
                                    >
                                        {row.cells.map(cell => (
                                            <td
                                                key={cell.column.id}
                                                className="px-4 py-4 text-textLight text-sm"
                                            >
                                                {cell.render("Cell")}
                                            </td>
                                        ))}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                    <div className="flex justify-between items-center mt-4">
                        <p className="text-sm text-gray-500">Showing 1-10 from 100</p>
                        <div className="flex space-x-1">
                            <ChevronLeft />
                            <button className="px-3 py-1 rounded-lg bg-black text-white">1</button>
                            <button className="px-3 py-1 rounded-lg">2</button>
                            <button className="px-3 py-1 rounded-lg">3</button>
                            <button className="px-3 py-1 rounded-lg">4</button>
                            <button className="px-3 py-1 rounded-lg">5</button>
                            <button className="px-3 py-1 rounded-lg">&hellip;</button>
                            <ChevronRight />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TeamTable;
