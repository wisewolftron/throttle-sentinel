
import { RequestData, BlockedIP } from "@/types";

// Random IP generator
const generateRandomIP = () => {
  return `${Math.floor(Math.random() * 255)}.${Math.floor(
    Math.random() * 255
  )}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
};

// Random endpoint generator
const endpoints = [
  "/api/users",
  "/api/products", 
  "/api/orders",
  "/api/auth/login",
  "/api/search",
  "/api/profile",
  "/api/settings",
  "/api/data"
];

const methods = ["GET", "POST", "PUT", "DELETE"];

const blockReasons = [
  "Rate Limit Exceeded",
  "Brute Force Attack",
  "Suspicious Activity",
  "IP Blacklisted",
  "Bot Detection"
];

const blockDurations = [
  "15 minutes",
  "1 hour",
  "24 hours",
  "7 days",
  "Permanent"
];

export const generateMockData = (count = 20) => {
  const requests: RequestData[] = [];
  const blocked: BlockedIP[] = [];
  
  // Generate request data
  for (let i = 0; i < count; i++) {
    const timestamp = new Date(Date.now() - Math.random() * 3600000);
    const ip = generateRandomIP();
    const endpoint = endpoints[Math.floor(Math.random() * endpoints.length)];
    const method = methods[Math.floor(Math.random() * methods.length)];
    const isBlocked = Math.random() < 0.2; // 20% chance of being blocked
    
    requests.push({
      timestamp,
      ip,
      endpoint,
      method,
      count: Math.floor(Math.random() * 30) + 1,
      blocked: isBlocked
    });
    
    // If request is blocked, add to blocked list
    if (isBlocked) {
      blocked.push({
        ip,
        reason: blockReasons[Math.floor(Math.random() * blockReasons.length)],
        duration: blockDurations[Math.floor(Math.random() * blockDurations.length)],
        timestamp
      });
    }
  }
  
  return { requests, blocked };
};
