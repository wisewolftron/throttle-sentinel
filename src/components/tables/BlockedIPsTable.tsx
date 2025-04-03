import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BlockedIP } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Lock, Unlock } from "lucide-react";

interface BlockedIPsTableProps {
  data: BlockedIP[];
}

const BlockedIPsTable = ({ data }: BlockedIPsTableProps) => {
  // Function to determine badge color based on reason
  const getBadgeVariant = (reason: string) => {
    if (reason.includes("Brute Force")) return "destructive";
    if (reason.includes("Rate Limit")) return "warning";
    if (reason.includes("Suspicious")) return "secondary";
    return "default";
  };

  return (
    <div className="rounded-md overflow-hidden">
      <Table>
        <TableHeader className="bg-gray-800">
          <TableRow>
            <TableHead className="text-gray-400">IP Address</TableHead>
            <TableHead className="text-gray-400">Block Reason</TableHead>
            <TableHead className="text-gray-400">Duration</TableHead>
            <TableHead className="text-gray-400">Blocked At</TableHead>
            <TableHead className="text-gray-400 text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, i) => (
            <TableRow 
              key={i}
              className="border-gray-700 hover:bg-gray-700/50"
            >
              <TableCell className="font-mono">{item.ip}</TableCell>
              <TableCell>
                <Badge variant={getBadgeVariant(item.reason)}>
                  {item.reason}
                </Badge>
              </TableCell>
              <TableCell>{item.duration}</TableCell>
              <TableCell>
                {new Date(item.timestamp).toLocaleTimeString()}
              </TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="icon" title="Unblock IP">
                  <Unlock className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" title="Permanent block">
                  <Lock className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default BlockedIPsTable;
