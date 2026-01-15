"use client"; 

import React from "react";
import LoginForm from "@/components/Forms/LoginForm";
import GoogleLogin from "@/components/buttons/GoogleLogin";

const Login = () => {
  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center px-4">
      <div className="container max-w-6xl mx-auto flex flex-col items-center gap-12">
        
      
        <div className="card bg-base-100 w-full max-w-md shadow-2xl rounded-2xl p-8 flex flex-col gap-6">
          <h2 className="text-3xl font-bold text-center">Welcome Back!</h2>
          <p className="text-sm text-center opacity-70">
            Login to access your account and manage your products.
          </p>

          <div className="flex flex-col gap-4">
            <LoginForm></LoginForm>
            <div className="flex justify-center">
              <GoogleLogin></GoogleLogin>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Login;
