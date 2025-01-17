"use client";

import React from "react";
import LoginForm from "@/components/auth/LoginForm";

const page = () => {
  return (
    <div className='h-screen flex justify-center items-center p-8 md:p-0'>
      <div className='max-w-md w-full mx-auto rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black'>
        <h2 className='font-bold text-center text-2xl text-neutral-800 dark:text-neutral-200'>
          Login to Clash
        </h2>
        <LoginForm />
      </div>
    </div>
  );
};

export default page;
