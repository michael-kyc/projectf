import React from "react";

export default function DateTime({ date, time }) {

  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });

  const formattedTime = new Date(date).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return (
    <span>
      {formattedDate} {(time) && formattedTime}
    </span>
  );
}
