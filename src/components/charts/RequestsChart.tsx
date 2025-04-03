
import { Line, Bar } from "recharts";
import { RequestData } from "@/types";
import {
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  ComposedChart,
} from "recharts";

interface RequestsChartProps {
  data: RequestData[];
}

const RequestsChart = ({ data }: RequestsChartProps) => {
  // Group data by time intervals for charting
  const chartData = data.slice(-50).map((item, index) => {
    return {
      name: new Date(item.timestamp).toLocaleTimeString(),
      requests: item.count,
      blocked: item.blocked || 0,
    };
  });

  return (
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart
        data={chartData}
        margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#444" />
        <XAxis 
          dataKey="name" 
          stroke="#888" 
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis 
          stroke="#888" 
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <Tooltip 
          contentStyle={{ 
            backgroundColor: "#333", 
            border: "1px solid #555",
            borderRadius: "4px" 
          }} 
        />
        <Legend />
        <Line
          type="monotone"
          dataKey="requests"
          stroke="#3b82f6"
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 6 }}
        />
        <Bar 
          dataKey="blocked" 
          fill="#ef4444" 
          radius={[4, 4, 0, 0]} 
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default RequestsChart;
