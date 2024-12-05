"use client";
import React, { useEffect, useRef, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import VisibilityOn from "@/Icons/VisibilityOn";
import VisibilityOff from "@/Icons/VisibilityOff";
import useApi from "@/hooks/useApi";
import OTP from "@/components/Elements/OTP/OTP";
import Overlay from "@/components/Elements/Overlay/Overlay";
import AuthInput from "@/components/Elements/Input/AuthInput";
import Button from "@/components/Elements/Button/Button";
import { COMPANY_ACCOUNT_TYPE } from "@/shared/enums";
import Back from "@/Icons/Back";
import Wizard from "@/components/Register/Wizard/Wizard";

export default function RegisterPage() {
  const params = useParams();
  const id = params.id;

  const router = useRouter();
  const { fetchData, loading, error } = useApi();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [companyId, setCompanyId] = useState(id);
  const [companyValidation, setCompanyValidation] = useState(true);
  const [companyDetails, setCompanyDetails] = useState({});
  const [firstNameValidation, setFirstNameValidation] = useState(null);
  const [lastNameValidation, setLastNameValidation] = useState(null);
  const [emailValidation, setEmailValidation] = useState(null);
  const [emailValidationText, setEmailValidationText] = useState("");
  const [passwordValidation, setPasswordValidation] = useState(null);
  const [codeValidation, setCodeValidation] = useState(null);
  const [code, setCode] = useState("");
  const [authenticator, setAuthenticator] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [qrCode, setQrCode] = useState("");
  const [validation, setValidation] = useState(false);
  const [userId, setUserId] = useState("");
  const [authenticatorCode, setAuthenticatorCode] = useState("");
  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  useEffect(() => {
    async function checkCompany(){
      const { result, error } = await fetchData(`/company/check/${companyId}`, {
        method: "GET",
      });
      if (error) {
        setCompanyValidation(false);
      } else {
        setCompanyValidation(true);
        setCompanyDetails(result);
      }
    }
    
    (companyId.trim() != "" ) && checkCompany();
  },[companyId])

  useEffect(() => {
    (firstNameValidation != null || firstName.trim() != "" ) && handleBlurFirstName();
  },[firstName]);

  useEffect(() => {
    (lastNameValidation != null || lastName.trim() != "") &&
      handleBlurLastName();
  }, [lastName]);

  useEffect(() => {
    (emailValidation != null || email.trim() != "") &&
      handleBlurEmail();
  }, [email]);

  useEffect(() => {
    (passwordValidation != null || password.trim() != "") && handleBlurPassword();
  }, [password]);

  useEffect(() => {
    (codeValidation != null || code.trim() != "") &&
      handleBlurCode();
  }, [code]);

  const handleBlurFirstName = () => {
    setFirstNameValidation(firstName.trim() !== "");
  };

  const handleBlurLastName = () => {
    setLastNameValidation(lastName.trim() !== "");
  };

  const handleBlurEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailValidation(email.trim() !== "" && emailRegex.test(email));
    setEmailValidationText("Email is not valid.");
  };

  const handleBlurPassword = () => {
    setPasswordValidation(password.length >= 8);
  };

  const handleBlurCode = () => {
    setCodeValidation(code.length == 6);
  };
  

  const handleClick = async (event) => {
    if (firstNameValidation && lastNameValidation && emailValidation && passwordValidation) {
      event.preventDefault();

      const registerData = {
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: password,
        company_id: id,
      };

      try{
        const {result, error} = await fetchData(`/auth/register`, {
          method: "POST",
          body: registerData,
        });
        
        if(error){
          alert(error);
          if (error.statusCode == 409) {
            setEmailValidation(false);
            setEmailValidationText("This email address already has an account.")
          }
        }
        else{
          setAuthenticator(true);
          setQrCode(result.qrCode);
          setAuthenticatorCode(result.secret);
          setUserId(result.user_id);
        }
      }
      catch(err){
       
      }
    }
  };

  const getCode = (code) => {
    setCode(code.join(""));
  }

  const handleAuthenticator = async (event) => {
    if (codeValidation) {
      event.preventDefault();

      const registerData = {
        user_id: userId,
        company_id: id,
        authenticator_code: code,
      };

      const {result, error} = await fetchData(`/auth/verify_2fa`, {
        method: "POST",
        body: registerData,
      });

      if(error){
        setCodeValidation(false);
      }
      else{
        router.push(`/auth/login/${id}`);
      }   
    } 
  };

  return (
    <>
      {!companyValidation && (
        <Overlay message="You are trying to register under a company that does not exist or is currently not accepting a registration"></Overlay>
      )}
      {(companyDetails.company_account_type == COMPANY_ACCOUNT_TYPE.HOLDING ||
        companyDetails.company_account_type ==
          COMPANY_ACCOUNT_TYPE.BANKING) && (
        <div className="flex h-screen">
          <div className="w-full bg-white p-10 flex flex-col justify-center items-center">
            <div className="max-w-96">
              <img
                src="/assets/images/main_logo.png"
                alt="Logo"
                className="w-96 mb-6"
              />
              {!authenticator ? (
                <div className="flex flex-col items-center gap-2">
                  <div className="flex flex-col gap-4">
                    <div className="items-center">
                      <div className="text-2xl font-bold">Welcome </div>
                      <div className="flex flex-row justify-start">
                        <h2 className="text-md text-base text-textSecondary">
                          We&apos;re glad to see you. Please enter your register
                          your email address.
                        </h2>
                      </div>
                    </div>
                    <div className="flex flex-col justify-between gap-1">
                      <p>First Name*</p>
                      <input
                        type="text"
                        required
                        value={firstName}
                        onChange={(e) => {
                          setFirstName(e.target.value);
                        }}
                        placeholder="First Name"
                        onBlur={handleBlurFirstName}
                        className={`border  p-3 rounded-2xl w-full ${
                          firstNameValidation === false
                            ? "border-red-500"
                            : "border-gray-300"
                        }  `}
                      />
                      <span
                        className={`text-red-500 text-sm ${
                          firstNameValidation === false ? "flex" : "hidden"
                        }`}
                      >
                        First Name is required.
                      </span>
                    </div>
                    <div className="flex flex-col justify-between gap-1">
                      <p>Last Name*</p>
                      <input
                        type="text"
                        required
                        value={lastName}
                        onChange={(e) => {
                          setLastName(e.target.value);
                        }}
                        placeholder="Last Name"
                        onBlur={handleBlurLastName}
                        className={`border  p-3 rounded-2xl w-full ${
                          lastNameValidation === false
                            ? "border-red-500"
                            : "border-gray-300"
                        }  `}
                      />
                      <span
                        className={`text-red-500 text-sm ${
                          lastNameValidation === false ? "flex" : "hidden"
                        }`}
                      >
                        Last Name is required.
                      </span>
                    </div>
                    <div className="flex flex-col justify-between gap-1">
                      <p>Email address*</p>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                        onBlur={handleBlurEmail}
                        placeholder="Email Address"
                        className={`border  p-3 rounded-2xl w-full ${
                          emailValidation === false
                            ? "border-red-500"
                            : "border-gray-300"
                        }  `}
                      />
                      <span
                        className={`text-red-500 text-sm ${
                          emailValidation === false ? "flex" : "hidden"
                        }`}
                      >
                        {emailValidationText}
                      </span>
                    </div>

                    <div className="flex flex-col  justify-between gap-1">
                      <div className="flex flex-row justify-between">
                        <p>Password*</p>
                      </div>
                      <div className="relative w-full">
                        <input
                          type={showPassword ? "text" : "password"}
                          required
                          value={password}
                          onChange={(e) => {
                            setPassword(e.target.value);
                          }}
                          placeholder="Password"
                          onBlur={handleBlurPassword}
                          className={`border  p-3 rounded-2xl w-full ${
                            passwordValidation === false
                              ? "border-red-500"
                              : "border-gray-300"
                          }  `}
                        />
                        {/* Eye icon to toggle password visibility */}
                        <button
                          type="button"
                          onClick={togglePasswordVisibility}
                          className="absolute right-3 top-3 text-gray-500"
                        >
                          {showPassword ? (
                            <VisibilityOn /> // eye icon (open)
                          ) : (
                            <VisibilityOff /> // eye-off icon (closed)
                          )}
                        </button>
                        <span
                          className={`text-red-500 text-sm ${
                            passwordValidation === false ? "flex" : "hidden"
                          }`}
                        >
                          Password should be min. 8 character
                        </span>
                      </div>
                    </div>
                    <button
                      type="submit"
                      onClick={handleClick}
                      className={` py-3 rounded-2xl w-full ${
                        firstNameValidation &&
                        lastNameValidation &&
                        emailValidation &&
                        passwordValidation
                          ? "bg-primary text-white"
                          : "bg-grey text-primary100"
                      }`}
                    >
                      Sign Up
                    </button>
                    <p className="text-center">
                      Already have an account?{" "}
                      <a href={`/auth/login/${id}`} className="text-blue-500">
                        Login
                      </a>
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2">
                  <div className="flex flex-col gap-4">
                    <div className="items-center">
                      <div className="text-2xl font-bold">
                        Authentication App
                      </div>
                      <div className="flex flex-row justify-start">
                        <h2 className="text-md text-base text-textSecondary">
                          Using an authenticator app like Google Authenticator,
                          Microsoft Authenticator, Authy or iPassword, scan this
                          QR code. It will generate a 6 digit code for you to
                          enter below.
                        </h2>
                      </div>
                    </div>
                    <img src={qrCode} className="w-48 h-48" />
                    <p className="text-md text-base text-textSecondary">
                      If scanning does not work please copy the below code to
                      add it manually to your authenticator app
                    </p>
                    <div className="bg-gray-200 rounded-xl text-center w-full p-4">
                      {authenticatorCode}
                    </div>
                    <div className="flex flex-col justify-between gap-1">
                      <p>Enter Authenticator Code</p>
                      <OTP
                        onChange={getCode}
                        className={
                          codeValidation === false && code.length == 6
                            ? "border-red-500"
                            : "border-gray-300"
                        }
                        validationMessage={
                          codeValidation === false && code.length == 6
                            ? "Invalid authentication code"
                            : ""
                        }
                      ></OTP>
                    </div>

                    <button
                      type="submit"
                      onClick={handleAuthenticator}
                      className={` py-3 rounded-2xl w-full ${
                        codeValidation
                          ? "bg-primary text-white"
                          : "bg-grey text-primary100"
                      }`}
                    >
                      Continue
                    </button>
                    <p className="text-center">
                      Already have an account?{" "}
                      <a href={`/auth/login/${id}`} className="text-blue-500">
                        Login
                      </a>
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="w-full bg-coresalem text-white hidden items-center justify-center bg-cover bg-center bg-no-repeat relative md:flex">
            <img
              src="/assets/images/login_right.png"
              alt="Background Frame"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )}

      {companyDetails.company_account_type == COMPANY_ACCOUNT_TYPE.WEB3 && (
        <div className="flex h-screen">
          <div className="w-full bg-white p-10 flex flex-col items-center px-4 ">
            <div className="max-w-96 mb-20">
              <img
                src="/assets/images/main_logo.png"
                alt="Logo"
                className="w-96 mb-6"
              />
            </div>
            <div>
              {/* <Wizard></Wizard> */}
              {!authenticator ? (
                <div className="flex flex-col items-center gap-2">
                  <div className="flex flex-col gap-4">
                    <div className="items-center">
                      <div>
                        <h2 className="text-base font-semibold text-textBlack mb-2">
                          Welcome
                        </h2>
                        <p className="font-normal text-xs text-textSecondary">
                          We&apos;re glad to see you. Please enter your register
                          your email address.
                        </p>
                      </div>
                    </div>
                    <div className="mt-6 mb-6">
                      <div className="flex flex-col justify-between mt-4">
                        <AuthInput
                          type="text"
                          value={firstName}
                          label="First Name*"
                          onChange={(e) => {
                            setFirstName(e.target.value);
                          }}
                          onBlur={handleBlurFirstName}
                          placeholder="First Name"
                          className={`border  p-3 rounded-2xl w-full ${
                            firstNameValidation === false
                              ? "border-red-500"
                              : "border-gray-300"
                          }  `}
                        />
                        <span
                          className={`text-red-500 text-sm ${
                            firstNameValidation === false ? "flex" : "hidden"
                          }`}
                        >
                          First Name is required.
                        </span>
                      </div>
                      <div className="flex flex-col justify-between mt-4">
                        <AuthInput
                          type="text"
                          required
                          value={lastName}
                          onChange={(e) => {
                            setLastName(e.target.value);
                          }}
                          label="Last Name*"
                          placeholder="Last Name"
                          onBlur={handleBlurLastName}
                          className={`border  p-3 rounded-2xl w-full ${
                            lastNameValidation === false
                              ? "border-red-500"
                              : "border-gray-300"
                          }  `}
                        />
                        <span
                          className={`text-red-500 text-sm ${
                            lastNameValidation === false ? "flex" : "hidden"
                          }`}
                        >
                          Last Name is required.
                        </span>
                      </div>
                      <div className="flex flex-col justify-between mt-4">
                        <AuthInput
                          type="email"
                          required
                          label="Email*"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                          }}
                          onBlur={handleBlurEmail}
                          placeholder="Email Address"
                          className={`border  p-3 rounded-2xl w-full ${
                            emailValidation === false
                              ? "border-red-500"
                              : "border-gray-300"
                          }  `}
                        />
                        <span
                          className={`text-red-500 text-sm ${
                            emailValidation === false ? "flex" : "hidden"
                          }`}
                        >
                          {emailValidationText}
                        </span>
                      </div>

                      <div className="flex flex-col  justify-between mt-4">
                        <div className="relative w-full">
                          <AuthInput
                            type="password"
                            label="Password*"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onBlur={handleBlurPassword}
                            placeholder="Password"
                            className={`border  p-3 rounded-2xl w-full ${
                              passwordValidation === false
                                ? "border-red-500"
                                : "border-gray-300"
                            }  `}
                          />
                          {/* Eye icon to toggle password visibility */}

                          <span
                            className={`text-red-500 text-sm ${
                              passwordValidation === false ? "flex" : "hidden"
                            }`}
                          >
                            Password should be min. 8 character
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="w-full">
                      <Button
                        title="Sign Up"
                        className={`w-full bg-primary border-none rounded-2xl text-white ${
                          firstNameValidation &&
                          lastNameValidation &&
                          emailValidation &&
                          passwordValidation
                            ? "bg-primary text-white"
                            : "bg-grey text-primary100"
                        }`}
                        onClick={handleClick}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2">
                  <div className="flex flex-col gap-4">
                    <div className="items-center">
                      <div className="text-2xl font-bold">
                        Authentication App
                      </div>
                      <div className="flex flex-row justify-start">
                        <h2 className="text-md text-base text-textSecondary">
                          Using an authenticator app like Google Authenticator,
                          Microsoft Authenticator, Authy or iPassword, scan this
                          QR code. It will generate a 6 digit code for you to
                          enter below.
                        </h2>
                      </div>
                    </div>
                    <img src={qrCode} className="w-48 h-48" />
                    <p className="text-md text-base text-textSecondary">
                      If scanning does not work please copy the below code to
                      add it manually to your authenticator app
                    </p>
                    <div className="bg-gray-200 rounded-xl text-center w-full p-4">
                      {authenticatorCode}
                    </div>
                    <div className="flex flex-col justify-between gap-1">
                      <p>Enter Authenticator Code</p>
                      <OTP
                        onChange={getCode}
                        className={
                          codeValidation === false && code.length == 6
                            ? "border-red-500"
                            : "border-gray-300"
                        }
                        validationMessage={
                          codeValidation === false && code.length == 6
                            ? "Invalid authentication code"
                            : ""
                        }
                      ></OTP>
                    </div>

                    <button
                      type="submit"
                      onClick={handleAuthenticator}
                      className={` py-3 rounded-2xl w-full ${
                        codeValidation
                          ? "bg-primary text-white"
                          : "bg-grey text-primary100"
                      }`}
                    >
                      Continue
                    </button>
                  </div>
                </div>
              )}
              <div className="flex flex-col gap-10 mt-6">
                <p className="mt-10 text-xs text-center font-normal text-textSecondary">
                  {" Already have an account? "}
                  <a href={`/auth/login/${id}`} className="font-bold">
                    Login
                  </a>
                </p>
              </div>
            </div>
          </div>
          <div className="w-full bg-coresalem text-white hidden items-center justify-center bg-cover bg-center bg-no-repeat relative md:flex">
            <img
              src="/assets/images/cityview-black.jpg"
              alt="Background Frame"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )}
    </>
  );
}
