"use client";
import { TextButton } from "@/components/Elements/Button/Button";
import SearchBar from "@/components/Elements/search/SearchBar";
import React, { useState } from "react";
import ContactGroup from "@/components/Contact/ContactGroup";
import NavBar from "@/components/NavBar/NavBar";
import Search from "@/Icons/Search";
import ContactForm from "@/components/Contact/ContactForm";
import { FaPlus } from "react-icons/fa";
import Modal from "@/components/Modal/Modal";
import ContactDetailCard from "@/components/Contact/ContactDetailCard";

const ContactPage = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [formType, setFormType] = useState(null);
  const [selectedContact, setSelectedContact] = useState(null);

  const walletContacts = [
    {
      name: "Alice John",
      spent: "You sent $40",
      avatar: "/avatar1.png",
      username: "@alicejohn",
      day: "Mon",
      verified: true,
    },
    {
      name: "Bob Smith",
      spent: "You sent 216.520249 USDT",
      avatar: "/avatar2.png",
      username: "@bobsmith",
      day: "Mon",
      verified: true,
    },
    {
      name: "Charlie Brown",
      spent: "You sent $40",
      avatar: "/avatar3.png",
      username: "@charliebrown",
      day: "Mon",
    },
  ];

  const otherContacts = [
    { name: "Bahida anush", avatar: "/avatar5.png" },
    { name: "Brian Sadewa", avatar: "/avatar6.png" },
    {
      name: "Charlie Brown",

      avatar: "/avatar3.png",
    },
    { name: "aki Devon", avatar: "/avatar7.png" },
    { name: "aki Devon", avatar: "/avatar7.png" },
    { name: "aki Devon", avatar: "/avatar7.png" },
    { name: "aki Devon", avatar: "/avatar7.png" },
  ];

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => {
    setModalOpen(false);
    setFormType(null);
  };

  const handleContactClick = (contact) => {
    setSelectedContact(contact);
  };

  return (
    <NavBar pageName={"Contacts"}>
      <div className="min-h-screen p-4 bg-gray-50">
        <div className="flex flex-col items-center justify-between gap-2 p-4 mb-4 bg-white border md:gap-2 md:flex-row rounded-xl border-primary50">
          <SearchBar
            height="h-10"
            className="w-full"
            placeholder="Name, email, phone"
          />
          <TextButton
            className="md:w-[160px] rounded-lg w-full"
            title="Add Beneficiary"
            onClick={handleOpenModal}
          />
        </div>

        <div className="grid min-h-screen grid-cols-12 gap-2">
          <div
            className={`w-full ${
              selectedContact
                ? "hidden lg:block col-span-7 2xl:col-span-9"
                : "col-span-12"
            }`}
          >
            <ContactGroup
              title="Recent"
              contacts={walletContacts}
              onContactClick={handleContactClick}
            />
            <ContactGroup
              title="All"
              contacts={otherContacts}
              favIcon={true}
              onContactClick={handleContactClick}
            />
          </div>

          {/* Detail View */}
          {selectedContact && (
            <div
              className={`col-span-12 lg:col-span-5 2xl:col-span-3 ${
                !selectedContact && "hidden"
              }`}
            >
              <ContactDetailCard
                contact={selectedContact}
                onClose={() => setSelectedContact(null)}
              />
            </div>
          )}
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="Add new Contact"
        className="md:w-[500px] w-[93%]"
      >
        {!formType ? (
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              You can add a beneficiary to easily send them assets without a
              fee. Please choose one of the following methods to add a
              beneficiary:
            </p>
            <button
              className="w-full p-4 text-left rounded-2xl bg-[#fbfbfb] border border-primary50 shadow"
              onClick={() => setFormType("username")}
            >
              <strong className="text-sm text-textBlack">
                By username, email or mobile
              </strong>
              <p className="mt-2 text-xs text-gray-500">
                Enter the username of your friend or beneficiary for internal
                transactions in the app.
              </p>
            </button>

            <button
              className="w-full  p-4 text-left rounded-2xl bg-[#fbfbfb] border border-primary50 shadow"
              onClick={() => setFormType("wallet")}
            >
              <strong className="text-sm text-textBlack">
                By wallet address
              </strong>
              <p className="mt-2 text-xs text-gray-500">
                Enter the external wallet address of your friend or beneficiary
                and select the type of wallet (Ethereum, Bitcoin, etc.).
              </p>
            </button>

            <div className="flex justify-end gap-2 pt-4 pb-2 border-t">
              <button
                className="px-6 py-2.5 w-[114px] text-sm text-textBlack border border-primary50 rounded-xl"
                onClick={handleCloseModal}
              >
                Cancel
              </button>

              <button
                className="px-6 py-2.5 w-[114px] text-sm text-white bg-black rounded-xl"
                onClick={handleCloseModal}
              >
                Continue
              </button>
            </div>
          </div>
        ) : (
          <ContactForm
            formType={formType}
            onCancel={handleCloseModal}
            onAdd={() => alert("Contact added successfully")}
          />
        )}
      </Modal>
    </NavBar>
  );
};

export default ContactPage;
