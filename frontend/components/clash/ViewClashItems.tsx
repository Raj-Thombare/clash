"use client";

import React, { Fragment, useEffect, useState } from "react";
import Image from "next/image";
import { getImageUrl } from "@/lib/utils";
import CountUp from "react-countup";
import socket from "@/lib/socket";

type Props = {
  clash: ClashType;
};

const ViewClashItems = ({ clash }: Props) => {
  const [clashComments, setClashComments] = useState(clash.clashComments);
  const [clashItems, setClashItems] = useState(clash.clashItem);

  const updateComment = (payload: any) => {
    if (clashComments && clashComments.length > 0) {
      setClashComments([payload, ...clashComments!]);
    } else {
      setClashComments([payload]);
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

  useEffect(() => {
    socket.on(`clashing-${clash.id}`, (data) => {
      updateCounter(data?.clashItemId);
    });

    socket.on(`clashing_comment-${clash.id}`, (data) => {
      updateComment(data);
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
                    />
                  </div>

                  <CountUp
                    start={0}
                    end={item.count}
                    duration={0.5}
                    className='text-5xl font-extrabold bg-gradient-to-l from-blue-900 to-blue-500 text-transparent bg-clip-text mt-4'
                  />
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

export default ViewClashItems;
