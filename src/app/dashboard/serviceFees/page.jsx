// Import necessary modules
"use client";
import {React , useState} from "react";
import NavBar from "@/components/NavBar/NavBar";
import DashboardCards from "@/components/Transactions/DashboardCards";
import TopBar from "@/components/Team/TopBar/TopBar";
import ServiceFeeTable from "@/components/ServiceFee/ServiceFeeTable";
import AddSchemaModal from "@/components/ServiceFee/AddSchemaModal/AddSchemaModal";

// This is the core AnalyticsPage component
function ServiceFeePage() {

const [isModalOpen , setModalOpen]  = useState(false);
    const handleAddSchema =()=>{
        setModalOpen(true);
    }
    return (
        <NavBar pageName={"Service Fee"}>
            <div className="flex flex-col space-y-4">
                <TopBar />
                <DashboardCards />
                <ServiceFeeTable AddSchema={handleAddSchema} />
                <AddSchemaModal isOpen={isModalOpen} onClose={()=>setModalOpen(false)}/>
            </div>
        </NavBar>
    );
}

export default ServiceFeePage
