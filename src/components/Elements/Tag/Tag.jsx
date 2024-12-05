import React from "react";

export default function Tag({ status, text, width, height, className }) {
  return (
    <div
      className={`${className} h-7 px-3 py-1 rounded-full ${width || "w-24"} ${
        height || ""
      } text-center content-center text-xs font-medium ${
        status === "success"
          ? "bg-green50 text-green500"
          : status === "warning"
          ? "bg-warning50 text-warningText"
          : status === "danger"
          ? "bg-warning50 text-alert500"
          : "bg-gray-100 text-gray-600"
      }`}
    >
      {text}
    </div>
  );
}