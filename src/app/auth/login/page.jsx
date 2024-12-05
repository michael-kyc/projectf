"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import useApi from "@/hooks/useApi";
import Overlay from "@/components/Elements/Overlay/Overlay";
import AuthHeader from "@/components/sign-up/AuthHeader";
import SignInComponent from "@/components/sign-in/SignIn";
import EnterCodeComponent from "@/components/sign-in/EnterCode";
import { useUser } from "@/app/context/UserContext";
import { useAuth } from "@/app/context/AuthContext";
import Cookies from "js-cookie";
import BackArrow from "@/Icons/iconsComponent/BackArrow";
import Mainlogo from "@/Icons/imageicon/Mainlogo";

export default function SignInPage() {
  const params = useParams();
  const id = params?.id;
  const router = useRouter();
  const { fetchData, loading, error } = useApi();
  const [companyId, setCompanyId] = useState(id);
  const [loginData, setLoginData] = useState();
  const [otpData, setOTPData] = useState();
  const [company, setCompany] = useState(null);
  const [otpVerification, setOtpVerification] = useState(false);
  const { login } = useAuth();
  const { fetchUser } = useUser(); 

  useEffect(() => {
    async function checkCompany() {
      const { result, error } = await fetchData(`/company/check/${companyId}`, {
        method: "GET",
      });
      if (error) {
        setCompany(null);
      } else {
        setCompany(result);
      }
    }
    if(companyId){
      companyId.trim() != "" && checkCompany();
    }
    else{
      Cookies.set("companyId", "", { expires: 7 });
    }
  }, [companyId]);

  const handleLogin = async (sentData) => {
    setLoginData(sentData);
    setOtpVerification(true);
  };

  const handleOTP = async (sentData) => {
    const { result, error } = await fetchData("/auth/login", {
      method: "POST",
      body: { ...loginData, token: sentData.code },
    });

    if (error) {
      setCodeValidation(false);
    } else {
      handleSuccess();
    }
    setOTPData(sentData);
  };

  const handlePrevious = () => {
    setOtpVerification(false);
  };

  const handleSuccess = async () => {
    login();
    await fetchUser();
    await router.push(`/dashboard/home`);
  };

  return (
    <>
      {!company && companyId && (
        <Overlay message="You are trying to login under a company that does not exist"></Overlay>
      )}
      <div className="grid h-screen grid-cols-3">
        <div className="flex flex-col items-center w-full col-span-3 bg-white lg:col-span-2 px-2">
          <div className="flex flex-col pt-12">
            <div className="mb-20 lg:mb-32">
              <AuthHeader title="Payment Dashboard" />
            </div>
            {otpVerification && (
              <div className="flex items-center gap-2 mb-4">
                <BackArrow></BackArrow>
                <span
                  onClick={handlePrevious}
                  className="text-xs font-normal cursor-pointer text-textBlack"
                >
                  Back
                </span>
              </div>
            )}
            {!otpVerification && (
              <SignInComponent onSubmit={handleLogin} companyId={companyId} />
            )}
            {otpVerification && <EnterCodeComponent onSubmit={handleOTP} />}
          </div>
          <div className="mt-6 lg:mt-12 text-xs font-normal text-center text-textSecondary">
            {"Don't have an account? "}
            <button
              onClick={() => router.push(`/auth/register/${companyId || ''}`)}
              className="font-semibold cursor-pointer text-textBlack"
            >
              Sign up
            </button>
          </div>
        </div>
        <div className="relative hidden w-full lg:col-span-1 lg:block bg-lightGray"></div>
      </div>
    </>
  );
}
