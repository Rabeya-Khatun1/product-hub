"use client"
import React from 'react';
import { signIn } from "next-auth/react"; 

const GoogleLogin = () => {
    return (
        <div>
            {/* Google Login */}
            <button
              className='btn btn-primary cursor-pointer'
              onClick={() => signIn("google", { callbackUrl: "/items" })}
            >
                Login with Google
            </button>
        </div>
    );
};

export default GoogleLogin;
