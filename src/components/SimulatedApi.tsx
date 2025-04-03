
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { 
  Activity, 
  AlertTriangle, 
  Bot, 
  Zap,
  Shield, 
  Plus
} from "lucide-react";
import { toast } from "sonner";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const SimulatedApi = () => {
  const [requestRate, setRequestRate] = useState(10);
  const [attackType, setAttackType] = useState("normal");
  const [simulationActive, setSimulationActive] = useState(false);
  
  const startSimulation = () => {
    setSimulationActive(true);
    toast.success(`Started API simulation with ${requestRate} req/sec`, {
      description: `Attack type: ${attackType}`
    });
  };
  
  const stopSimulation = () => {
    setSimulationActive(false);
    toast.info("Stopped API simulation");
  };
  
  const triggerIncident = (type: string) => {
    const messages = {
      bruteforce: "Simulated brute-force attack triggered against /api/login endpoint",
      ddos: "Simulated DDoS attack launched from multiple IPs",
      bot: "Simulated bot attack with rotating IPs but same fingerprint",
      inject: "Simulated SQL Injection attack against /api/data endpoint"
    };
    
    toast.warning(`Incident triggered: ${messages[type as keyof typeof messages]}`, {
      duration: 5000
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold mb-2">API Simulator</h2>
        <p className="text-gray-400">
          Generate simulated API traffic to test the security system
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="mr-2 h-5 w-5 text-blue-500" />
              Traffic Simulation
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <Label>Request Rate (req/sec)</Label>
                  <span className="font-mono bg-gray-700 px-2 rounded text-blue-400">
                    {requestRate}
                  </span>
                </div>
                <Slider
                  value={[requestRate]}
                  min={1}
                  max={100}
                  step={1}
                  onValueChange={(value) => setRequestRate(value[0])}
                />
              </div>
              
              <div className="space-y-3">
                <Label>Traffic Pattern</Label>
                <RadioGroup 
                  value={attackType} 
                  onValueChange={setAttackType}
                  className="space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="normal" id="normal" />
                    <Label htmlFor="normal">Normal Traffic</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="spiky" id="spiky" />
                    <Label htmlFor="spiky">Spiky Traffic</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="distributed" id="distributed" />
                    <Label htmlFor="distributed">Distributed (multiple IPs)</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div className="flex items-center space-x-2 pt-2">
                <Switch
                  id="includeFailures"
                  defaultChecked={true}
                />
                <Label htmlFor="includeFailures">Include Random Failures</Label>
              </div>
            </div>
            
            <Separator className="bg-gray-700" />
            
            <div className="pt-2">
              {!simulationActive ? (
                <Button 
                  className="w-full" 
                  onClick={startSimulation}
                >
                  Start Simulation
                </Button>
              ) : (
                <Button 
                  className="w-full" 
                  variant="destructive" 
                  onClick={stopSimulation}
                >
                  Stop Simulation
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertTriangle className="mr-2 h-5 w-5 text-yellow-500" />
              Trigger Security Incidents
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-gray-400">
                Simulate specific security incidents to test detection and mitigation
              </p>
              
              <div className="grid grid-cols-1 gap-3">
                <Button 
                  variant="outline" 
                  className="justify-start border-gray-700 hover:bg-gray-700"
                  onClick={() => triggerIncident("bruteforce")}
                >
                  <Shield className="mr-2 h-5 w-5 text-red-500" />
                  Brute Force Attack
                </Button>
                
                <Button 
                  variant="outline" 
                  className="justify-start border-gray-700 hover:bg-gray-700"
                  onClick={() => triggerIncident("ddos")}
                >
                  <Zap className="mr-2 h-5 w-5 text-orange-500" />
                  DDoS Attack
                </Button>
                
                <Button 
                  variant="outline" 
                  className="justify-start border-gray-700 hover:bg-gray-700"
                  onClick={() => triggerIncident("bot")}
                >
                  <Bot className="mr-2 h-5 w-5 text-purple-500" />
                  Bot Attack (Fingerprinting)
                </Button>
                
                <Button 
                  variant="outline" 
                  className="justify-start border-gray-700 hover:bg-gray-700"
                  onClick={() => triggerIncident("inject")}
                >
                  <Plus className="mr-2 h-5 w-5 text-cyan-500" />
                  SQL Injection Attempts
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SimulatedApi;
