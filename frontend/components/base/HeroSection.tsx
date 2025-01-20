import React from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import { HoverBorderGradient } from "../ui/hover-border-gradient";
import { ShootingStars } from "../ui/shooting-stars";
import { StarsBackground } from "../ui/stars-background";
import { TextHoverEffect } from "../ui/text-hover-effect";

type Props = {};

const HeroSection = (props: Props) => {
  return (
    <div className='w-full h-screen bg-neutral-900 flex flex-col items-center justify-center relative'>
      <div>
        <div className='gap-y-5'>
          <TextHoverEffect text='Clash' />
          <h3 className='relative flex-col md:flex-row z-10 text-3xl md:text-5xl md:leading-tight max-w-5xl mx-auto text-center tracking-tight font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-white to-white flex items-center gap-2 md:gap-8'>
            Discover the better choice, together!
          </h3>
        </div>
        <ShootingStars />
        <StarsBackground />
      </div>
      <div className='mt-10'>
        <Link href='/login'>
          <HoverBorderGradient
            containerClassName='rounded-full'
            as='button'
            className='flex items-center space-x-2'>
            <span className='font-bold'>START FREE</span>
          </HoverBorderGradient>
        </Link>
      </div>
    </div>
  );
};

export default HeroSection;
