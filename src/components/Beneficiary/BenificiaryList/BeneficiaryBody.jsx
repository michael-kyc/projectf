"use client"
import { useState } from "react"
import useIsMobile from "@/hooks/useIsMobile"
import Modal from "@/components/Elements/Modal/Modal"
import { TextButton } from "../../Elements/Button/Button"
import AllBenificieariesList from "./AllBenificieariesList"
import AddBenificiaryContent from "./AddBenificiaryContent"
import SearchBar from "@/components/Elements/search/SearchBar"
import RecentBenificiariesList from "./RecentBenificiariesList"

const BeneficiaryBody = () => {
  const isMobile = useIsMobile()
  const [isAddBenificiaryModalOpen, setisAddBenificiaryModalOpen] = useState(false)
  

  return (
    <>
      <div className="flex flex-col gap-2 w-full h-max pt-4">
        {/* search bar card */}
        <div className="p-4 h-auto w-full flex flex-row items-center gap-2 bg-white shadow-sm rounded-2xl overflow-hidden border-[1px] border-primary50">
          <SearchBar className="w-full" inputClassName="w-full" />
          <TextButton
            title="Add Beneficiary"
            width="max-w-[123px] w-full"
            className="bg-black text-white text-nowrap"
            onClick={() => setisAddBenificiaryModalOpen(true)}
          />
        </div>
        {/* recent beneficiaries section */}
        <div className=" h-max w-full flex flex-col items-center gap-2 bg-white shadow-sm rounded-2xl overflow-hidden border border-primary50">
          {/* Top heading div */}
          <div
            className={`flex items-center justify-between  border-b bg-grey50 rounded-t-2xl p-4 w-full h-max`}
          >
            <h2 className="text-xs font-bold leading-[20px] tracking-[-0.005em] text-textBlack text-left truncate">
              Recent
            </h2>
          </div>
          {/* Recent beneficiaries */}
          <RecentBenificiariesList />
        </div>

        {/* All benificiaries section */}
        <div className=" h-max w-full flex flex-col items-center gap-2 bg-white shadow-sm rounded-2xl overflow-hidden border border-primary50">
          {/* Top heading div */}
          <div
            className={`flex items-center justify-between  border-b bg-grey50 rounded-t-2xl p-4 w-full h-max`}
          >
            <h2 className="pr-2 text-xs font-bold leading-[20px] tracking-[-0.005em] text-textBlack text-left truncate">
              All
            </h2>
          </div>
          {/* Recent benificiaries */}
          <AllBenificieariesList />
        </div>
      </div>

      <Modal
        title="Add Beneficiary"
        size={isMobile ? "md" : "2xl"}
        customWidth="max-w-[96%] sm:max-w-2xl"
        isOpen={isAddBenificiaryModalOpen}
        onClose={() => setisAddBenificiaryModalOpen(false)}
      >
        <div className="flex flex-col items-center justify-between h-max">
          <AddBenificiaryContent
            isFullWidth={true}
            onNext={() => {}}
            onBack={() => {}}
            onAdd={() => {}}
          />
          <div className="flex flex-row items-center justify-end w-full p-2 gap-2 border-t border-primary50">
            <TextButton
              width={'min-w-[114px] w-full'}
              title="Cancel"
              className="bg-white !text-black border border-primary50"
            />
            <TextButton
              width={'min-w-[114px] w-full'}
              title="Add Beneficiary"
              className="bg-black text-white"
            />
          </div>
        </div>
      </Modal>
    </>
  )
}

export default BeneficiaryBody
