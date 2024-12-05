"use client";

import { EnterCodeComponent } from "@/components/sign-in/EnterCode";
import Image from "next/image";

export default function EnterCodePage() {
  return (
    <div className="flex h-screen">
      <div className="flex flex-col justify-center w-full py-20 px-5 bg-white lg:w-1/2">
        <EnterCodeComponent />
      </div>

      <div className="relative hidden w-1/2 lg:block">
        <Image
          src={"/assets/images/signUp.jpg"}
          fill
          style={{ objectFit: "cover" }}
          alt="City view"
        />
      </div>
    </div>
  );
}
