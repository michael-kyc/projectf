"use client";
import React, { useEffect, useState } from "react";
import Copy from "@/Icons/Copy";
import CompanyStatusTemplate from "@/app/dashboard/company/company_components/status_template";
import { formatDate } from "@/utils/helper";
import NotesModal from "@/components/Companies/NotesModal";
import useApi from "@/hooks/useApi";
import { useParams } from "next/navigation";

export default function CompanyInfoTab({ companyData }) {
  const [isNotesModalOpen, setIsNotesModalOpen] = useState(false);
  const [notes, setNotes] = useState("");
  const openModal = () => setIsNotesModalOpen(true);
  const closeModal = () => setIsNotesModalOpen(false);
  const params = useParams();
  const company_id = params.id;

  const { fetchData, loading, error } = useApi();

  async function getNote() {
    const { result, error } = await fetchData(`/private-notes/${company_id}`, {
      method: "GET",
    });
    if (error) {
      setNotes("");
    } else {
      console.log("companyData", result);
      setNotes(result?.content);
    }
  }

  async function updateNote() {
    const { result, error } = await fetchData(
      `/private-notes/company/${company_id}`,
      {
        method: "PATCH",
        body: {
          content: notes,
        },
      }
    );
    if (error) {
      setNotes({});
    } else {
      console.log("companyData");
      setNotes(result.content);
    }
  }

  useEffect(() => {
    getNote();
  }, []);

  const handleAddNote = async () => {
    await updateNote();
    setIsNotesModalOpen(false);
  };

  return (
    <>
      <div className="flex flex-wrap justify-between gap-2 lg:flex-nowrap">
        {/* Left Section */}
        <div className="w-full space-y-2 lg:w-2/3">
          <div className="p-4 bg-white shadow-sm rounded-2xl">
            <h2 className="mb-2 text-sm font-semibold leading-5 tracking-tight text-left">Basic Information</h2>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              {/* Column 1 */}
              <div className="space-y-2">
                <div className="mb-2">
                  <p className="text-xs font-medium text-gray-500 leading-4 text-left mb-2">
                    Company Name
                  </p>
                  <p className="text-xs font-semibold leading-4 text-left mb-2">
                    {companyData.business_name || "xxx-xxx-xxx"}
                  </p>
                </div>
                <div className="mb-2">
                  <p className="text-xs font-medium text-gray-500 leading-4 text-left mb-2">Industry</p>
                  <p className="text-xs font-semibold leading-4 text-left mb-2">
                    {companyData.name || "xxx-xxx-xxx"}
                  </p>
                </div>
              </div>

              {/* Column 2 */}
              <div className="space-y-2">
                <div className="mb-2">
                  <p className="text-xs font-medium text-gray-500 leading-4 text-left mb-2">
                    Registration Number
                  </p>
                  <p className="text-xs font-semibold leading-4 text-left mb-2">
                    {companyData.name || "xxx-xxx-xxx"}
                  </p>
                </div>
                <div className="mb-2">
                  <p className="text-xs font-medium text-gray-500 leading-4 text-left mb-2">
                    Date Registered
                  </p>
                  <p className="text-xs font-semibold leading-4 text-left mb-2">
                    {formatDate(companyData?.created_at)}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="p-4 bg-white shadow-sm rounded-2xl">
            <h2 className="mb-2 text-sm font-semibold leading-5 tracking-tight text-left">Contact Information</h2>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              {/* Column 1 */}
              <div className="space-y-2">
                <div className="mb-2">
                  <p className="text-xs font-medium text-gray-500 leading-4 text-left mb-2">
                    Email Address
                  </p>
                  <p className="flex items-center text-xs font-semibold leading-4 text-left mb-2 text-blue-600">
                    {companyData.business_email || "robertfox@gmail.com"}
                    <button className="ml-2">
                      <Copy />
                    </button>
                  </p>
                </div>
                <div className="mb-2">
                  <p className="text-xs font-medium text-gray-500 leading-4 text-left mb-2">
                    Website URL
                  </p>
                  <p className="flex items-center text-xs font-semibold leading-4 text-left mb-2 text-blue-600">
                    {companyData.business_website || "www.tech.com"}
                    <button className="ml-2">
                      <Copy />
                    </button>
                  </p>
                </div>
              </div>

              {/* Column 2 */}
              <div className="space-y-2">
                <div className="mb-2">
                  <p className="text-xs font-medium text-gray-500 leading-4 text-left mb-2">
                    Phone Number
                  </p>
                  <p className="flex items-center text-xs font-semibold leading-4 text-left mb-2 text-blue-600">
                    {companyData.phone_number || "+971 786 7966"}
                    <button className="ml-2">
                      <Copy />
                    </button>
                  </p>
                </div>
                <div className="mb-2">
                  <p className="text-xs font-medium text-gray-500 leading-4 text-left mb-2">Address</p>
                  <p className="text-xs font-semibold leading-4 text-left mb-2">

                  Al Khail Gate, Al Quoz 4, Dubai, United Arab Emirates
                    {/* {companyData.address_line_one || "xxx-xxx-xxx"}
                    <br />
                    {companyData.address_line_two || "xxx-xxx-xxx"}
                    <br />
                    {companyData.country_of_incorporation || "xxx-xxx-xxx"} */}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex flex-col w-full space-y-2 lg:w-1/3">
          {/* Status Card */}
          <div className="p-4 bg-white shadow-sm rounded-2xl">
            <p className="text-sm font-semibold leading-5 tracking-tight text-left">Company Status</p>
            <div className="flex items-center mt-[10px] justify-between">
              <p className="text-textBlack text-xs font-medium text-left leading-4">Status</p>
              <CompanyStatusTemplate
                status={companyData.status}
                active={companyData.active }
              />
            </div>
          </div>

          {/* User Role Card */}
          <div className="p-4 bg-white shadow-sm rounded-2xl">
            <div className="flex flex-row items-center justify-between w-full">
              <p className="text-sm font-semibold leading-5 tracking-tight text-left">Additional Information</p>
              <button className="mt-2 text-xs font-medium text-blue-600">
                + Add Info
              </button>
            </div>

            <div className="flex items-center mt-[10px] justify-between">
              <p className="text-textBlack text-xs font-normal leading-4 text-left">
                Tech Innovations Inc is a leading provider of innovative
                solutions in the fintech industry, dedicated to enhancing
                financial services with cutting-edge technology.
              </p>
            </div>
          </div>

          {/* Private Note Card */}
          <div className="p-4 bg-white shadow-sm rounded-2xl">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold leading-5 tracking-tight text-left">Private note</p>
              <button
                className="mt-2 text-xs font-medium text-blue-600 text-left"
                onClick={openModal}
              >
                + Add Note
              </button>
            </div>
            <p className=" mt-[10px] text-textBlack text-xs font-normal leading-4 text-left">
              Only visible to you
            </p>
            {notes.length > 0 && (
              <p className=" mt-[10px] text-textBlack text-xs font-normal leading-4 text-lefts">{notes}</p>
            )}
          </div>
        </div>
      </div>
      <NotesModal
        note={notes}
        setNote={setNotes}
        isOpen={isNotesModalOpen}
        onClose={closeModal}
        handleAddNote={handleAddNote}
      />
    </>
  );
}
