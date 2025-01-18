"use client";

import React, { useActionState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { forgetPasswordAction } from "@/actions/authActions";
import SubmitBtn from "../common/SubmitBtn";
import { toast } from "sonner";

type Props = {};

const ForgetPasswordForm = (props: Props) => {
  const initialState = {
    status: 0,
    message: "",
    errors: {},
  };

  const [state, formAction] = useActionState(
    forgetPasswordAction,
    initialState
  );

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

      <SubmitBtn text='Send Email' />
    </form>
  );
};

export default ForgetPasswordForm;

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
