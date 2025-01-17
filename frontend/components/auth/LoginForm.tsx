"use client";

import React, { useActionState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { IconBrandGithub, IconBrandGoogle } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { loginAction } from "@/actions/authActions";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import SubmitBtn from "../common/SubmitBtn";

type Props = {};

const LoginForm = (props: Props) => {
  const initialState = {
    status: 0,
    message: "",
    errors: {},
    data: {},
  };

  const [state, formAction] = useActionState(loginAction, initialState);

  useEffect(() => {
    if (state.status == 500) {
      toast.error(state.message);
    } else if (state.status == 200) {
      toast.success(state.message);
      signIn("credentials", {
        email: state.data.email,
        password: state.data.password,
        redirect: true,
        callbackUrl: "/dashboard",
      });
    }
  }, [state]);

  return (
    <form className='my-8' action={formAction}>
      <LabelInputContainer className='mb-4'>
        <Label htmlFor='email'>Email Address</Label>
        <Input
          id='email'
          placeholder='Johndoe@example.com'
          type='email'
          name='email'
        />
        {state.errors?.email && (
          <span className='text-red-500'>{state.errors.email}</span>
        )}
      </LabelInputContainer>
      <LabelInputContainer className='mb-4'>
        <Label htmlFor='password'>Password</Label>
        <Input
          id='password'
          placeholder='••••••••'
          type='password'
          name='password'
        />
        {state.errors?.password && (
          <span className='text-red-500'>{state.errors.password}</span>
        )}
      </LabelInputContainer>
      <div className='flex items-end justify-end mb-2'>
        <Link href='/register' className='text-right'>
          Forget password?
        </Link>
      </div>
      <SubmitBtn text='Login' />
      <div className='flex items-center justify-center'>
        <p>
          Don't have an account?
          <Link href='/register' className='font-bold ml-1'>
            Register
          </Link>
        </p>
      </div>

      <div className='bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full' />

      <div className='flex flex-col space-y-4'>
        <button
          className=' relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]'
          type='submit'>
          <IconBrandGithub className='h-4 w-4 text-neutral-800 dark:text-neutral-300' />
          <span className='text-neutral-700 dark:text-neutral-300 text-sm'>
            GitHub
          </span>
        </button>
        <button
          className=' relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]'
          type='submit'>
          <IconBrandGoogle className='h-4 w-4 text-neutral-800 dark:text-neutral-300' />
          <span className='text-neutral-700 dark:text-neutral-300 text-sm'>
            Google
          </span>
        </button>
      </div>
    </form>
  );
};

export default LoginForm;

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
