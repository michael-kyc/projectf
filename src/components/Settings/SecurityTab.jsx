"use client";
import CountriesPhone from "@/components/Elements/Country/CountriesNumber";
import { country as Countries } from "@/data/Country/Country";
import React, { useRef, useState } from "react";
import Modal from "../Modal/Modal";
import Button, { ButtonsText, TextButton } from "../Elements/Button/Button";
import VisibilityOn from "@/Icons/VisibilityOn";
import VisibilityOff from "@/Icons/VisibilityOff";
import DropDown from "@/components/Elements/DropDown/DropDown";
import useIsMobile from "@/hooks/useIsMobile";
import Switch from "react-switch";

export default function SecurityTab({ isAccountActivation = true }) {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(
    () => Countries.filter((each) => each.value === "AE")[0]
  );
  const [isTwoFactorAuth, setTwoFactorAuth] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isModalPOpen, setModalPOpen] = useState(false);
  const [isEmailModalOpen, seEmailModalOpen] = useState(false);
  const [isSecurityModalOpen, setSecurityModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  const openPModal = () => setModalPOpen(true);
  const closePModal = () => setModalPOpen(false);
  const openEmailModal = () => seEmailModalOpen(true);
  const closeEmailModal = () => seEmailModalOpen(false);
  const openSecurityModal = () => setSecurityModalOpen(true);
  const closeSecurityModal = () => setSecurityModalOpen(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setConfirmShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };
  const toggleConfirmPasswordVisibility = () => {
    setConfirmShowPassword((prevState) => !prevState);
  };

  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const inputs = useRef([]);

  const [isPhoneModalOpen, setPhoneModalOpen] = useState(false);
  const openPhoneModal = () => setPhoneModalOpen(true);
  const closePhoneModal = () => setPhoneModalOpen(false);

  const countryCodes = [
    { value: "+1", label: "+1" },
    { value: "+44", label: "+44" },
    { value: "+91", label: "+91" },
    { value: "+86", label: "+86" },
    { value: "+81", label: "+81" },
    { value: "+49", label: "+49" },
    { value: "+33", label: "+33" },
    { value: "+61", label: "+61" },
    { value: "+7", label: "+7" },
    { value: "+972", label: "+972" },
  ];

  const handleChange = (e, index) => {
    const { value } = e.target;
    if (/^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      // Focus on the next input if available
      if (value && index < 5) {
        inputs.current[index + 1].focus();
      } else {
        nextStep();
      }
    }
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handlePaste = (e) => {
    const pasteData = e.clipboardData.getData("text");
    if (/^\d*$/.test(pasteData)) {
      const newOtp = pasteData.split("").slice(0, 6);
      setOtp(newOtp);
      // Focus on the next input if available
      newOtp.forEach((value, index) => {
        if (value && index < 5) {
          inputs.current[index + 1].focus();
        }
      });
    }
  };

  const questions = [
    { value: "1", label: "What is the name of your first pet?" },
    { value: "2", label: "What is your father's middle name?" },
    { value: "2", label: "What is the name of the street you grew up on?" },
  ];

  return (
    <>
      <div className="max-w-full mx-auto my-2 md:my-4">
        {/** Password Section */}
        <div className="bg-white p-4 rounded-2xl md:rounded-xl shadow-sm mt-2 border border-primary50">
          <h2 className="font-semibold text-sm leading-[20px] tracking[-0.005em] text-textBlack mb-2 text-left">
            Password
          </h2>
          <p className="font-normal text-[12px] leading-[16px] text-textSecondary mb-2 text-left">
            This is the password used for login. You can update it if needed.
          </p>
          <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center border border-primary50 p-2 rounded-xl justify-between">
            <p className="text-xs font-semibold flex flex-row items-center text-textBlack leading-[16px] text-left no-underline">
              Password:{" "}
              <span className="font-semibold text-xs leading-[16px] text-textBlack text-left ml-2">
                •••••••••••
              </span>
              <VisibilityOff />
            </p>
            <div className="flex flex-wrap items-center gap-2">
              <TextButton
                width="w-auto"
                onClick={openModal}
                textColor="textBlack"
                backgroundColor="bg-white"
                title={"Send email verification code"}
                borderColor="border-[1px] border-primary50"
                className={"px-4 py-1 md:py-2 rounded-[10px]"}
              />

              <TextButton
                width="w-auto"
                title={"Change"}
                onClick={openModal}
                className={"px-4 py-1 md:py-2 rounded-[10px]"}
              />
            </div>
          </div>
        </div>

        {/* Email Section */}
        <div className="bg-white p-4 rounded-xl shadow-sm mt-2 border border-primary50">
          <h2 className="font-semibold text-sm leading-[20px] tracking[-0.005em] text-textBlack mb-1 ">
            Email Address
          </h2>
          <p className="font-normal text-xs leading-[16px] text-textSecondary mb-2 text-left">
            This is the email used for login. You can update it or send a
            verification code if needed.
          </p>
          <div className="flex flex-wrap flex-row gap-2 items-center border border-primary50 p-2 rounded-xl justify-between">
            <p className="font-semibold text-xs leading-[16px] text-textBlack text-left">
              Email Address:{" "}
              <span className="font-semibold text-xs leading-[16px] text-textBlack text-left ml-2">
                Tech@company.com
              </span>
            </p>
            <div className="flex flex-wrap items-center gap-2">
              <TextButton
                width="w-auto"
                onClick={openModal}
                textColor="textBlack"
                backgroundColor="bg-white"
                title={"Send email verification code"}
                borderColor="border-[1px] border-primary50"
                className={"px-4 py-1 md:py-2 rounded-[10px]"}
              />

              <TextButton
                width="w-auto"
                title={"Change"}
                onClick={openEmailModal}
                className={"px-4 py-1 md:py-2 rounded-[10px]"}
              />
            </div>
          </div>
        </div>

        {/* Phone Section */}
        <div className="bg-white p-4 rounded-xl shadow-sm mt-2 border border-primary50">
          <h2 className="font-semibold text-sm leading-[20px] tracking[-0.005em] text-textBlack mb-1 text-left">
            Phone Number
          </h2>
          <p className="font-normal text-[12px] leading-[16px] text-textSecondary mb-2 text-left">
            This phone number is associated with your account for security and
            verification purposes.
          </p>
          <div className="flex flex-wrap flex-row gap-2 items-center border border-primary50 p-2 rounded-xl justify-between">
            <p className="font-semibold text-[12px] leading-[16px] text-textBlack text-left">
              Phone Number:{" "}
              <span className="font-semibold text-[12px] leading-[16px] text-textBlack text-left ml-2">
                +972345367548
              </span>
            </p>
            <div className="flex flex-wrap items-center gap-2">
              <TextButton
                width="w-auto"
                onClick={openModal}
                textColor="textBlack"
                backgroundColor="bg-white"
                borderColor="border-[1px] border-primary50"
                title={"Send SMS verification code"}
                className={"px-4 py-1 md:py-2 rounded-[10px]"}
              />
              <TextButton
                width="w-auto"
                title={"Change"}
                onClick={openPhoneModal}
                className={"px-4 py-1 md:py-2 rounded-[10px]"}
              />
            </div>
          </div>
        </div>

        {/* 2FA Section */}
        <div className="bg-white p-4 rounded-xl shadow-sm mt-2 border border-primary50">
          <h2 className="font-semibold text-sm leading-[20px] tracking[-0.005em] text-textBlack mb-1 text-left">
            Two-Factor Authentication (2FA)
          </h2>
          <p className="font-normal text-[12px] leading-[16px] text-textSecondary mb-2 text-left">
            Enhance your account security by enabling 2FA. You can manage your
            2FA settings here.
          </p>
          <div className="flex flex-wrap flex-row gap-2 items-center border border-primary50 p-2 rounded-xl justify-between">
            <p className="font-semibold text-[12px] leading-[16px] text-textBlack text-left">
              Authenticator App
            </p>
            <div className="flex items-center gap-2">
              <Switch
                onChange={(checked) => setTwoFactorAuth(!!checked)}
                checked={isTwoFactorAuth}
                onColor="#000"
                offColor="#ddd"
                uncheckedIcon={false}
                checkedIcon={false}
                handleDiameter={14}
                height={18.29}
                width={32}
                borderRadius={28.57}
              />
            </div>
          </div>
        </div>

        {/* Security Questions Section */}
        <div className="bg-white p-4 rounded-xl shadow-sm mt-2 border border-primary50">
          <h2 className="font-semibold text-sm leading-[20px] tracking[-0.005em] text-textBlack mb-1 text-left">
            Security Questions
          </h2>
          <p className="font-normal text-[12px] leading-[16px] text-textSecondary mb-4 text-left">
            Set up security questions to help protect your account. You can
            change your answers here.
          </p>

          <div className="bg-white p-2 rounded-xl shadow-sm mt-2 border border-primary50">
            {[
              {
                name: "Question 1:",
                question: "What is the name of your first pet?",
              },
              {
                name: "Question 2:",
                question: "What is your father’s middle name?",
              },
              {
                name: "Question 3:",
                question: "What is the name of the street you grew up on?",
              },
            ].map((question, index) => (
              <div key={index} className="mb-8">
                <div className="flex flex-wrap itmes-center gap-2 sm:gap-10 justify-start">
                  <p className="font-semibold text-xs leading-[16px] text-textBlack text-left">
                    {question.name}
                  </p>
                  <p className="font-normal text-xs leading-[16px] text-textSecondary mb-2 text-left">
                    {question.question}
                  </p>
                </div>
                <div className="flex flex-wrap items-center justify-start gap-2 sm:gap-10 mt1">
                  <p className="text-xs font-semibold text-textBlack mr-2">{`Answer ${
                    index + 1
                  }: `}</p>
                  <div className="flex items-center justify-start gap-2 text-xs font-normal text-textBlack">
                    <span>•••••••••••</span>
                    <VisibilityOff />
                  </div>
                </div>
              </div>
            ))}
            <div className="flex justify-end">
              <TextButton
                width="w-auto"
                onClick={openSecurityModal}
                title={"Send Reset Security Question Email"}
                className={"px-4 py-1 md:py-2 rounded-[10px]"}
              />
            </div>
          </div>
        </div>

        {/* Account Activation Section */}
        {isAccountActivation && (
          <div className="bg-white p-4 rounded-xl shadow-sm mt-2 w-full text-left border border-primary50 flex flex-wrap gap-2 flex-row justify-between items-center">
            <h2 className="font-semibold text-sm text-textBlack">
              Deactivate Account
            </h2>
            <p className="text-xs font-normal text-textSecondary">
              Temporarily deactivate your account. You can reactivate it at any
              time.
            </p>

            <TextButton
              width="w-auto"
              backgroundColor="bg-white"
              title={"Deactivate account"}
              textColor="text-alert500"
              borderColor="border-[1px] border-alert500"
              className={"px-4 py-1 md:py-2 rounded-[10px]"}
            />
          </div>
        )}
      </div>

      {/* Change Passcode Modal Body */}
      <Modal
        isOpen={isModalPOpen}
        onClose={closePModal}
        title="Change Passcode"
        headerClassName="py-2 px-4"
        contentClassName="p-0"
      >
        {/* Modal Body */}
        <div className="p-4">
          <p>Enter Current Passcode</p>
        </div>
        <div className="flex justify-center space-x-2">
          {otp.map((value, index) => (
            <input
              key={index}
              ref={(el) => (inputs.current[index] = el)}
              type="text"
              maxLength="1"
              value={value}
              onChange={(e) => handleChange(e, index)}
              onPaste={handlePaste}
              className="w-6 h-6 border border-primary rounded-full text-center text-xs"
            />
          ))}
        </div>
        {/* Modal Footer */}
        <div className="flex justify-end p-4 border-t border-2 gap-2 p-4">
          <TextButton
            title="Cancel"
            type="secondary"
            width="w-[114px]"
            onClick={closePModal}
          />
        </div>
      </Modal>

      {/* Change Password Modal Body */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Change Password"
        customWidth="max-w-[96%] sm:max-w-[500px]"
        headerClassName="py-2 px-4"
        contentClassName="p-0"
      >
        {/* Modal Body */}
        <div className="p-4">
          <p className=" pb-1 font-normal text-xs text-textBlack">
            Current Password*
          </p>
          <div className="relative w-full">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Your new password"
              className="border border-gray-300 p-3 rounded-[10px] text-xs h-8 w-full pr-10"
            />
            {/* Eye icon to toggle password visibility */}
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-[5px] text-gray-500"
            >
              {showPassword ? (
                <VisibilityOn /> // eye icon (open)
              ) : (
                <VisibilityOff /> // eye-off icon (closed)
              )}
            </button>
          </div>
          <p className="pt-4 pb-1 font-normal text-xs text-textBlack">
            New Password*
          </p>
          <div className="relative w-full">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Re-type your password"
              className="border border-gray-300 p-3 rounded-[10px] text-xs h-8 w-full pr-10"
            />
            {/* Eye icon to toggle password visibility */}
            <button
              type="button"
              onClick={toggleConfirmPasswordVisibility}
              className="absolute right-3 top-[5px] text-gray-500"
            >
              {showConfirmPassword ? (
                <VisibilityOn /> // eye icon (open)
              ) : (
                <VisibilityOff /> // eye-off icon (closed)
              )}
            </button>
          </div>
        </div>
        {/* Modal Footer */}
        <div className="flex justify-end border-t gap-2 p-4">
          <TextButton
            title="Cancel"
            width="max-w-[114px] w-full"
            onClick={closeModal}
            textColor="text-textBlack"
            backgroundColor="bg-white"
            borderColor="border border-primary50"
          />
          <TextButton
            title="Change"
            width="max-w-[114px] w-full"
            onClick={closeModal}
          />
        </div>
      </Modal>

      {/* Change Email Modal Body */}
      <Modal
        isOpen={isEmailModalOpen}
        onClose={closeEmailModal}
        title="Change email address"
        customWidth="max-w-[96%] sm:max-w-[500px]"
        headerClassName="py-2 px-4"
        contentClassName="p-0"
      >
        {/* Modal Body */}
        <div className="p-4">
          <p className=" pb-1 font-normal text-sm text-textBlack">
            Current email address
          </p>
          <input
            type="text"
            placeholder="Email address"
            className="border border-gray-300 p-3 rounded-[10px] w-full h-8 text-xs"
          />
          <p className="pt-4 pb-1 font-normal text-sm text-textBlack">
            New email address
          </p>
          <input
            type="text"
            placeholder="Email address"
            className="border border-gray-300 p-3 rounded-[10px] w-full h-8 text-xs"
          />
        </div>
        {/* Modal Footer */}
        <div className="flex justify-end border-t gap-2 p-4">
          <TextButton
            title="Cancel"
            onClick={closeEmailModal}
            textColor="text-textBlack"
            backgroundColor="bg-white"
            width="max-w-[114px] w-full"
            borderColor="border border-primary50"
          />
          <TextButton
            title="Change"
            onClick={closeModal}
            width="max-w-[114px] w-full"
          />
        </div>
      </Modal>

      <Modal
        isOpen={isPhoneModalOpen}
        onClose={closePhoneModal}
        title="Change Phone Number"
        customWidth="max-w-[96%] sm:max-w-[500px]"
        headerClassName="py-2 px-4"
        contentClassName="p-0"
      >
        {/* Modal Body */}
        <div className="p-4">
          <p className="text-sm font-normal leading-4 text-black pb-1">
            Current Phone Number
          </p>
          <div className="flex gap-2">
            <div className="w-fit">
              <CountriesPhone
                id={"country-selector"}
                open={isOpen}
                onChange={(value) => setSelectedValue(value)}
                onToggle={() => setIsOpen((prev) => !prev)}
                selectedValue={Countries.find(
                  (option) => option.areaCode === selectedValue.areaCode
                )}
                width="w-16"
                className={`border border-primary50 py-1 px-2`}
              />
            </div>
            <input
              type="text"
              placeholder="Current phone number"
              className="w-[400px] h-8 px-2 border border-gray-300 p-3  py-1 rounded-[10px] text-xs"
            />
          </div>

          <p className="pt-4 text-sm font-normal leading-4 text-black pb-1">
            New Phone Number
          </p>
          <div className="flex gap-2">
            <div className="w-fit">
              <CountriesPhone
                id={"country-selector"}
                open={isOpen}
                onChange={(value) => setSelectedValue(value)}
                onToggle={() => setIsOpen((prev) => !prev)}
                selectedValue={Countries.find(
                  (option) => option.areaCode === selectedValue.areaCode
                )}
                width="w-16"
                className={`border border-primary50 py-1 px-2`}
              />
            </div>
            <input
              type="text"
              placeholder="Current phone number"
              className="w-[400px] h-8 px-2 border border-gray-300 p-3  py-1 rounded-[10px] text-xs "
            />
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex justify-end border-t gap-2 p-4">
          <TextButton
            title="Cancel"
            onClick={closePhoneModal}
            textColor="text-textBlack"
            backgroundColor="bg-white"
            width="max-w-[114px] w-full"
            borderColor="border border-primary50"
          />
          <TextButton
            title="Change"
            width="max-w-[114px] w-full"
            onClick={closePhoneModal}
          />
        </div>
      </Modal>

      {/* Change Security Question Modal Body */}
      <Modal
        isOpen={isSecurityModalOpen}
        onClose={closeSecurityModal}
        title="Security Questions"
        customWidth="max-w-[96%] sm:max-w-[500px]"
        headerClassName="py-2 px-4"
        contentClassName="p-0"
      >
        {/* Modal Body */}
        <div className="p-4">
          <p className=" pb-2 text-sm">Questions 1</p>
          <div className="relative w-full">
            <DropDown
              items={questions}
              className="w-full h-8 rounded-[10px]"
              width={"w-full"}
              title="What is the name of your first pet?"
            />
          </div>
          <p className="pt-2 pb-2 text-xs">Answer 1</p>
          <div className="relative w-full mb-4">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Your Answer"
              className="border border-gray-300 p-2 rounded-[10px] text-xs h-8 w-full pr-10"
            />
            {/* Eye icon to toggle password visibility */}
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-[5px] text-gray-500"
            >
              {showPassword ? (
                <VisibilityOn /> // eye icon (open)
              ) : (
                <VisibilityOff /> // eye-off icon (closed)
              )}
            </button>
          </div>

          <hr></hr>
          <p className="pt-2 pb-2 text-xs">Questions 2</p>
          <div className="relative w-full">
            <DropDown
              items={questions}
              className="w-full h-8  rounded-[10px]"
              width={"w-full"}
              title="What is the name of your first pet?"
            />
          </div>
          <p className="pt-2 pb-2 text-sm">Answer 2</p>
          <div className="relative w-full mb-4">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Your Answer"
              className="border border-gray-300 p-2 rounded-[10px] text-xs w-full pr-10"
            />
            {/* Eye icon to toggle password visibility */}
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-[5px] text-gray-500"
            >
              {showPassword ? (
                <VisibilityOn /> // eye icon (open)
              ) : (
                <VisibilityOff /> // eye-off icon (closed)
              )}
            </button>
          </div>

          <hr></hr>
          <p className="pt-2 pb-2 text-xs">Questions 3</p>
          <div className="relative w-full">
            <DropDown
              items={questions}
              className="w-full h-8 rounded-[10px]"
              width={"w-full"}
              title="What is the name of your first pet?"
            />
          </div>
          <p className="pt-4 pb-2 text-xs">Answer 3</p>
          <div className="relative w-full mb-4">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Your Answer"
              className="border border-gray-300 p-2 rounded-[10px] text-xs w-full pr-10"
            />
            {/* Eye icon to toggle password visibility */}
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-[5px] text-gray-500"
            >
              {showPassword ? (
                <VisibilityOn /> // eye icon (open)
              ) : (
                <VisibilityOff /> // eye-off icon (closed)
              )}
            </button>
          </div>
        </div>
        {/* Modal Footer */}
        <div className="flex justify-end border-t gap-2 p-4">
          <TextButton
            title="Cancel"
            textColor="text-textBlack"
            backgroundColor="bg-white"
            onClick={closeSecurityModal}
            width="max-w-[114px] w-full"
            borderColor="border border-primary50"
            className={"py-2 px-4 gap-4 rounded-[10px]"}
          />
          <Button
            title="Change"
            width="max-w-[114px] w-full"
            className={"py-2 px-4 gap-4 rounded-[10px] bg-primary text-white"}
            onClick={closeModal}
          />
        </div>
      </Modal>
    </>
  );
}
