import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { loginUser } from "@/store/action/authentication/login";
import { toast } from "react-toastify";
import { initializeHttpClient } from "@/axios-setup/axios-interceptor";
import { Rocket, User, Mail, Lock } from "lucide-react";
import { DialogTrigger } from "../admin/ui/dialog";

export function UserDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { httpClient } = initializeHttpClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await dispatch(
      loginUser({
        email,
        password,
        api: httpClient,
      })
    ).unwrap();

    if (result) {
      toast.success('Login successful!');
      onOpenChange(false)
      navigate('/');
    } else {
      toast.error('Login failed. Please check your credentials.');
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Registering with", { username, email, password });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}  >
      <div className={`fixed inset-0 flex items-center justify-center min-h-screen ${open ? 'show' : 'nonshow'}`}>
        
        <DialogContent className="max-w-lg w-full bg-white rounded-xl shadow-lg p-0 flex overflow-hidden  animate-glow">
          {/* Orbiting Glow Effect */}
          <div className="absolute inset-0 pointer-events-none border-2 border-blue-200 rounded-xl animate-orbit"></div>
          <style>
            {`
              @keyframes orbit {
                0% { box-shadow: 0 0 10px 2px rgba(59, 130, 246, 0.3); }
                50% { box-shadow: 0 0 20px 4px rgba(59, 130, 246, 0.5); }
                100% { box-shadow: 0 0 10px 2px rgba(59, 130, 246, 0.3); }
              }
              @keyframes pulse {
                0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.4); }
                50% { transform: scale(1.05); box-shadow: 0 0 10px 4px rgba(59, 130, 246, 0.2); }
                100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.4); }
              }
              .animate-glow {
                animation: orbit 4s ease-in-out infinite;
              }
              .hover\\:pulse:hover {
                animation: pulse 1s ease-in-out;
              }
            `}
          </style>
          <Tabs defaultValue="login" className="w-full flex hood">
            <TabsList className="flex flex-col w-1/3 bg-gray-50 p-4 rounded-l-xl border-r border-gray-200">
              <TabsTrigger 
                value="login" 
                className="py-3 text-lg font-medium text-left px-4 rounded-md mb-2 data-[state=active]:bg-blue-200 data-[state=active]:text-blue-600 text-gray-600 hover:bg-blue-100 flex items-center gap-2"
              >
                <Rocket className="w-5 h-5" /> Login
              </TabsTrigger>
              <TabsTrigger 
                value="register" 
                className="py-3 text-lg font-medium text-left px-4 rounded-md data-[state=active]:bg-blue-200 data-[state=active]:text-blue-600 text-gray-600 hover:bg-blue-100 flex items-center gap-2"
              >
                <User className="w-5 h-5" /> Sign Up
              </TabsTrigger>
            </TabsList>

            <div className="w-2/3 p-6 relative z-10">
              <TabsContent value="login">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-semibold text-gray-600">Access Your Space</DialogTitle>
                  <DialogDescription className="text-sm text-gray-500 mt-1">
                    Log in with your email or mobile number
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleLogin} className="space-y-5 mt-6">
                  <div className="flex items-center gap-2">
                    <Mail className="w-5 h-5 text-gray-500" />
                    <Input
                      type="email"
                      placeholder="Email or Mobile Number"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="bg-white border-gray-300 text-gray-600 placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 rounded-md py-2.5 text-sm"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Lock className="w-5 h-5 text-gray-500" />
                    <Input
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="bg-white border-gray-300 text-gray-600 placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 rounded-md py-2.5 text-sm"
                    />
                  </div>
                  <DialogFooter>
                    <Button 
                      type="submit" 
                      className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2.5 rounded-md font-medium text-sm hover:pulse"
                    >
                      Launch
                    </Button>
                  </DialogFooter>
                </form>
              </TabsContent>

              <TabsContent value="register">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-semibold text-gray-600">Join the Mission</DialogTitle>
                  <DialogDescription className="text-sm text-gray-500 mt-1">
                    Create an account to explore new horizons
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleRegister} className="space-y-5 mt-6">
                  <div className="flex items-center gap-2">
                    <User className="w-5 h-5 text-gray-500" />
                    <Input
                      type="text"
                      placeholder="Full Name"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                      className="bg-white border-gray-300 text-gray-600 placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 rounded-md py-2.5 text-sm"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-5 h-5 text-gray-500" />
                    <Input
                      type="email"
                      placeholder="Email or Mobile Number"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="bg-white border-gray-300 text-gray-600 placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 rounded-md text-sm"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Lock className="w-5 h-5 text-gray-500" />
                    <Input
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="bg-white border-gray-300 text-gray-600 placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 rounded-md py-2.5 text-sm"
                    />
                  </div>
                  <DialogFooter>
                    <Button 
                      type="submit" 
                      className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2.5 rounded-md font-medium text-sm hover:pulse"
                    >
                      Enlist
                    </Button>
                  </DialogFooter>
                </form>
              </TabsContent>
            </div>
          </Tabs>
        </DialogContent>
      </div>
    </Dialog>
  );
}