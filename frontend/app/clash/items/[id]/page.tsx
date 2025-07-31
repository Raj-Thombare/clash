import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { fetchClash } from "@/app/fetch/clashFetch";
import AddClashItems from "@/components/clash/AddClashItems";
import ViewClashItems from "@/components/clash/ViewClashItems";
import { getServerSession } from "next-auth";
import React from "react";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const clash: ClashType | null = await fetchClash(Number(id));
  const session = await getServerSession(authOptions);

  return (
    <div className='px-6 mx-auto max-w-5xl py-10'>
      <header className='mb-8'>
        <h1 className='text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 mb-4'>
          {clash?.title}
        </h1>
        <p className='text-lg md:text-xl text-muted-foreground leading-relaxed'>
          {clash?.description}
        </p>
      </header>

      {clash?.clashItem && clash.clashItem.length > 0 ? (
        <ViewClashItems clash={clash} />
      ) : (
        <AddClashItems token={session?.user?.token!} clashId={Number(id)} />
      )}
    </div>
  );
}