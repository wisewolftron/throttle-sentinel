
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
import { useState } from "react";
import { toast } from "sonner";

interface BlockedIPsTableProps {
  data: BlockedIP[];
  onUnblock?: (ip: string) => Promise<boolean>;
  onPermanentBlock?: (ip: string) => Promise<boolean>;
}

const BlockedIPsTable = ({ 
  data, 
  onUnblock = async () => true, 
  onPermanentBlock = async () => true 
}: BlockedIPsTableProps) => {
  const [loading, setLoading] = useState<string | null>(null);

  // Function to determine badge color based on reason
  const getBadgeVariant = (reason: string) => {
    if (reason.includes("Brute Force")) return "destructive";
    if (reason.includes("Rate Limit")) return "warning";
    if (reason.includes("Suspicious")) return "secondary";
    return "default";
  };

  // Get storage badge
  const getStorageBadge = (storage?: string, permanent?: boolean) => {
    if (permanent) return <Badge variant="destructive">Permanent</Badge>;
    if (storage === "mongodb") return <Badge>MongoDB</Badge>;
    if (storage === "redis") return <Badge variant="secondary">Redis</Badge>;
    return <Badge variant="secondary">Temporary</Badge>;
  };

  // Handle unblock IP
  const handleUnblock = async (ip: string) => {
    setLoading(ip);
    try {
      const success = await onUnblock(ip);
      if (success) {
        toast.success(`IP ${ip} has been unblocked`);
      } else {
        toast.error("Failed to unblock IP");
      }
    } catch (error) {
      toast.error("An error occurred while unblocking IP");
      console.error(error);
    } finally {
      setLoading(null);
    }
  };

  // Handle permanent block
  const handlePermanentBlock = async (ip: string) => {
    setLoading(ip);
    try {
      const success = await onPermanentBlock(ip);
      if (success) {
        toast.success(`IP ${ip} has been permanently blocked`);
      } else {
        toast.error("Failed to set permanent block");
      }
    } catch (error) {
      toast.error("An error occurred while setting permanent block");
      console.error(error);
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="rounded-md overflow-hidden">
      <Table>
        <TableHeader className="bg-gray-800">
          <TableRow>
            <TableHead className="text-gray-400">IP Address</TableHead>
            <TableHead className="text-gray-400">Block Reason</TableHead>
            <TableHead className="text-gray-400">Duration</TableHead>
            <TableHead className="text-gray-400">Storage</TableHead>
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
                {getStorageBadge(item.storage, item.permanent)}
              </TableCell>
              <TableCell>
                {new Date(item.timestamp).toLocaleTimeString()}
              </TableCell>
              <TableCell className="text-right">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  title="Unblock IP"
                  disabled={loading === item.ip}
                  onClick={() => handleUnblock(item.ip)}
                >
                  <Unlock className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  title="Permanent block"
                  disabled={loading === item.ip || item.permanent}
                  onClick={() => handlePermanentBlock(item.ip)}
                >
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
