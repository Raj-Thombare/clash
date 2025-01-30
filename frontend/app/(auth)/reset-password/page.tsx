"use client";

import React, { Suspense } from "react";
import ResetPasswordForm from "@/components/auth/ResetPasswordForm";

const page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className='h-screen flex justify-center items-center p-8 md:p-0'>
        <div className='max-w-md w-full mx-auto rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black'>
          <h2 className='font-bold text-center text-2xl text-neutral-800 dark:text-neutral-200'>
            Clash
          </h2>
          <h2 className='font-semibold text-md mt-2'>Reset Password</h2>
          <p>Enter your new password below to reset old password</p>
          <ResetPasswordForm />
        </div>
      </div>
    </Suspense>
  );
};

export default page;
