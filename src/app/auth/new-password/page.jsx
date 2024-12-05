"use client";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import VisibilityOn from "@/Icons/VisibilityOn";
import VisibilityOff from "@/Icons/VisibilityOff";
import Mainlogo from "@/Icons/imageicon/Mainlogo";


export default function LoginPage() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/dashboard/home"); // Change to your target route
  };

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setConfirmShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };
  const toggleConfirmPasswordVisibility = () => {
    setConfirmShowPassword((prevState) => !prevState);
  };
  return (
    <>
      <div className="min-h-screen flex">
        <div className="w-full bg-white p-10 flex flex-col justify-center items-center">
          <div className="w-2/4">
            <Mainlogo className="w-96 mb-6" />
            <br></br>
            <div className="">
              <div className="items-center">
                <div className="text-2xl font-bold">
                  Reset your password
                </div>
                <div className="flex flex-row justify-start">
                  <h2 className="text-md text-base text-textSecondary">Please enter your new password to reset your account.</h2>
                </div>
              </div>
              <br></br>
              <p className="pb-2">New Password*</p>
              <div className="relative w-full">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Your new password"
                  className="border border-gray-300 p-3 rounded-2xl w-full pr-10"
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
              </div>
              <p className="pt-4 pb-2">Confirm  new password*</p>
              <div className="relative w-full">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Re-type your password"
                  className="border border-gray-300 p-3 rounded-2xl w-full pr-10"
                />
                {/* Eye icon to toggle password visibility */}
                <button
                  type="button"
                  onClick={toggleConfirmPasswordVisibility}
                  className="absolute right-3 top-3 text-gray-500"
                >
                  {showConfirmPassword ? (
                    <VisibilityOn /> // eye icon (open)
                  ) : (
                    <VisibilityOff /> // eye-off icon (closed)
                  )}
                </button>
              </div>
              <br></br>
              <br></br>
              <button
                type="submit"
                onClick={handleClick}
                className="bg-grey text-primary100 py-3 rounded-2xl w-full"
              >
                Sign in
              </button>
            </div>
            <p className="text-center mt-6">
              Don&apos;t have an account?{" "}
              <a href="#" className="text-blue-500">
                Register
              </a>
            </p>
          </div>
        </div>
        <div className="w-full bg-coresalem text-white flex items-center justify-center bg-cover bg-center bg-no-repeat relative">
        </div>
      </div>
    </>
  );
}
