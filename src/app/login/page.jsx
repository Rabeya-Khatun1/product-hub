"use client"; // 🔹 add this

import GoogleLogin from '@/components/buttons/GoogleLogin';
import LoginForm from '@/components/Forms/LoginForm';
import React from 'react';

const Login = () => {
    return (
        <div className="hero bg-base-200 min-h-screen flex flex-col lg:flex-row-reverse items-center justify-center">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Login now!</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
              quasi. In deleniti eaque aut repudiandae et a id nisi.
            </p>
          </div>

          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl flex flex-col gap-4">
            <div className="card-body flex flex-col gap-4">
              <LoginForm />
              <GoogleLogin /> {/* 🔹 Google button form এর ভিতরে রাখলেই better */}
            </div>
          </div>
        </div>
    );
};

export default Login;
