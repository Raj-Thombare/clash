import Navbar from "@/components/base/Navbar";
import AddClash from "@/components/clash/AddClash";
import React from "react";
import { authOptions, CustomSession } from "../api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { fetchClashes } from "@/components/fetch/clashFetch";

type Props = {};

const page = async (props: Props) => {
  const session: CustomSession | null = await getServerSession(authOptions);

  const clashes = await fetchClashes(session?.user?.token!);
  console.log("clashes: ", clashes);

  return (
    <div className='container'>
      <Navbar />
      <div className='text-end mt-10'>
        <AddClash user={session?.user!} />
      </div>
    </div>
  );
};

export default page;
