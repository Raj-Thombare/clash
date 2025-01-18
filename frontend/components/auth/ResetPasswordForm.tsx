"use client";

import React, { useActionState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { resetPasswordAction } from "@/actions/authActions";
import SubmitBtn from "../common/SubmitBtn";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "sonner";

type Props = {};

const ResetPasswordForm = (props: Props) => {
  const initialState = {
    status: 0,
    message: "",
    errors: {},
  };
  const router = useRouter();
  const searchParams = useSearchParams();
  const [state, formAction] = useActionState(resetPasswordAction, initialState);

  useEffect(() => {
    if (state.status == 500) {
      toast.error(state.message);
    } else if (state.status == 200) {
      toast.success(state.message);
      setTimeout(() => {
        router.replace("/login");
      }, 1000);
    }
  }, [state]);

  return (
    <form className='my-8' action={formAction}>
      <input
        type='hidden'
        name='token'
        value={searchParams.get("token") ?? ""}
      />
      <LabelInputContainer className='mb-4'>
        <Label htmlFor='email'>Email Address</Label>
        <Input
          id='email'
          placeholder='Johndoe@example.com'
          type='email'
          name='email'
          readOnly
          value={searchParams.get("email") ?? ""}
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

      <SubmitBtn text='Reset Password' />
    </form>
  );
};

export default ResetPasswordForm;

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
