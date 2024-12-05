import Logo from "@/Icons/iconsComponent/Logo";
import Image from "next/image";

const AuthHeader = ({ title }) => {
  return (
    <div className="flex gap-3 ">
      <Logo className="w-5 h-5 my-auto cursor-pointer" />
      <h1 className="text-xl font-semibold text-textBlack">{title}</h1>
    </div>
  );
};

export default AuthHeader;
