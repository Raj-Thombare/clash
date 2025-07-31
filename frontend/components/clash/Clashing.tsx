"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { getImageUrl } from "@/lib/utils";
import CountUp from "react-countup";
import { Button } from "../ui/button";
import { ThumbsUp, UserIcon } from "lucide-react";
import socket from "@/lib/socket";
import { toast } from "sonner";
import { motion } from "motion/react";

type Props = {
  clash: ClashType;
};

const Clashing = ({ clash }: Props) => {
  const [clashComments, setClashComments] = useState(clash.clashComments);
  const [clashItems, setClashItems] = useState(clash.clashItem);
  const [comment, setComment] = useState("");
  const [hideVote, setHideVote] = useState(false);

  const handleVote = (id: number) => {
    if (!hideVote) {
      setHideVote(true);
      updateCounter(id);
      socket.emit(`clashing-${clash.id}`, {
        clashId: clash.id,
        clashItemId: id,
      });
    }
  };

  const updateCounter = (id: number) => {
    setClashItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, count: item.count + 1 } : item
      )
    );
  };

  const updateComment = (payload: any) => {
    setClashComments((prev) => [payload, ...(prev || [])]);
  };

  const handleComment = (event: React.FormEvent) => {
    event.preventDefault();
    if (comment.trim().length > 2) {
      const payload = {
        id: clash.id,
        comment: comment,
        created_at: new Date().toISOString(),
      };
      socket.emit(`clashing_comment-${clash.id}`, payload);
      updateComment(payload);
      setComment("");
    } else {
      toast.warning("Please type at least 2 words");
    }
  };

  useEffect(() => {
    socket.on(`clashing-${clash.id}`, (data) =>
      updateCounter(data?.clashItemId)
    );
    socket.on(`clashing_comment-${clash.id}`, (payload) =>
      updateComment(payload)
    );
  }, []);

  return (
    <div className='mt-12 space-y-16'>
      <div className='flex flex-col lg:flex-row justify-center items-center gap-8'>
        {clashItems.length === 2 ? (
          <>
            <ClashCard
              item={clashItems[0]}
              hideVote={hideVote}
              handleVote={handleVote}
            />
            <div className='flex justify-center items-center px-4'>
              <div className='flex items-center justify-center text-3xl'>
                ⚔️
              </div>
            </div>
            <ClashCard
              item={clashItems[1]}
              hideVote={hideVote}
              handleVote={handleVote}
            />
          </>
        ) : (
          clashItems.map((item) => (
            <ClashCard
              key={item.id}
              item={item}
              hideVote={hideVote}
              handleVote={handleVote}
            />
          ))
        )}
      </div>

      <form
        onSubmit={handleComment}
        className='mt-8 flex flex-col items-end gap-3 max-w-2xl mx-auto w-full'>
        <textarea
          placeholder='Add a public comment...'
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className='w-full min-h-[100px] px-4 py-3 rounded-xl border border-border bg-muted/30 backdrop-blur-sm shadow-sm resize-none focus:outline-none text-sm placeholder:text-muted-foreground'
        />
        <Button className='w-36'>Add Comment</Button>
      </form>

      <section className='max-w-2xl mx-auto w-full'>
        <h2 className='text-2xl font-semibold mb-1 text-neutral-900 dark:text-neutral-100'>
          Comments
        </h2>
        <div className='w-full h-px bg-border mb-4' />

        {clashComments.length > 0 ? (
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
    </div>
  );
};

export default Clashing;

const ClashCard = ({
  item,
  hideVote,
  handleVote,
}: {
  item: ClashItem;
  hideVote: boolean;
  handleVote: (id: number) => void;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className='w-full max-w-sm flex flex-col items-center gap-4 relative p-5 bg-muted/40 rounded-2xl shadow border hover:shadow-md transition-all'>
      <div className='relative aspect-square w-full rounded-xl overflow-hidden border bg-background'>
        <Image
          src={getImageUrl(item.image)}
          alt='Clash item'
          fill
          className='object-cover'
        />
      </div>

      {hideVote ? (
        <div className='text-lg font-semibold bg-white border border-border text-blue-600 dark:text-blue-400 px-5 py-1 rounded-full shadow-sm'>
          <CountUp start={0} end={item.count} duration={0.6} /> Votes
        </div>
      ) : (
        <Button
          onClick={() => handleVote(item.id)}
          className='group inline-flex items-center gap-2 px-6 py-2 text-base font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:from-blue-700 hover:to-indigo-700'>
          <ThumbsUp className='w-5 h-5 group-hover:scale-110 transition-transform' />
          Vote
        </Button>
      )}
    </motion.div>
  );
};
