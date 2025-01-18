"use client";

import React from "react";
import ForgetPasswordForm from "@/components/auth/ForgetPasswordForm";

const page = () => {
  return (
    <div className='h-screen flex justify-center items-center p-8 md:p-0'>
      <div className='max-w-md w-full mx-auto rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black'>
        <h2 className='font-bold text-center text-2xl text-neutral-800 dark:text-neutral-200'>
          Clash
        </h2>
        <h2 className='font-semibold text-md mt-2'>Forget Password ?</h2>
        <p>
          Don't worry it happens. Just enter your email below and we will send
          you the password reset link.
        </p>
        <ForgetPasswordForm />
      </div>
    </div>
  );
};

export default page;
