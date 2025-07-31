import { fetchClash } from "@/app/fetch/clashFetch";
import Clashing from "@/components/clash/Clashing";
import { notFound } from "next/navigation";
import React from "react";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const clash: ClashType | null = await fetchClash(Number(id));

  if (!clash) return notFound();

  return (
    <div className='px-6 mx-auto max-w-5xl py-10'>
      <header className='mb-8'>
        <h1 className='text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 mb-4'>
          {clash.title}
        </h1>
        <p className='text-lg md:text-xl text-muted-foreground leading-relaxed'>
          {clash.description}
        </p>
      </header>

      <Clashing clash={clash} />
    </div>
  );
}
