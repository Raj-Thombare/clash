"use client";

import React, { Fragment } from "react";
import Image from "next/image";
import { getImageUrl } from "@/lib/utils";
type Props = {
  clash: ClashType;
};

const ViewClashItems = ({ clash }: Props) => {
  return (
    <div className='mt-10'>
      <div className='flex flex-wrap lg:flex-nowrap justify-between items-center'>
        {clash.clashItem &&
          clash.clashItem?.length > 0 &&
          clash.clashItem.map((item, idx) => {
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
    </div>
  );
};

export default ViewClashItems;
