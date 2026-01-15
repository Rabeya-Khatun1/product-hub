"use client";
import Link from 'next/link';
import React, { useState } from 'react';

const Navbar = () => {
  // ম্যানুয়ালি একটি স্টেট রাখা হয়েছে কোন ট্যাবটি একটিভ তা বোঝার জন্য
  const [activeTab, setActiveTab] = useState('/');

  const links = (
    <>
      <li>
        <Link 
          href="/" 
          onClick={() => setActiveTab('/')}
          className={activeTab === '/' ? "text-blue-600 font-bold" : ""}
        >
          Home
        </Link>
      </li>
      <li>
        <Link 
          href="/items" 
          onClick={() => setActiveTab('/items')}
          className={activeTab === '/items' ? "text-blue-600 font-bold" : ""}
        >
          Items
        </Link>
      </li>
      <li>
        <Link 
          href="/addItems" 
          onClick={() => setActiveTab('/addItems')}
          className={activeTab === '/addItems' ? "text-blue-600 font-bold" : ""}
        >
          Add Item
        </Link>
      </li>
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-md px-4">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 z-10"
          >
            {links}
          </ul>
        </div>

        <Link href="/" className="btn btn-ghost normal-case text-xl">
          PRODUCT HUB
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-2">
          {links} 
        </ul>
      </div>

      <div className="navbar-end">
        <Link href="/login">
          <button className="btn btn-primary">Login</button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;