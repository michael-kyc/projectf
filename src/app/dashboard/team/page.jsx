// Import necessary modules
"use client";
import { React, Suspense, useEffect, useRef, useState } from "react";
import Container from "@/components/Container/Container";
import DashboardCards from "@/components/Transactions/DashboardCards";
import TopBar from "@/components/Team/TopBar/TopBar";
import TeamTable from "@/components/Team/TeamTable/TeamTable";
import MemberDetails from "@/components/Team/MemberDetails/MemberDetails";
import EditAddMember from "@/components/Team/EditAddMember/EditAddMember";
import { useRouter, useSearchParams } from "next/navigation";
import useApi from "@/hooks/useApi";

// This is the core AnalyticsPage component
function TeamsPage() {
  //view edit delete
  const handleOnSelectOption = (option) => setOption(option);
  const handleOnEditOption = () => setOption("Edit");

  const searchParams = useSearchParams();
  const companyId = searchParams.get("companyId");
  const userId = searchParams.get("userId");
  const router = useRouter();

  const initialOption = searchParams.get("option");
  const [option, setOption] = useState(initialOption);
  const [userData, setUserData] = useState();

  const { fetchData, loading, error } = useApi();
  const submitFunctionRef = useRef();

  async function fetchUserData() {
    const { result, error } = await fetchData(`/company-teams/user/${userId}`, {
      method: "GET",
    });
    if (error) {
      setUserData(undefined);
    } else {
      setUserData((prevState) => result);
    }
  }

  const goBack = () => router.push(`/dashboard/company/${companyId}?tab=3`);

  useEffect(() => {
    if (["View", "Edit"].includes(option) && userId) fetchUserData();
  }, [initialOption, userId]);

  console.log("user data", userData);
  function calculateAge(birthDate) {
    const today = new Date();
    const birthDateObj = new Date(birthDate);
    let age = today.getFullYear() - birthDateObj.getFullYear();
    const monthDiff = today.getMonth() - birthDateObj.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDateObj.getDate())
    ) {
      age--;
    }

    return age.toString();
  }

  // Helper function to calculate age

  return (
    <Container pageName={"Company Management"}>
      <Suspense>
        <div className="flex flex-col size-full">
          <>
            <TopBar
              option={option}
              onEdit={handleOnEditOption}
              userData={userData}
              onEditSave={() => {
                submitFunctionRef.current.submitFormData();
              }}
              onSave={() => {
                submitFunctionRef.current.submitFormData();
              }}
              fetchUserData={fetchUserData}
              goBack={goBack}
              isAdd={option === "Add"}
            />
            {option === "" && <DashboardCards />}

            {option === "" && (
              <TeamTable
                onSelectOption={handleOnSelectOption}
                addMember={handleOnSelectOption}
              />
            )}

            {option === "View" && <MemberDetails userData={userData} />}

            {option === "Edit" && (
              <EditAddMember
                ref={submitFunctionRef}
                isEdit={true}
                userData={userData}
                company_id={companyId}
              />
            )}

            {option === "Add" && (
              <EditAddMember
                ref={submitFunctionRef}
                isEdit={false}
                company_id={companyId}
              />
            )}
          </>
        </div>
      </Suspense>
    </Container>
  );
}

export default TeamsPage;
