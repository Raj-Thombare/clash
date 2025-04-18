import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className='h-screen flex justify-center items-center flex-col'>
      <Image src='/notfound.svg' height={500} width={500} alt='404' />
      <Link href='/'>
        <Button>Return to Home</Button>
      </Link>
    </div>
  );
}
