import React from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";

type Props = {};

const HeroSection = (props: Props) => {
  return (
    <div className='w-full h-screen flex justify-center items-center flex-col'>
      <div>
        <Image src='/banner.svg' alt='banner_image' width={500} height={500} />
      </div>
      <div className='text-center mt-5'>
        <h1 className='text-5xl md:text-6xl lg:text-8xl font-extrabold bg-gradient-to-r from-pink-400 to-purple-500 text-transparent bg-clip-text'>
          Clash
        </h1>
        <p className='text-2xl md:text-3xl lg:text-4xl font-bold text-center mt-2'>
          Discover the better choice, together!
        </p>
        <Link href='/login'>
          <Button className='mt-4'>Start Free</Button>
        </Link>
      </div>
    </div>
  );
};

export default HeroSection;
