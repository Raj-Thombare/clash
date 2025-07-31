"use client";

import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { motion } from "motion/react";

const HeroSection = () => {
  return (
    <main className='h-[90vh] flex items-center'>
      <section className='relative mx-auto max-w-5xl py-20'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='flex flex-col items-center gap-8 text-center'>
          <h1 className='text-transparent bg-gradient-to-r from-black via-gray-700 to-gray-900 bg-clip-text text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl dark:from-white dark:via-gray-300 dark:to-gray-100 max-lg:px-4 font-heading'>
            Clash Ideas. Shape Opinions. Decide Together.
          </h1>
          <p className='max-w-2xl text-lg text-muted-foreground max-sm:px-4 font-sans'>
            Join the platform where voices collide and communities decide.
            Debate topics, cast votes, and see opinions shift in real time.
          </p>
          <div className='flex gap-4'>
            <Link href={"/dashboard"}>
              <Button size='lg' className='rounded-full'>
                Get Started
              </Button>
            </Link>
            <Link href='/dashboard'>
              <Button size='lg' variant='outline' className='rounded-full'>
                Browse Clashes
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>
    </main>
  );
};

export default HeroSection;
