"use client";

import React, { Fragment, useState } from "react";
import Image from "next/image";
import { getImageUrl } from "@/lib/utils";
import CountUp from "react-countup";
import { Button } from "../ui/button";

type Props = {
  clash: ClashType;
};

const Clashing = ({ clash }: Props) => {
  const [clashComments, setClashComments] = useState(clash.clashComments);
  const [clashItems, setClashItems] = useState(clash.clashItem);

  const [comment, setComment] = useState("");
  return (
    <div className='mt-10'>
      <div className='flex flex-wrap lg:flex-nowrap justify-between items-center'>
        {clashItems &&
          clashItems?.length > 0 &&
          clashItems.map((item, idx) => {
            return (
              <Fragment key={item.id}>
                {/* first block */}
                <div className='w-full lg:w-[500px] flex justify-center items-center flex-col hover:bg-slate-100 hover:cursor-pointer transition-all'>
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
      <form className='mt-4 w-full'>
        <textarea
          placeholder='Type your suggestions...'
          value={comment}
          className='w-full p-4'
          onChange={(e) => setComment(e.target.value)}
        />
        <Button className='w-full mt-2'>Add Comment</Button>
      </form>
      {/* comments */}
      <div className='mt-4'>
        {clashComments &&
          clashComments.length > 0 &&
          clashComments.map((item, idx) => {
            return (
              <div
                className='w-ful md:w-[600px] rounded-lg p-4 bg-muted mb-4'
                key={item.id}>
                <p className='font-bold'>{item.comment}</p>
                <p>{new Date(item.create_at).toDateString()}</p>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Clashing;
