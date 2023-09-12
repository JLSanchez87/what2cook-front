import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoginForm from "./LoginForm";
import Register from "./Register";
import Logo from "./Logo";

const Welcome = () => {
  return (
    <main className="flex flex-col items-center container min-h-screen bg-fixed bg-center bg-cover bg-gradient-to-b from-[var(--header)] to-[var(--div-color)]">
      <div
        className="absolute z-10 w-screen min-h-screen bg-fixed bg-center bg-cover"
        style={{
          backgroundImage: `url('landing-bg.jpg')`,
          opacity: 0.1,
        }}
      />
      <h1 className="z-10 pt-10 mb-4 font-serif text-xl text-fg">
        The app for people who don&apos;t know..
      </h1>
      <div className="flex flex-row items-baseline">
        <Logo height="4rem" />
        <p className="z-10 mb-5 ml-2 text-7xl font-lobster text-cta">
          what2cook
        </p>
      </div>
      <p className="z-10 mb-8 text-6xl font-bold font-lobster text-amber-400">
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
