
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
  return (
    <div className="rounded-md overflow-hidden">
      <Table>
        <TableHeader className="bg-gray-800">
          <TableRow>
            <TableHead className="text-gray-400">Timestamp</TableHead>
            <TableHead className="text-gray-400">IP Address</TableHead>
            <TableHead className="text-gray-400">Endpoint</TableHead>
            <TableHead className="text-gray-400">Method</TableHead>
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
                <Badge 
                  variant={item.blocked ? "destructive" : "success"}
                >
                  {item.blocked ? "BLOCKED" : "SUCCESS"}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default RecentActivityLog;
