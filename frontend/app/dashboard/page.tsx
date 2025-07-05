import Navbar from "@/components/base/Navbar";
import AddClash from "@/components/clash/AddClash";
import React from "react";
import { authOptions, CustomSession } from "../api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { fetchClashes } from "@/app/fetch/clashFetch";
import ClashCard from "@/components/clash/ClashCard";

type Props = {};

const page = async (props: Props) => {
  const session: CustomSession | null = await getServerSession(authOptions);

  const clashes = await fetchClashes(session?.user?.token!);

  return (
    <div>
      <Navbar />
      <div className='px-6 mx-6 md:px-10 md:mx-20'>
        <div className='text-end mt-10'>
          <AddClash user={session?.user!} />
        </div>

        <div className='mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {clashes.length > 0 &&
            clashes.map((item: ClashType) => {
              return (
                <ClashCard
                  clash={item}
                  token={session?.user?.token!}
                  key={item.id}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default page;
