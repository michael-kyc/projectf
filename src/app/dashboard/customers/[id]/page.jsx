"use client";
import React, { useEffect, useRef, useState } from "react";
import NavBar from "@/components/NavBar/NavBar";
import ProfileBody from "@/components/Profile/ProfileBody";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import useApi from "@/hooks/useApi";

import Back from "@/Icons/Back";
import Modal from "@/components/Modal/Modal";
import CustomerProfileBody from "@/components/CustomerProfile/CustomerProfileBody";
import Button, { TextButton } from "@/components/Elements/Button/Button";
import CustomerBody from "@/components/Customers/CustomerBody/CustomerBody";

export default function Page() {
  const [customerDetails, setCustomerDetails] = useState([]);
  const params = useParams();
  const searchParams = useSearchParams();
  const company_id = searchParams.get("companyId");
  const { fetchData, loading, error } = useApi();
  const customer_id = params.id;

  async function fetchCustomerDetails() {
    const { result, error } = await fetchData(`/users/user/${customer_id}`, {
      method: "GET",
    });
    if (error) {
      setCustomerDetails([]);
    } else {
      console.log("result of user", result);
      setCustomerDetails(result);
    }
  }

  useEffect(() => {
    fetchCustomerDetails();
  }, []);

  //---------------------------profile body---------------------------------
  const [isModalOpen, setModalOpen] = useState(false);
  const [showSecondComponent, setShowSecondComponent] = useState(false);
  const [formData, setFormData] = useState(customerDetails);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const handleToggle = () => {
    setShowSecondComponent((prevState) => !prevState);
  };

  const handleAddNote = () => {
    console.log("Add note clicked");
  };

  const handleSubmit = async () => {
    const payload = {
      user: {
        first_name: formData?.first_name,
        last_name: formData?.last_name || "",
        email: formData?.email || "",
        status: formData?.status,
      },
      profile: {
        image: formData?.image || "",
        dateRegistered: formData?.dateRegistered || "",
        dateOfBirth: formData?.dateOfBirth || "",
        gender: formData?.gender || "",
        phoneNumber: formData?.phoneNumber || "",
        streetAddress: formData?.streetAddress || "",
        city: formData?.city || "",
        state: formData?.state || "",
        zipCode: formData?.zipCode || "",
        country: formData?.country || "",
      },
    };

    const { result, error } = await fetchData(
      `/users/update-user/${customerDetails.id}`,
      {
        method: "PATCH",
        body: payload,
      }
    );
    if (error) {
      console.log("error", error);
    } else {
      console.log("result", result);
      await fetchCustomerDetails();
      handleToggle();
    }
  };
  const router = useRouter();

  const handleBack = () =>
    router.push(`/dashboard/company/${company_id}?tab=5`);

  useEffect(() => {
    if (customerDetails) {
      setFormData(customerDetails);
    }
  }, [customerDetails]);

  //----------------------------------profile body---------------------------------

  return (
    // <>
    //   <NavBar>
    //     <ProfileBody
    //       customerDetails={customerDetails}
    //       fetchCustomerDetails={fetchCustomerDetails}
    //       company_id={company_id}
    //     />
    //   </NavBar>
    // </>

    <>
      <NavBar pageName={"Customers"}>
        <div className="flex flex-col md:flex-row items-center justify-between py-2 gap-4 md:gap-0 px-4">
          <div className="flex flex-row items-center gap-4">
            <button onClick={showSecondComponent ? handleToggle : handleBack}>
              <Back />
            </button>
            <div className="flex items-center gap-1">
              <img
                src={"https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}
                alt="Logo"
                className="w-8 h-8 rounded-full"
              />
              <h1 className="text-[14px] md:text-[14px] font-medium leading-[20px] tracking[-0.005em] text-left">
                {`${customerDetails?.first_name || "Name"} ${
                  customerDetails?.last_name || ""
                }`}
              </h1>
            </div>
            <p className="bg-green50 text-green-500 font-medium text-xs md:text-sm rounded-full py-1 px-3 w-fit">
              Active
            </p>
          </div>

          <div className="flex items-center justify-center">
            {!showSecondComponent ? (
              <div className="flex flex-col md:flex-row gap-2">
                <TextButton
                  title="Download Summary"
                  textColor="text-textBlack"
                  backgroundColor="bg-white"
                  borderColor="border border-primary50"
                  width="w-full md:w-auto sm:min-w-[80px]"
                />
                <TextButton
                  title="Deactivate"
                  textColor="text-alert500"
                  backgroundColor="bg-white"
                  borderColor="border border-alert500"
                  width="w-full md:w-auto sm:min-w-[80px]"
                />
                <TextButton
                  title="Edit"
                  onClick={handleToggle}
                  width="w-full md:w-auto sm:min-w-[80px]"
                />
              </div>
            ) : (
              <div className="flex flex-col md:flex-row gap-2">
                <TextButton
                  title="Cancel"
                  onClick={handleToggle}
                  backgroundColor="bg-white"
                  textColor="text-textBlack"
                  width="w-full md:w-auto sm:min-w-[80px]"
                />
                <TextButton
                  title="Save"
                  onClick={handleSubmit}
                  width="w-full md:w-auto sm:min-w-[80px]"
                />
              </div>
            )}
          </div>
        </div>

        <CustomerBody
          customerDetails={customerDetails}
          formData={formData}
          setFormData={setFormData}
          showSecondComponent={showSecondComponent}
        />
      </NavBar>
    </>
  );
}
