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
    <main className="flex flex-col bg-cover bg-center bg-gradient-to-b from-lime-300 to-orange-200 items-center min-h-screen">
      <div
        className="absolute w-screen h-screen bg-cover bg-center"
        style={{
          backgroundImage: `url('landing-bg.jpg')`,
          opacity: 0.5,
        }}
      />
      <h1 className="z-10 pt-20 font-serif text-4xl text-green-600">
        The app for people who don't know...
      </h1>
      <p className="z-10 font-lobster font-bold mb-10 text-8xl text-amber-400">
        🧑🏻‍🍳what2cook
      </p>
      <p className="z-10 font-lobster font-bold mb-8 text-8xl text-amber-400">
        🍔 🍖 🍗 🍝
        <br />
        🥦 🧀 🍞 🧂
      </p>
      <Tabs defaultValue="login" className="z-10 w-[400px]">
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
