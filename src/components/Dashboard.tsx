
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RequestsChart from "./charts/RequestsChart";
import BlockedIPsTable from "./tables/BlockedIPsTable";
import RecentActivityLog from "./tables/RecentActivityLog";
import { generateMockData } from "@/lib/mockData";
import { RequestData, BlockedIP } from "@/types";

const Dashboard = () => {
  const [requestData, setRequestData] = useState<RequestData[]>([]);
  const [blockedIPs, setBlockedIPs] = useState<BlockedIP[]>([]);
  const [totalRequests, setTotalRequests] = useState(0);
  const [blockedRequests, setBlockedRequests] = useState(0);
  const [suspiciousActivity, setSuspiciousActivity] = useState(0);

  useEffect(() => {
    // Initialize with mock data
    const { requests, blocked } = generateMockData();
    setRequestData(requests);
    setBlockedIPs(blocked);
    
    // Calculate summary metrics
    setTotalRequests(requests.length);
    setBlockedRequests(blocked.length);
    setSuspiciousActivity(Math.floor(blocked.length * 0.7));
    
    // Update with new data every 5 seconds
    const interval = setInterval(() => {
      const newData = generateMockData(5);
      setRequestData(prev => [...prev, ...newData.requests].slice(-100));
      setBlockedIPs(prev => [...prev, ...newData.blocked].slice(-50));
      setTotalRequests(prev => prev + newData.requests.length);
      setBlockedRequests(prev => prev + newData.blocked.length);
      setSuspiciousActivity(prev => prev + Math.floor(Math.random() * 3));
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">API Security Dashboard</h2>
        <div className="text-sm text-gray-400">
          Last updated: {new Date().toLocaleTimeString()}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-gray-400 text-sm">
              Total Requests
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalRequests.toLocaleString()}</div>
            <div className="text-xs text-green-400 mt-2">
              +{Math.floor(totalRequests * 0.03)} in last hour
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-gray-400 text-sm">
              Blocked Requests
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{blockedRequests.toLocaleString()}</div>
            <div className="text-xs text-red-400 mt-2">
              {Math.floor(blockedRequests / totalRequests * 100)}% of total traffic
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-gray-400 text-sm">
              Suspicious Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{suspiciousActivity.toLocaleString()}</div>
            <div className="text-xs text-yellow-400 mt-2">
              {Math.floor(suspiciousActivity / blockedRequests * 100)}% of blocked requests
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="traffic" className="w-full">
        <TabsList className="bg-gray-800">
          <TabsTrigger value="traffic">Traffic Analysis</TabsTrigger>
          <TabsTrigger value="blocked">Blocked IPs</TabsTrigger>
          <TabsTrigger value="activity">Recent Activity</TabsTrigger>
        </TabsList>
        
        <TabsContent value="traffic" className="mt-4">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle>API Traffic Overview</CardTitle>
            </CardHeader>
            <CardContent className="h-80">
              <RequestsChart data={requestData} />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="blocked" className="mt-4">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle>Recently Blocked IPs</CardTitle>
            </CardHeader>
            <CardContent>
              <BlockedIPsTable data={blockedIPs} />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="activity" className="mt-4">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle>Recent Activity Log</CardTitle>
            </CardHeader>
            <CardContent>
              <RecentActivityLog data={requestData.slice(-20)} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
