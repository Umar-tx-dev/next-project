"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGoogleLogin } from "@react-oauth/google";
import img1 from "../../assets/image/eye-off.svg";
import img2 from "../../assets/image/eye.svg";
import img3 from "../../assets/image/databreach.svg";
import axios from "axios";
import jwt from "jsonwebtoken";
import { SignUpSchema } from "@/validation/validationSchema";
import Link from "next/link";
const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);

  // React Hook Form with Zod validation
  const {
    register,
    handleSubmit,
    formState: { errors },
    // trigger,
  } = useForm({
    resolver: zodResolver(SignUpSchema),
    mode: "onChange", // Enables validation on each input change
  });
  // Function to handle form submission
  const onSubmit = async (data) => {
    const payload = {
      user: {
        email: data.email,
        password: data.password,
        password_confirmation: data.confirmPassword,
      },
    };

    console.log("Form data:", payload);
    try {
      const res = await axios.post(
        "https://9589-182-176-78-163.ngrok-free.app/api/v1/users",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Backend response:", res.data);
      // Handle successful sign up here
    } catch (error) {
      console.error("Error sending data to backend:", error);
    }
  };

  // Function to handle Google Authentication
  const handleGoogleSuccess = async (tokenResponse) => {
    console.log("Google auth response:", tokenResponse);

    const accessToken = tokenResponse.access_token;
    try {
      // encode the token
      const encodedToken = jwt.sign(
        { token: accessToken },
        "aGDDBHJbdsbh26738$@gHdDSeSTrD"
      );

      // Sending the access token to the backend
      const res = await axios.post("http://localhost:3000/api/v1/auth/google", {
        token: encodedToken, // Send the encoded token (or just the access token)
      });

      console.log("Backend response:", res.data);
    } catch (error) {
      console.error("Error sending token to backend:", error);
    }
  };
  const googleLogin = useGoogleLogin({
    onSuccess: handleGoogleSuccess,
    onError: (error) => console.error("Google auth failed:", error),
    scope: "openid profile email",
    flow: "authorization code flow",
  });
  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#082348] gap-1">
      <div className="w-full max-w-md h-[300px] flex flex-col gap-5  justify-center items-center">
        <Image src={img3} alt={"Data breach"} className="w-[200px] h-[150px]" />
        <h1 className="text-center text-3xl font-extrabold  ">
          {" "}
          <span className="text-white">Data Breach</span> Search Engine
        </h1>
      </div>
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-semibold">Sign Up</h1>
        </div>
        {/* Social Login */}
        <div className="flex justify-center mb-4">
          <button
            onClick={() => googleLogin()}
            className="border border-gray-300 p-2 rounded-lg flex items-center"
          >
            <img
              src="https://www.svgrepo.com/show/355037/google.svg"
              alt="Google"
              className="w-6 h-6 "
            />
          </button>
        </div>
        <div className="flex items-center justify-between my-4">
          <hr className="border-gray-300 flex-grow" />
          <span className="px-2 text-gray-500">or</span>
          <hr className="border-gray-300 flex-grow" />
        </div>
        {/* Form for Sign Up */}
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Username Input */}
          {/* <div className="mb-4">
            <input
              type="text"
              placeholder="Username"
              {...register("username")}
              onChange={() => trigger("username")} 
              className={`w-full px-4 py-2 border ${
                errors.username ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:outline-none focus:border-purple-500`}
            />
            {errors.username && (
              <p className="text-red-500 text-sm">{errors.username.message}</p>
            )}
          </div> */}
          {/* Email Input */}
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email"
              {...register("email")}
              //   onChange={() => trigger("email")}
              className={`w-full px-4 py-2 border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:outline-none focus:border-purple-500`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>
          {/* Password Input */}
          <div className="mb-4 relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              {...register("password")}
              //   onChange={() => trigger("password")}
              className={`w-full px-4 py-2 border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:outline-none focus:border-purple-500`}
            />
            <span
              className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
              onClick={togglePasswordVisibility}
            >
              <Image
                src={showPassword ? img1 : img2}
                alt={showPassword ? "Hide password" : "Show password"}
                className="w-5 h-5"
              />
            </span>
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>
          {/* Confirm Password Input */}
          <div className="mb-4">
            <input
              type="password"
              placeholder="Confirm Password"
              {...register("confirmPassword")}
              //   onChange={() => trigger("confirmPassword")}
              className={`w-full px-4 py-2 border ${
                errors.confirmPassword ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:outline-none focus:border-purple-500`}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
          {/* Submit Button */}
          <button className="w-full bg-blue-800 text-white py-2 rounded-lg hover:bg-purple-600">
            Sign Up
          </button>
        </form>
        {/* Sign In Section */}
        <div className="text-center mt-6 text-sm">
          <span>Already have an account? </span>
          <Link href="/login" className="text-purple-500">
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Signup;
