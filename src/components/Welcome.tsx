import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoginForm from "./LoginForm";
import Register from "./Register";

const Welcome = () => {
  return (
    <main className="flex flex-col pt-40 items-center min-h-screen">
      <h1 className="mb-8 text-2xl">Welcome to 🧑🏻‍🍳 what2cook!</h1>
      <Tabs defaultValue="login" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="register">Register</TabsTrigger>
        </TabsList>

        <TabsContent value="login">
          <Card>
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>
                Fill in your login information to access your Fridge!
              </CardDescription>
            </CardHeader>
            <LoginForm />
          </Card>
        </TabsContent>

        <TabsContent value="register">
          <Card>
            <CardHeader>
              <CardTitle>Create a new account!</CardTitle>
              <CardDescription>
                Create your account here, after registering you can log in!
              </CardDescription>
            </CardHeader>
            <Register />
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  );
};

export default Welcome;
