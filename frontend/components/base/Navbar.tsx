"use client";

import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import UserAvatar from "../common/UserAvatar";
import LogoutModal from "../auth/LogoutModal";

type Props = {};

const Navbar = (props: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <LogoutModal open={open} setOpen={setOpen} />
      <nav className='flex justify-between items-center h-16 p-4 w-full shadow-md border'>
        <h1 className='text-4xl font-extrabold bg-gradient-to-l from-blue-900 to-blue-500 text-transparent bg-clip-text'>
          Clash
        </h1>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <UserAvatar name='Raj' />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setOpen(true)}>
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>
    </>
  );
};

export default Navbar;
