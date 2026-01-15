"use client";
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const LoginForm = () => {

    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
const [error, setError] = useState(null);

    const handleLogin = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

if(email === 'rabeya@123.com' && password === 'rabeya123') {
    document.cookie = "auth=true; path=/";
            router.push('/items');
        } else {
            setError('Invalid email or password');
        }

    }

    return (
        <form onSubmit={handleLogin}>
            <fieldset className="fieldset">
                <label className="label">Email</label>

                <input 
                name='email'
                 type="email" 
                 required
                 value={email}
                 onChange={(e)=>setEmail(e.target.value)}
                 className="input"
                  placeholder="Email" />
                <label className="label">Password</label>
                <input 
                name='password'
                required
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                 type="password"
                  className="input"
                   placeholder="Password" />


                <div><a className="link link-hover">Forgot password?</a></div>
                {error && <p className="text-red-500">{error}</p>}
                <button type='submit' className="btn btn-neutral mt-4">Login</button>
            </fieldset>
        </form>
    );
};

export default LoginForm;