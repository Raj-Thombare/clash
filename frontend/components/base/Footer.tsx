import React from "react";
import Link from "next/link";
import { Github, Linkedin, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className='h-14 max-sm:h-20 border-t dark:border-t-gray-800 py-5 px-10 max-sm:px-4 text-center text-xs flex justify-between max-sm:flex-col max-sm:items-center max-sm:gap-2 dark:text-white'>
      <span>© 2025 Clash All rights reserved.</span>
      <span className='flex gap-x-6'>
        <Link
          href='https://www.linkedin.com/in/rajthombare'
          target='_blank'
          className='underline'>
          <Twitter size={20} />
        </Link>
        <Link
          href='https://github.com/raj-thombare'
          target='_blank'
          className='underline'>
          <Github size={20} />
        </Link>
        <Link
          href='https://x.com/rajth0mbare'
          target='_blank'
          className='underline'>
          <Linkedin size={20} />
        </Link>
      </span>
    </footer>
  );
};

export default Footer;
