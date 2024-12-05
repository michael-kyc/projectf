import React, { useEffect, useState } from "react";
import Button from "@/components/Elements/Button/Button";
import Back from "@/Icons/Back";
import Modal from "@/components/Modal/Modal";
import EditProfile from "./EditProfile";
import BasicInformation from "./BasicInformation";
import PersonalInfo from "./PersonalInfo";
import CombinedCard from "./CombinedCard";
import useApi from "@/hooks/useApi";
import { useRouter } from "next/navigation";

export default function ProfileBody({
  customerDetails,
  fetchCustomerDetails,
  company_id,
}) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [showSecondComponent, setShowSecondComponent] = useState(false);
  const [formData, setFormData] = useState(customerDetails);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  const status = customerDetails?.status ? "Active" : "Inactive";
  const role = customerDetails?.role || "Active";

  const { fetchData, loading, error } = useApi();

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

  const handleBack = () => {
    // router.push(`/dashboard/company/${company_id}?tab=5`);
    router.back();
  };

  useEffect(() => {
    if (customerDetails) {
      setFormData(customerDetails);
    }
  }, [customerDetails]);

  return (
    <div className="p-4">
      <div className="flex flex-col justify-between gap-2 md:gap-0 md:flex-row">
        <div className="flex flex-row items-center gap-2">
          <button onClick={showSecondComponent ? handleToggle : handleBack}>
            <Back />
          </button>
          <img
            src={"https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}
            alt="Logo"
            className="w-[32px] h-[32px] rounded-[71.11px]"
          />
          <h1 className="text-xs md:text-sm font-medium leading-5 tracking-[-0.005em] text-left ml-2">{`${customerDetails?.first_name} ${customerDetails?.last_name}`}</h1>
          <button
            className=" md:px-8 px-4 ml-4 py-1.5 rounded-full text-xs bg-primary50 text-primary h-[28px] text-center text[12px] font-medium leading-4 font-inter "
            disabled
          >
            {customerDetails?.role || "Admin"}
          </button>
        </div>{" "}
        <div className="flex justify-start md:justify-center">
          {!showSecondComponent ? (
            <div className="flex flex-wrap md:px-4 py-2 gap-2">
              {/* <Button
                title="Log out"
                onClick={openModal}
                type="secondary"
                className={
                  "md:text-sm text-xs bg-white md:h-8 h-8 md:w-[80px] w-[80px] border-10 border-primary50 text-center font-inter font-normal leading-4 text-textBlack"
                }
                color="gray"
              /> */}
              <Button
                title="Register business account"
                className="h-8 px-4 py-2 w-[182px] text-[12px] text-gray-700 bg-white border border-gray-200 rounded-[10px] whitespace-nowrap hover:bg-gray-50"
                onClick={() => {
                  router.push("/dashboard/register/business");
                }}
              />

              <Button
                title="Edit"
                type="primary"
                color="primary"
                className={
                  "text-white bg-primary h-8 w-[80px] text-[12px] rounded-[10px]"
                }
                onClick={handleToggle}
              />
            </div>
          ) : (
            <div className="flex flex-wrap md:px-4 py-2 gap-2">
              <Button
                title="Cancel"
                onClick={handleToggle}
                type="secondary"
                className={
                  "md:text-sm text-xs bg-white md:h-8 h-8 md:w-[80px] w-[80px] border-10 border-primary50 text-center font-inter font-normal leading-4 text-textBlack"
                }
                color="gray"
              />
              <Button
                title="Save"
                type="primary"
                color="primary"
                onClick={handleSubmit}
                className={
                  "text-white bg-primary md:h-8 h-[32px] md:w-[80px] w-[80px] md:text-[12px] text-[12px] rounded-[10px] m-0 "
                }
              />
            </div>
          )}
        </div>
      </div>

      {!showSecondComponent ? (
        <div className="flex flex-col justify-between gap-2  md:flex-row">
          {/* Left Section */}
          <div className="flex flex-col w-full gap-2">
            <BasicInformation customerDetails={customerDetails} />
            <PersonalInfo customerDetails={customerDetails} />
          </div>
          {/* Right Section */}
          <div className="flex flex-col gap-2  md:w-[50%] w-full">
            <CombinedCard
              username={customerDetails?.user_name}
              status={status}
              role={role}
              onAddNote={handleAddNote}
            />
          </div>
        </div>
      ) : (
        <EditProfile formData={formData} setFormData={setFormData} />
      )}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        className={"md:w-[523px] w-[93%]"}
      >
        {/* Modal Body */}
        <div className="p-4 text-sm font-normal leading-4 text-left text-textBlack">
          <p>Are you sure you want to log out from this account?</p>
        </div>
        {/* Modal Footer */}
        <div className="flex justify-end p-4 space-x-4 border-t">
          <Button
            title="Cancel"
            type="secondary"
            onClick={closeModal}
            className={
              "text-primary bg-grey50 text-sm w-[114px] h-[32px] py-4 px-4 rounded-lg"
            }
          />
          <Button
            title="Log out"
            type="primary"
            onClick={closeModal}
            className={
              "text-white bg-primary text-sm w-[114px] h-[32px] py-4 px-4 rounded-lg"
            }
          />
        </div>
      </Modal>
    </div>
  );
}
