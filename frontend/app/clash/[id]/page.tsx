import { fetchClash } from "@/app/fetch/clashFetch";
import Navbar from "@/components/base/Navbar";
import Clashing from "@/components/clash/Clashing";
import React from "react";

type Props = {
  params: Promise<{ id: number }>;
};

const page = async ({ params }: Props) => {
  const { id } = await params;
  const clash: ClashType | null = await fetchClash(id);

  return (
    <div className='container'>
      <Navbar />
      <div className='px-10'>
        <div className='mt-4'>
          <h1 className='text-2xl lg:text-4xl font-bold'>{clash?.title}</h1>
          <p className='text-lg'>{clash?.description}</p>
        </div>
        {clash && <Clashing clash={clash!} />}
      </div>
    </div>
  );
};

export default page;
