import axios from "axios";
import { useRouter } from "next/router";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Wrapper from "@/components/Wrapper";
import { useState } from "react";

const loginFormValidator = z
  .object({
    username: z.string().nonempty().max(20),
    password: z
      .string()
      .min(10, { message: "password must be 10 or more characters" }),
  })
  .strict();

type DataFromLoginForm = z.infer<typeof loginFormValidator>;

const Login = () => {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const handleLoginFormSubmit = async (data: DataFromLoginForm) => {
    try {
      // console.log(data);
      const response = await axios.post("http://localhost:3001/login", {
        username: data.username,
        password: data.password,
      });
      localStorage.setItem("token", response.data.token);
      router.push("/");
    } catch (error) {
      setError("Incorrect username or password.");
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DataFromLoginForm>({
    resolver: zodResolver(loginFormValidator),
  });

  return (
    <Wrapper>
      <div className="flex flex-col p-8">
        <h1>Login</h1>
        <form
          onSubmit={handleSubmit(handleLoginFormSubmit)}
          className="flex flex-col"
        >
          <label htmlFor="name" className="mt-4">
            Username
          </label>
          <input
            className="w-1/3 sm:w-full border-solid border-2 border-gray-400 rounded-md"
            type="text"
            id="name"
            {...register("username")}
          />
          {errors.username && (
            <p className="text-red-400">{errors.username.message}</p>
          )}

          <label htmlFor="password" className="mt-4">
            Password
          </label>
          <input
            className="border-solid border-2 border-gray-400 rounded-md"
            type="password"
            id="password"
            {...register("password")}
          />
          {errors.password && (
            <p className="text-red-400">{errors.password.message}</p>
          )}

          <button type="submit" className="my-4">
            Login
          </button>
          {error && <p className="text-red-400">{error}</p>}
        </form>
      </div>
    </Wrapper>
  );
};

export default Login;
