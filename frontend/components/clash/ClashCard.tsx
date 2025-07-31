"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getImageUrl } from "@/lib/utils";
import Image from "next/image";
import { Button } from "../ui/button";
import ClashCardMenu from "./ClashCardMenu";
import Link from "next/link";
import { motion } from "framer-motion";
import { toast } from "sonner";

type Props = {
  clash: ClashType;
  token: string;
  index?: number;
};

const ClashCard = ({ clash, token, index = 0 }: Props) => {
  const isExpired = new Date(clash.expire_at) < new Date();
  const statusLabel = isExpired ? "Expired" : "Live";
  const statusColor = isExpired ? "bg-red-500" : "bg-green-500";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className='h-full'>
      <Card className='h-full flex flex-col justify-between rounded-2xl shadow-sm border border-border hover:shadow-md transition-shadow duration-300'>
        <CardHeader className='flex flex-row items-start justify-between gap-2 flex-wrap'>
          <CardTitle className='text-lg font-semibold line-clamp-2 max-w-[80%]'>
            {clash.title}
          </CardTitle>
          <ClashCardMenu token={token} clash={clash} />
        </CardHeader>

        <CardContent className='flex flex-col gap-3 flex-grow'>
          {clash.image && (
            <div className='w-full aspect-video relative overflow-hidden rounded-lg border'>
              <span
                className={`absolute top-2 z-10 left-2 px-3 py-1 text-xs font-medium text-white rounded-full ${statusColor}`}>
                {statusLabel}
              </span>
              <Image
                src={getImageUrl(clash.image!)}
                alt={clash.title}
                fill
                className='object-cover'
                sizes='(max-width: 768px) 100vw, 33vw'
              />
            </div>
          )}

          <p className='text-base line-clamp-3 text-muted-foreground mb-2'>
            {clash.description}
          </p>

          <div className='flex items-center gap-2 text-base text-primary font-medium mt-auto'>
            <span role='img' aria-label='hourglass'>
              ⏳
            </span>
            <span>
              Expires:&nbsp;
              {new Date(clash.expire_at).toLocaleString(undefined, {
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
        </CardContent>

        <CardFooter className='pt-4'>
          <div className='flex w-full gap-2'>
            <Link href={`/clash/items/${clash.id}`} className='w-full'>
              <Button className='w-full'>View</Button>
            </Link>
            <Button
              className='w-full'
              variant='outline'
              onClick={() => {
                const url = `${window.location.origin}/clash/${clash.id}`;
                navigator.clipboard.writeText(url);
                toast.success("Link Copied!");
              }}>
              Share
            </Button>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default ClashCard;
