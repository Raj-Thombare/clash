import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { fetchClash } from "@/app/fetch/clashFetch";
import Navbar from "@/components/base/Navbar";
import AddClashItems from "@/components/clash/AddClashItems";
import ViewClashItems from "@/components/clash/ViewClashItems";
import { getServerSession } from "next-auth";
import React from "react";

type Props = {
  params: Promise<{ id: number }>;
};

const page = async ({ params }: Props) => {
  const { id } = await params;
  const clash: ClashType | null = await fetchClash(id);
  const session = await getServerSession(authOptions);

  return (
    <div>
      <Navbar />
      <div className='px-6 mx-6 md:px-10 md:mx-20'>
        <div className='mt-4'>
          <h1 className='text-2xl lg:text-4xl font-bold'>{clash?.title}</h1>
          <p className='text-lg'>{clash?.description}</p>
        </div>

        {clash?.clashItem && clash.clashItem?.length > 0 ? (
          <>
            <ViewClashItems clash={clash} />
          </>
        ) : (
          <AddClashItems token={session?.user?.token!} clashId={id!} />
        )}
      </div>
    </div>
  );
};

export default page;
