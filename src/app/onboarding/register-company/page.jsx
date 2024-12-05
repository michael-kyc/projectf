"use client";
import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import useApi from "@/hooks/useApi";
import Country from "@/components/Elements/Country/Country";
import { country as Countries } from "@/data/Country/Country";
import { Toast } from "primereact/toast";

const formDefaultValues = {
  name: "",
  business_email: "",
  business_name: "",
  phone_number: "",
  business_website: "",
  year_of_incorporation: "",
  trading_name: "",
  address_line_one: "",
  address_line_two: "",
  country_of_incorporation: "",
  state: "",
  city: "",
  postal_code: "",
};

const RegisterCompany = () => {
  const router = useRouter();
  const { fetchData, loading, error } = useApi();
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useRef(null);

  const [formData, setFormData] = useState({
    ...formDefaultValues,
  });

  const [validations, setValidations] = useState({
    name: null,
    business_email: null,
    business_name: null,
    phone_number: null,
    business_website: null,
    year_of_incorporation: null,
    trading_name: null,
    address_line_one: null,
    country_of_incorporation: null,
    state: null,
    city: null,
    postal_code: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCountryChange = (value) => {
    setFormData((prev) => ({ ...prev, country_of_incorporation: value }));
    setValidations((prev) => ({ ...prev, country_of_incorporation: true }));
  };

  const validateField = (name, value) => {
    switch (name) {
      case "name":
      case "business_name":
      case "trading_name":
      case "address_line_one":
      case "country_of_incorporation":
      case "state":
      case "city":
        return value.trim() !== "";
      case "business_email":
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      case "phone_number":
        return /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,4}[-\s.]?[0-9]{1,9}$/.test(value);
      case "business_website":
        return /^https?:\/\/\S+$/.test(value);
      case "year_of_incorporation":
        return (
          /^\d{4}$/.test(value) && parseInt(value) <= new Date().getFullYear()
        );
      case "postal_code":
        return /^\d{5}(-\d{4})?$/.test(value);
      default:
        return true;
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setValidations((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const allValid = Object.keys(validations).every((key) =>
      validateField(key, formData[key])
    );

    if (allValid) {
      setIsSubmitting(true);
      try {
        const { result, error } = await fetchData("/company", {
          method: "POST",
          body: formData,
        });

        if (error) {
          //   alert(error);
          toast.current.show({
            severity: "error",
            summary: "Something went wrong ",
            detail: error.message,
          });
        } else {
          //   router.push("/auth/login");
          setFormData({ ...formDefaultValues });
          toast.current.show({
            severity: "success",
            summary: "Success",
            detail: "Company succcessfully created",
          });
        }
      } catch (err) {
        console.error("Error during company registration:", err);
      } finally {
        setIsSubmitting(false);
      }
    } else {
      const newValidations = {};
      Object.keys(formData).forEach((key) => {
        newValidations[key] = validateField(key, formData[key]);
      });
      setValidations(newValidations);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <Toast ref={toast} />
      <div className="w-full bg-white p-4 md:p-10 flex flex-col justify-center items-center overflow-y-auto">
        <div className="w-full max-w-md md:max-w-2xl">
          <img
            src="/assets/images/main_logo.png"
            alt="Logo"
            className="w-full max-w-[300px] md:max-w-[384px] mb-6 mx-auto"
          />
          <div className="text-xl md:text-2xl font-bold mb-4 text-center md:text-left">
            Company Registration
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            {Object.keys(formData).map((key) => (
              <div key={key} className="flex flex-col gap-1">
                <label htmlFor={key} className="text-sm font-medium">
                  {key
                    .split("_")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")}
                </label>
                {key === "country_of_incorporation" ? (
                  <Country
                    id="country-selector"
                    open={isOpen}
                    onToggle={() => setIsOpen(!isOpen)}
                    onChange={handleCountryChange}
                    selectedValue={Countries.find(
                      (option) =>
                        option.value === formData.country_of_incorporation
                    )}
                    className={`border ${
                      validations.country_of_incorporation === false
                        ? "border-red-500"
                        : "border-primary50"
                    }`}
                  />
                ) : (
                  <input
                    type={key === "year_of_incorporation" ? "number" : "text"}
                    id={key}
                    name={key}
                    value={formData[key]}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`border p-2 rounded-md w-full ${
                      validations[key] === false
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    required={key !== "address_line_two"}
                  />
                )}
                {validations[key] === false && (
                  <span className="text-red-500 text-xs">
                    {`Please enter a valid ${key.split("_").join(" ")}`}
                  </span>
                )}
              </div>
            ))}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full bg-primary text-white py-2 rounded-md hover:bg-primary-dark transition duration-300 flex items-center justify-center ${
                isSubmitting ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Registering...
                </>
              ) : (
                "Register Company"
              )}
            </button>
          </form>
        </div>
      </div>
      <div className="w-full bg-coresalem text-white hidden md:flex items-center justify-center bg-cover bg-center bg-no-repeat relative">
        <img
          src="/assets/images/login_right.png"
          alt="Background Frame"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default RegisterCompany;
