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

export function UserDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Perform login logic
    console.log("Logging in with", { email, password });
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // Perform registration logic
    console.log("Registering with", { username, email, password });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md w-full rounded-2xl shadow-xl p-6">
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <DialogHeader>
              <DialogTitle>Log in to explore our exquisite collection</DialogTitle>
              {/* <DialogDescription>Enter your credentials to log in</DialogDescription> */}
            </DialogHeader>
            <form onSubmit={handleLogin} className="space-y-4 mt-4">
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <DialogFooter>
                <Button type="submit" className="w-full">Login</Button>
              </DialogFooter>
            </form>
          </TabsContent>

          <TabsContent value="register">
            <DialogHeader>
              <DialogTitle>Create Account</DialogTitle>
              <DialogDescription>Fill in your details to register</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleRegister} className="space-y-4 mt-4">
              <Input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <DialogFooter>
                <Button type="submit" className="w-full">Register</Button>
              </DialogFooter>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
