import React from "react";
import RegisterForm from "@/components/auth/RegisterForm";

const page = () => {
  return (
    <div className='h-screen flex justify-center items-center p-8 md:p-0 mb-0 md:mb-20'>
      <div className='mt-0 md:mt-20 max-w-md w-full mx-auto rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black'>
        <h2 className='font-bold text-2xl text-center text-neutral-800 dark:text-neutral-200'>
          Welcome to Clash
        </h2>
        <RegisterForm />
      </div>
    </div>
  );
};

export default page;
