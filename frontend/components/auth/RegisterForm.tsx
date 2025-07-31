"use client";

import React, { useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { IconBrandGithub, IconBrandGoogle } from "@tabler/icons-react";
import Link from "next/link";
import { registerAction } from "@/app/actions/authActions";
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
    <form action={formAction}>
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
      <SubmitBtn text='Register' />
      <div className='flex items-center justify-center'>
        <p>
          Already have an account?
          <Link href='/login' className='font-bold ml-1'>
            Login
          </Link>
        </p>
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
