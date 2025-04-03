
import { useState } from "react";
import Dashboard from "@/components/Dashboard";
import Sidebar from "@/components/Sidebar";
import SimulatedApi from "@/components/SimulatedApi";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="flex h-screen bg-gray-900 text-white overflow-hidden">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          {activeTab === "dashboard" && <Dashboard />}
          {activeTab === "simulate" && <SimulatedApi />}
        </div>
      </div>
    </div>
  );
};

export default Index;
