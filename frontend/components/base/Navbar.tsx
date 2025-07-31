"use client";

import React, { useContext, useState } from "react";
import { motion } from "motion/react";
import Link from "next/link";
import { Button } from "../ui/button";
// import { Moon, Sun } from "lucide-react";
import { useSession } from "next-auth/react";
// import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import LogoutModal from "../auth/LogoutModal";
// import { DarkModeContext } from "@/providers/ThemeProvider";

// const useDarkMode = () => {
//   const context = useContext(DarkModeContext);
//   if (!context) {
//     throw new Error("darkModeContext is possibly undefined!");
//   }
//   return context;
// };

const Navbar = () => {
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);

  const router = useRouter();

  // const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <header className='px-6 md:px-16 sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <div className='container flex h-16 items-center justify-between'>
        <Link href='/'>
          <div className='flex items-center gap-2 cursor-pointer'>
            <div className='relative size-8'>
              <motion.div
                className='absolute inset-0 rounded bg-primary'
                animate={{
                  rotate: [0, 10, -10, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <span className='absolute inset-0 flex items-center justify-center font-bold text-primary-foreground'>
                C
              </span>
            </div>
            <span className='text-2xl font-bold'>Clash</span>
          </div>
        </Link>

        <div className='flex items-center gap-3'>
          {/* <Button variant='ghost' size='icon' onClick={toggleDarkMode}>
            {isDarkMode ? <Sun size={22} /> : <Moon size={22} />}
          </Button> */}

          {status === "authenticated" && (
            <Button variant='outline' onClick={() => router.push("/dashboard")}>
              Dashboard
            </Button>
          )}

          <Button
            onClick={
              status === "authenticated"
                ? () => setOpen(true)
                : () => router.push("/api/auth/signin")
            }>
            {status === "authenticated" ? "Logout" : "Sign In"}
          </Button>
          <LogoutModal open={open} setOpen={setOpen} />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
