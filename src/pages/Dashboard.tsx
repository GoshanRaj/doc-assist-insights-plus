
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PatientDashboard from "@/components/PatientDashboard";
import DoctorDashboard from "@/components/DoctorDashboard";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Dashboard = () => {
  const [userType, setUserType] = useState<"patient" | "doctor">("patient");

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-8">
        <div className="container">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <Tabs 
              value={userType} 
              onValueChange={(value) => setUserType(value as "patient" | "doctor")}
              className="w-[400px]"
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="patient">Patient View</TabsTrigger>
                <TabsTrigger value="doctor">Doctor View</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          
          {userType === "patient" ? <PatientDashboard /> : <DoctorDashboard />}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
