"use client";
import React from "react";
import Image from "next/image";
import img3 from "../../assets/image/databreach.svg";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "@/validation/validationSchema";
import { useRouter } from "next/router";
import { z } from "zod";
import axios from "axios";
import Link from "next/link";

// Define Zod schema for validation

const Login = () => {
  // const router = useRouter();
  // Set up the form with react-hook-form and zod
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(LoginSchema),
  });

  // Handle form submission
  const onSubmit = async (data) => {
    try {
      // Make POST request to your backend
      const response = await axios.post("/api/login", data);
      console.log("Login successful:", response.data);

      // Store the token in localStorage
      localStorage.setItem("authToken", token);

      // Store the token in cookies (expires in 7 days)
      // Cookies.set("authToken", token, { expires: 7 });
      router.push('/something')

      // Handle success (e.g., redirect, save token, etc.)
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      // Handle error (e.g., show error message)
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#082348]">
      <div className="w-full max-w-md h-[400px] flex flex-col gap-5 justify-center items-center">
        <Image src={img3} alt={"Data breach"} className="w-[200px] h-[150px]" />
        <h1 className="text-center text-3xl font-extrabold">
          <span className="text-white">Data Breach</span> Search Engine
        </h1>
      </div>
      <div className="w-full max-w-md">
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.email ? "border-red-500" : ""
              }`}
              id="email"
              type="email"
              placeholder="email"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-red-500 text-xs italic">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.password ? "border-red-500" : ""
              }`}
              id="password"
              type="password"
              placeholder="******************"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-red-500 text-xs italic">
                {errors.password.message}
              </p>
            )}
          </div>
          <div className="flex items-center justify-between mb-4">
            <label className="flex items-center">
              <input type="checkbox" className="form-checkbox text-blue-500" />
              <span className="ml-2 text-sm text-gray-700">
                Keep me signed in on this device
              </span>
            </label>
          </div>
          <div className="flex items-center justify-between">
            <button
              className={`bg-blue-800 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Signing In..." : "Sign In"}
            </button>
          </div>
        </form>
        <p className="text-center text-white text-xs">
          (and agree to our terms and privacy policy)
        </p>
        <div className="text-center mt-4">
          <Link href="/signup" className="text-blue-300 hover:underline">
            Create a New Account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
