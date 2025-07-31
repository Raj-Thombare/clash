"use client";

import React, { Fragment, useEffect, useState } from "react";
import Image from "next/image";
import { getImageUrl } from "@/lib/utils";
import CountUp from "react-countup";
import socket from "@/lib/socket";
import { UserIcon } from "lucide-react";
import { motion } from "motion/react";

type Props = {
  clash: ClashType;
};

const ViewClashItems = ({ clash }: Props) => {
  const [clashComments, setClashComments] = useState(clash.clashComments);
  const [clashItems, setClashItems] = useState(clash.clashItem);

  const updateComment = (payload: any) => {
    setClashComments((prev) => [payload, ...(prev || [])]);
  };

  const updateCounter = (id: number) => {
    const updated = clashItems.map((item) =>
      item.id === id ? { ...item, count: item.count + 1 } : item
    );
    setClashItems(updated);
  };

  useEffect(() => {
    socket.on(`clashing-${clash.id}`, (data) =>
      updateCounter(data?.clashItemId)
    );
    socket.on(`clashing_comment-${clash.id}`, (data) => updateComment(data));
  }, []);

  const winnerId =
    clashItems.length === 2
      ? clashItems.reduce((a, b) => (a.count > b.count ? a : b)).id
      : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className='mt-12 space-y-16'>
      <div className='flex flex-col lg:flex-row justify-center items-center gap-8'>
        {clashItems.length === 2 ? (
          <>
            <ClashCard
              item={clashItems[0]}
              isWinner={clashItems[0].id === winnerId}
            />

            {clashItems.length === 2 && (
              <div className='flex justify-center items-center px-4'>
                <div className='flex items-center justify-center text-3xl'>
                  ⚔️
                </div>
              </div>
            )}

            <ClashCard
              item={clashItems[1]}
              isWinner={clashItems[1].id === winnerId}
            />
          </>
        ) : (
          clashItems.map((item) => <ClashCard key={item.id} item={item} />)
        )}
      </div>

      <section className='max-w-2xl mx-auto'>
        <h2 className='text-2xl font-semibold mb-1 text-neutral-900 dark:text-neutral-100'>
          Comments
        </h2>
        <div className='w-full h-px bg-border mb-4' />

        {clashComments && clashComments.length > 0 ? (
          <div className='space-y-4'>
            {clashComments.map((item, idx) => (
              <div
                key={idx}
                className='flex gap-4 items-start bg-muted/50 p-4 rounded-xl border border-border shadow-sm'>
                <div className='w-10 h-10 flex items-center justify-center rounded-full bg-primary/10 text-primary'>
                  <UserIcon className='w-5 h-5' />
                </div>

                <div className='flex-1 space-y-1'>
                  <p className='text-sm sm:text-base text-foreground'>
                    {item.comment}
                  </p>
                  <p className='text-xs text-muted-foreground'>
                    {new Date(item.created_at).toLocaleString(undefined, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className='text-sm text-muted-foreground'>No comments yet!</p>
        )}
      </section>
    </motion.div>
  );
};

export default ViewClashItems;

const ClashCard = ({
  item,
  isWinner = false,
}: {
  item: ClashItem;
  isWinner?: boolean;
}) => {
  return (
    <div className='w-full max-w-sm flex flex-col items-center gap-4 relative p-5 bg-muted/40 rounded-2xl shadow border hover:shadow-md transition-all'>
      <div className='relative aspect-square w-full rounded-xl overflow-hidden border bg-background'>
        {isWinner && (
          <div className='absolute top-0 left-0 bg-green-600 text-white text-base font-bold px-3 py-1 rounded-br-md shadow-md z-10'>
            WINNER
          </div>
        )}

        <Image
          src={getImageUrl(item.image)}
          alt='Clash item'
          fill
          className='object-cover'
        />
      </div>

      <div className='text-lg font-semibold bg-white border border-border text-blue-600 dark:text-blue-400 px-5 py-1 rounded-full shadow-sm'>
        <CountUp start={0} end={item.count} duration={0.6} /> Votes
      </div>
    </div>
  );
};



