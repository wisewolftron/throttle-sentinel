
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { RequestData } from "@/types";
import { Badge } from "@/components/ui/badge";

interface RecentActivityLogProps {
  data: RequestData[];
}

const RecentActivityLog = ({ data }: RecentActivityLogProps) => {
  // Function to determine status badge
  const getStatusBadge = (item: RequestData) => {
    if (item.blocked) {
      return <Badge variant="destructive">BLOCKED</Badge>;
    }
    
    if (item.status) {
      if (item.status >= 500) {
        return <Badge variant="destructive">{item.status}</Badge>;
      }
      if (item.status >= 400) {
        return <Badge variant="warning">{item.status}</Badge>;
      }
      if (item.status >= 300) {
        return <Badge variant="secondary">{item.status}</Badge>;
      }
      return <Badge variant="success">{item.status}</Badge>;
    }

    return <Badge variant="success">SUCCESS</Badge>;
  };

  return (
    <div className="rounded-md overflow-hidden">
      <Table>
        <TableHeader className="bg-gray-800">
          <TableRow>
            <TableHead className="text-gray-400">Timestamp</TableHead>
            <TableHead className="text-gray-400">IP Address</TableHead>
            <TableHead className="text-gray-400">Endpoint</TableHead>
            <TableHead className="text-gray-400">Method</TableHead>
            <TableHead className="text-gray-400">Response Time</TableHead>
            <TableHead className="text-gray-400">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, i) => (
            <TableRow 
              key={i}
              className="border-gray-700 hover:bg-gray-700/50"
            >
              <TableCell className="text-sm">
                {new Date(item.timestamp).toLocaleTimeString()}
              </TableCell>
              <TableCell className="font-mono">{item.ip}</TableCell>
              <TableCell>{item.endpoint}</TableCell>
              <TableCell>{item.method}</TableCell>
              <TableCell>
                {item.responseTime ? `${item.responseTime}ms` : "-"}
              </TableCell>
              <TableCell>
                {getStatusBadge(item)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default RecentActivityLog;
