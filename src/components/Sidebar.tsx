
import { Activity, Shield, Database, Bot, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar = ({ activeTab, setActiveTab }: SidebarProps) => {
  const menuItems = [
    { id: "dashboard", name: "Dashboard", icon: Activity },
    { id: "threats", name: "Threat Detection", icon: Shield },
    { id: "blacklist", name: "Blacklist", icon: Database },
    { id: "fingerprint", name: "Fingerprinting", icon: Bot },
    { id: "settings", name: "Settings", icon: Settings },
    { id: "simulate", name: "API Simulator", icon: Activity },
  ];

  return (
    <div className="w-64 bg-gray-800 p-4 flex flex-col h-full">
      <div className="mb-8">
        <h1 className="text-xl font-bold text-white">
          <Shield className="inline-block mr-2 h-6 w-6 text-blue-500" />
          ThrottleSentinel
        </h1>
      </div>
      <nav className="space-y-2 flex-1">
        {menuItems.map((item) => (
          <Button
            key={item.id}
            variant="ghost"
            className={cn(
              "w-full justify-start text-left p-3 rounded",
              activeTab === item.id
                ? "bg-gray-700 text-blue-400"
                : "text-gray-400 hover:text-white hover:bg-gray-700"
            )}
            onClick={() => setActiveTab(item.id)}
          >
            <item.icon className="mr-2 h-5 w-5" />
            {item.name}
          </Button>
        ))}
      </nav>
      <div className="mt-auto pt-4 border-t border-gray-700">
        <div className="text-xs text-gray-500">
          Throttle Sentinel v1.0
          <br />
          © 2023 API Security
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
