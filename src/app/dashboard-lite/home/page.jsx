"use client"
import React, { useState, useEffect } from "react";
import Container from "@/components/Container/Container";
import useApi from "@/hooks/useApi";
import DashboardCryptoTable from "@/components/Elements/DataTable/home/crypto";
import BalanceCard from "@/components/Elements/Cards/balance";
import CryptoDetailCard from "@/components/Home/DetailCard";
import CryptoSendModal from "@/components/Home/Modals/send";
import CryptoSendConfirmationModal from "@/components/Home/Modals/send-confirmation";
import CryptoReceiveModal from "@/components/Home/Modals/receive";
import CryptoExchangeModal from "@/components/Home/Modals/exchange";
import CryptoExchangeConfirmModal from "@/components/Home/Modals/receive-confirm";
import CryptoExchangeSuccessModal from "@/components/Home/Modals/swapped-confirmation";

const data = [
  {
    asset: "USDT ERC20",
    marketCap: "$717.5B",
    price: "$3,223.97",
    priceChange: "+4.25%",
    balance: "11.1976",
    balanceUSD: "$36,100.85",
    portfolioPercent: "78%",
    valueUSD: "2,223.98 USD"
  },
  {
    asset: "ETH",
    subAsset: "Ethereum",
    price: "$3,223.97",
    priceChange: "+4.25%",
    balance: "11.1976",
    balanceUSD: "$36,100.85",
    portfolioPercent: "78%",
    valueUSD: "2,223.98 USD"
  },
  {
    asset: "ETH",
    subAsset: "Ethereum",
    price: "$3,223.97",
    priceChange: "+4.25%",
    balance: "11.1976",
    balanceUSD: "$36,100.85",
    portfolioPercent: "78%",
    valueUSD: "2,223.98 USD"
  },
  {
    asset: "ETH",
    subAsset: "Ethereum",
    price: "$3,223.97",
    priceChange: "+4.25%",
    balance: "11.1976",
    balanceUSD: "$36,100.85",
    portfolioPercent: "78%",
    valueUSD: "2,223.98 USD"
  },
  {
    asset: "ETH",
    subAsset: "Ethereum",
    price: "$3,223.97",
    priceChange: "+4.25%",
    balance: "11.1976",
    balanceUSD: "$36,100.85",
    portfolioPercent: "78%",
    valueUSD: "2,223.98 USD"
  },
  {
    asset: "ETH",
    subAsset: "Ethereum",
    price: "$3,223.97",
    priceChange: "+4.25%",
    balance: "11.1976",
    balanceUSD: "$36,100.85",
    portfolioPercent: "78%",
    valueUSD: "2,223.98 USD"
  },
  {
    asset: "USDT ERC20",
    marketCap: "$717.5B",
    price: "$3,223.97",
    priceChange: "+4.25%",
    balance: "11.1976",
    balanceUSD: "$36,100.85",
    portfolioPercent: "78%",
    valueUSD: "2,223.98 USD"
  }
]

const cardData = {
  asset: "USDT ERC20",
  icon: "/assets/icons/theter.svg",
  transfers: [
    {
      type: "Transfer",
      from: "1FZQ8a6J4qXv7g9nWw7yY2ZyQ...",
    },
    {
      type: "Transfer",
      from: "1FZQ8a6J4qXv7g9nWw7yY2ZyQ...",
    },
    {
      type: "Transfer",
      from: "1FZQ8a6J4qXv7g9nWw7yY2ZyQ...",
    },
    {
      type: "Transfer",
      from: "1FZQ8a6J4qXv7g9nWw7yY2ZyQ...",
    },
  ],
};

export default function HomePage() {
  const { fetchData, loading, error } = useApi();
  const [companies, setCompanies] = useState(null);
  const [isOpenSendModal, setOpenSendModal] = useState(false)
  const [detailSideCard, setDetailSideCard] = useState(false)
  const [isOpenReceiveModal, setOpenReceiveModal] = useState(false)
  const [isOpenExchangeModal, setOpenExchangeModal] = useState(false)
  const [isOpenConfirmationModal, setOpenConfirmationModal] = useState(false)
  const [isOpenSwappedConfirmModal, setOpenSwappedConfirmModal] = useState(false)
  const [isOpenExchangeConfirmModal, setOpenExchangeConfirmModal] = useState(false)

  const handleOpenSendModal = () => setOpenSendModal(true)
  const handleCloseSendModal = () => setOpenSendModal(false)
  const handleOpenReceiveModal = () => setOpenReceiveModal(true)
  const handleCloseReceiveModal = () => setOpenReceiveModal(false)
  const handleOpenExchangeModal = () => setOpenExchangeModal(true)
  const handleCloseExchangeModal = () => setOpenExchangeModal(false)
  const handleOpenConfirmationModal = () => setOpenConfirmationModal(true)
  const handleCloseConfirmationModal = () => setOpenConfirmationModal(false)
  const handleOpenSwappedConfirmModal = () => setOpenSwappedConfirmModal(true)
  const handleCloseSwappedConfirmModal = () => setOpenSwappedConfirmModal(false)
  const handleOpenExchangeConfirmModal = () => setOpenConfirmationModal(true)
  const handleCloseExchangeConfirmModal = () => setOpenConfirmationModal(false)

  useEffect(() => {
    async function listCompanies() {
      const { result, error } = await fetchData(
        `/company/all`,
        {
          method: "GET",
        }
      );
      if (error) {
        setCompanies([]);
      } else {
        setCompanies(result);
      }
    }

    listCompanies();
  }, [])

  return (
    <Container pageName={"Dashboard"}>
      <div className="flex flex-col gap-2">
        <BalanceCard
          handleOpenConfirmationModal={handleOpenConfirmationModal}
        />
        <div className="grid grid-cols-12 gap-2">
          <div
            className={`${
              detailSideCard
                ? "hidden lg:block col-span-7 2xl:col-span-9"
                : "col-span-12"
            }`}
          >
            <DashboardCryptoTable
              data={data}
              title="Crypto"
              isAddBtnVisible={false}
              setDetailSideCard={setDetailSideCard}
            />
          </div>
          <div
            className={`col-span-12 lg:col-span-5 2xl:col-span-3 ${
              !detailSideCard && "hidden"
            }`}
          >
            <CryptoDetailCard
              data={cardData}
              setDetailSideCard={setDetailSideCard}
              handleOpenSendModal={handleOpenSendModal}
              onReceiveClick={handleOpenReceiveModal}
              onExchangeClick={handleOpenExchangeModal}
            />
          </div>
        </div>
      </div>

      <CryptoSendModal
        title="Send USDT"
        isModalOpen={isOpenSendModal}
        onCloseModal={handleCloseSendModal}
        handleOpenConfirmationModal={handleOpenConfirmationModal}
      />

      <CryptoSendConfirmationModal
        title="Send USDT"
        isModalOpen={isOpenConfirmationModal}
        onCloseModal={handleCloseConfirmationModal}
      />

      <CryptoReceiveModal
        title="Receive"
        isModalOpen={isOpenReceiveModal}
        onCloseModal={handleCloseReceiveModal}
        onContinueClick={handleOpenExchangeModal}
      />

      <CryptoExchangeModal
        title="Exchange"
        isModalOpen={isOpenExchangeModal}
        onCloseModal={handleCloseExchangeModal}
      />

      <CryptoExchangeConfirmModal
        title="Exchange BTC to USDT"
        isModalOpen={isOpenExchangeConfirmModal}
        onCloseModal={handleCloseExchangeConfirmModal}
      />

      <CryptoExchangeSuccessModal
        title="Exchange BTC to USDT"
        isModalOpen={isOpenSwappedConfirmModal}
        onCloseModal={handleCloseSwappedConfirmModal}
      />
    </Container>
  );
}
