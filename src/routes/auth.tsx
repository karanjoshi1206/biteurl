import { createFileRoute } from "@tanstack/react-router";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import Login from "../components/Login";
import Signup from "../components/Signup";

export const Route = createFileRoute("/auth")({
  component: () => <Auth />
});

const Auth = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <h2 className="text-xl sm:text-2xl lg:text-4xl my-5">Login to your account</h2>
      <Tabs defaultValue="account" className="w-full sm:w-[400px]">
        <TabsList className="w-full">
          <TabsTrigger className="w-full" value="account">
            Login
          </TabsTrigger>
          <TabsTrigger className="w-full" value="password">
            Signup
          </TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <Login />
        </TabsContent>
        <TabsContent value="password">
          <Signup />
        </TabsContent>
      </Tabs>
    </div>
  );
};
