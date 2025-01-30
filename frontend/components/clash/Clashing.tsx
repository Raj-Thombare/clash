"use client";

import React, { Fragment, useState, useEffect } from "react";
import Image from "next/image";
import { getImageUrl } from "@/lib/utils";
import CountUp from "react-countup";
import { Button } from "../ui/button";
import { ThumbsUp } from "lucide-react";
import socket from "@/lib/socket";
import { toast } from "sonner";

type Props = {
  clash: ClashType;
};

const Clashing = ({ clash }: Props) => {
  const [clashComments, setClashComments] = useState(clash.clashComments);
  const [clashItems, setClashItems] = useState(clash.clashItem);
  const [comment, setComment] = useState("");
  const [hideVote, setHideVote] = useState(false);

  const handleVote = (id: number) => {
    if (clashItems && clashItems.length > 0) {
      setHideVote(true);
      updateCounter(id);
      //socket list
      socket.emit(`clashing-${clash.id}`, {
        clashId: clash.id,
        clashItemId: id,
      });
    }
  };

  const updateCounter = (id: number) => {
    const items = [...clashItems];
    const findIndex = clashItems.findIndex((item) => item.id === id);
    if (findIndex !== -1) {
      items[findIndex].count += 1;
    }
    setClashItems(items);
  };

  const updateComment = (payload: any) => {
    if (clashComments && clashComments.length > 0) {
      setClashComments([payload, ...clashComments!]);
    } else {
      setClashComments([payload]);
    }
  };

  const handleComment = (event: React.FormEvent) => {
    event.preventDefault();
    if (comment.length > 2) {
      const payload = {
        id: clash.id,
        comment: comment,
        created_at: new Date().toDateString(),
      };
      socket.emit(`clashing_comment-${clash.id}`, payload);
      updateComment(payload);
      setComment("");
    } else {
      toast.warning("Please type at least 2 words");
    }
  };

  useEffect(() => {
    socket.on(`clashing-${clash.id}`, (data) => [
      updateCounter(data?.clashItemId),
    ]);

    socket.on(`clashing_comment-${clash.id}`, (payload) => {
      updateComment(payload);
    });
  }, []);

  return (
    <div className='mt-10'>
      <div className='flex flex-wrap lg:flex-nowrap justify-between items-center'>
        {clashItems &&
          clashItems?.length > 0 &&
          clashItems.map((item, idx) => {
            return (
              <Fragment key={item.id}>
                {/* first block */}
                <div className='w-full lg:w-[500px] flex justify-center items-center flex-col hover:cursor-pointer transition-all'>
                  <div className='w-full flex justify-center items-center rounded-md p-2 h-[300px]'>
                    <Image
                      src={getImageUrl(item.image)}
                      alt='image 1 preview'
                      width={500}
                      height={500}
                      className='w-full h-[300px] object-contain'
                      priority
                    />
                  </div>
                  {hideVote ? (
                    <CountUp
                      start={0}
                      end={item.count}
                      duration={0.5}
                      className='text-5xl font-extrabold bg-gradient-to-l from-blue-900 to-blue-500 text-transparent bg-clip-text mt-4'
                    />
                  ) : (
                    <Button
                      className='my-5'
                      onClick={() => handleVote(item.id)}>
                      <span className='mr-2 text-lg'>Vote</span> <ThumbsUp />
                    </Button>
                  )}
                </div>

                {/* VS block */}
                {idx % 2 === 0 && (
                  <div className='w-full flex lg:w-auto justify-center items-center'>
                    <h1 className='text-5xl font-extrabold bg-gradient-to-l from-blue-900 to-blue-500 text-transparent bg-clip-text'>
                      VS
                    </h1>
                  </div>
                )}
              </Fragment>
            );
          })}
      </div>
      <form
        className='mt-4 w-full flex flex-col items-center justify-center'
        onSubmit={handleComment}>
        <textarea
          placeholder='Add a public comment...'
          value={comment}
          className='p-4 w-[60%]'
          onChange={(e) => setComment(e.target.value)}
        />
        <Button className='mt-2 w-32'>Add Comment</Button>
      </form>
      {/* comments */}
      <div className='mt-4'>
        <h2 className='font-bold text-xl'>Comments</h2>
        <div className='mt-4'>
          {clashComments && clashComments.length > 0 ? (
            clashComments.map((item, idx) => {
              return (
                <div
                  className='w-full md:w-[600px] rounded-lg p-4 bg-muted mb-4'
                  key={idx}>
                  <p className='font-medium'>{item.comment}</p>
                  <p>{new Date(item.created_at).toDateString()}</p>
                </div>
              );
            })
          ) : (
            <div className='text-sm'>No comments yet!</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Clashing;
