"use client";

import React, { useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { IconBrandGithub, IconBrandGoogle } from "@tabler/icons-react";
import Link from "next/link";
import { registerAction } from "@/actions/authActions";
import SubmitBtn from "@/components/common/SubmitBtn";
import { useActionState } from "react";
import { toast } from "sonner";

type Props = {};

const RegisterForm = (props: Props) => {
  const initialState = {
    status: 0,
    message: "",
    errors: {},
  };

  const [state, formAction] = useActionState(registerAction, initialState);

  useEffect(() => {
    if (state.status == 500) {
      toast.error(state.message);
    } else if (state.status == 200) {
      toast.success(state.message);
    }
  }, [state]);
  return (
    <form className='my-8' action={formAction}>
      <LabelInputContainer className='mb-4'>
        <Label htmlFor='name'>Full Name</Label>
        <Input id='name' name='name' placeholder='John Doe' type='text' />
        <span className='text-red-500'>
          {state.errors && state.errors.name}
        </span>
      </LabelInputContainer>
      <LabelInputContainer className='mb-4'>
        <Label htmlFor='email'>Email Address</Label>
        <Input
          id='email'
          name='email'
          placeholder='johndoe@test.com'
          type='email'
        />
        {state.errors?.email && (
          <span className='text-red-500'>{state.errors.email}</span>
        )}
      </LabelInputContainer>
      <LabelInputContainer className='mb-4'>
        <Label htmlFor='password'>Password</Label>
        <Input
          id='password'
          name='password'
          placeholder='••••••••'
          type='password'
        />
        {state.errors?.password && (
          <span className='text-red-500'>{state.errors.password}</span>
        )}
      </LabelInputContainer>
      <LabelInputContainer className='mb-8'>
        <Label htmlFor='confirm_password'>Confirm Password</Label>
        <Input
          id='confirm_password'
          name='confirm_password'
          placeholder='••••••••'
          type='password'
        />
        {state.errors?.confirm_password && (
          <span className='text-red-500'>{state.errors.confirm_password}</span>
        )}
      </LabelInputContainer>
      <SubmitBtn />
      <div className='flex items-center justify-center'>
        <p>
          Already have an account?
          <Link href='/login' className='font-bold ml-1'>
            Login
          </Link>
        </p>
      </div>
      <div className='bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full' />

      <div className='flex flex-col space-y-4'>
        <button
          className=' relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]'
          type='button'>
          <IconBrandGithub className='h-4 w-4 text-neutral-800 dark:text-neutral-300' />
          <span className='text-neutral-700 dark:text-neutral-300 text-sm'>
            GitHub
          </span>
        </button>
        <button
          className=' relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]'
          type='button'>
          <IconBrandGoogle className='h-4 w-4 text-neutral-800 dark:text-neutral-300' />
          <span className='text-neutral-700 dark:text-neutral-300 text-sm'>
            Google
          </span>
        </button>
      </div>
    </form>
  );
};

export default RegisterForm;

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
