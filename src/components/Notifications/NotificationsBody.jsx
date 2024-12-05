import Image from "next/image";
import React from "react";
import NotificationsCard from "./NotificationsCard";
import Avatartype from "@/Icons/iconsComponent/Avatartype";
import History from "@/Icons/iconsComponent/History";
import Fileupload from "@/Icons/iconsComponent/Fileupload";

export default function NotificationsBody() {
  return (
    <div className="px-2 sm:px-[34px] sm:py-4">
      <div className="flex items-center gap-2 mb-2">
        <Image
          width={14}
          height={14}
          alt="arrow back"
          className="cursor-pointer"
          src="/assets/icons/backArrow.svg"
        />
        <p className="text-sm font-semibold cursor-pointer text-textBlack">
          Notifications
        </p>
      </div>
      <div className="w-full p-4 mb-2 bg-white rounded-2xl">
        <h2 className="mb-4 text-xs text-textLight">Today</h2>
        <div className="space-y-4">
          <NotificationsCard
            ImageUrl={<Avatartype className="w-8 h-8" />}
            title={"Pending Approval"}
            subTitle={"A new company registration is awaiting your approval."}
            trailing={"2m"}
          />
          <hr />
          <NotificationsCard
            ImageUrl={<Fileupload className="w-8 h-8" />}
            title={"File uploaded"}
            subTitle={"A new company registration is awaiting your approval."}
            trailing={"14h"}
          />
          <hr />
          <NotificationsCard
            ImageUrl={<History className="w-8 h-8" />}
            title={"Password reset"}
            subTitle={"A new company registration is awaiting your approval."}
            trailing={"14h"}
          />
          <hr />
          <NotificationsCard
            ImageUrl={<History className="w-8 h-8" />}
            title={"Password reset"}
            subTitle={"A new company registration is awaiting your approval."}
            trailing={"14h"}
          />
        </div>
      </div>

      <div className="w-full p-4 bg-white rounded-2xl">
        <h2 className="mb-4 text-xs text-textLight">Yesterday</h2>
        <div className="space-y-4 ">
          <NotificationsCard
            ImageUrl={<Avatartype className="w-8 h-8" />}
            title={"Pending Approval"}
            subTitle={"A new company registration is awaiting your approval."}
            trailing={"2m"}
          />
          <hr />
          <NotificationsCard
            ImageUrl={<Fileupload className="w-8 h-8" />}
            title={"File uploaded"}
            subTitle={"A new company registration is awaiting your approval."}
            trailing={"14h"}
          />
          <hr />
          <NotificationsCard
            ImageUrl={<History className="w-8 h-8" />}
            title={"Password reset"}
            subTitle={"A new company registration is awaiting your approval."}
            trailing={"14h"}
          />
          <hr />
          <NotificationsCard
            ImageUrl={<History className="w-8 h-8" />}
            title={"Password reset"}
            subTitle={"A new company registration is awaiting your approval."}
            trailing={"14h"}
          />
        </div>
      </div>
    </div>
  );
}
