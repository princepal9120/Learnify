import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

export default function Auth() {
  
  const [signupInput, setSignupInput] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loginInput, setLoginInput] = useState({ email: "", password: "" });

  const changeInputHandler= (e,type)=>{
    const {name, value}=e.target;
    if(type=="signup"){
     setSignupInput({...signupInput,[name]:value});

    }else{
      setLoginInput({...loginInput,[name]: value});
    }
  }
  const handleRegistrationOrLogin=(type)=>{
    const inputData= type==="signup"?signupInput:loginInput
    console.log(inputData)

    

  }
  return (
    <Tabs defaultValue="signup" className="w-[400px] mx-auto mt-10">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="signup">Signup</TabsTrigger>
        <TabsTrigger value="login">Login</TabsTrigger>
      </TabsList>

      {/* Signup Tab */}
      <TabsContent value="signup">
        <Card>
          <CardHeader>
            <CardTitle>Signup</CardTitle>
            <CardDescription>
              Create a new account by filling in the details below.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="signup-name">Name</Label>
              <Input
                type="text"
                name="name"
                value={signupInput.name}
                onChange={(e)=>changeInputHandler(e,"signup")}
                placeholder="Enter your name"
                defaultValue="Prince Pal"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="signup-email">Email</Label>
              <Input
                name="email"
                value={signupInput.email}
                onChange={(e)=>changeInputHandler(e,"signup")}
                placeholder="Enter your email"
                type="email"
                defaultValue="pal265354@gmail.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="signup-password">Password</Label>
              <Input
                name="password"
                value={signupInput.password}

                onChange={(e)=>changeInputHandler(e,"signup")}
                placeholder="Enter your password"
                type="password"
                defaultValue="12345678"
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={()=>handleRegistrationOrLogin("signup")}>Create Account</Button>
          </CardFooter>
        </Card>
      </TabsContent>

      {/* Login Tab */}
      <TabsContent value="login">
        <Card>
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>
              Access your account by entering your email and password.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="login-email">Email</Label>
              <Input
                name="email"
                value={loginInput.email}
                onChange={(e)=>changeInputHandler(e,"login")}
                placeholder="Enter your email"
                type="email"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="login-password">Password</Label>
              <Input
                name="password"
                value={loginInput.password}
                onChange={(e)=>changeInputHandler(e,"login")}
                placeholder="Enter your password"
                type="password"
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={()=>handleRegistrationOrLogin("login")}>Login</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
