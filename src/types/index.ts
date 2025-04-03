
export interface RequestData {
  timestamp: Date;
  ip: string;
  endpoint: string;
  method: string;
  count: number;
  blocked?: boolean;
}

export interface BlockedIP {
  ip: string;
  reason: string;
  duration: string;
  timestamp: Date;
}
