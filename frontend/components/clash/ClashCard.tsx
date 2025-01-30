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

type Props = {
  clash: ClashType;
  token: string;
};

const ClashCard = ({ clash, token }: Props) => {
  return (
    <Card>
      <CardHeader className='flex justify-between items-center flex-row'>
        <CardTitle className='text-xl'>{clash.title}</CardTitle>
        <ClashCardMenu token={token} clash={clash} />
      </CardHeader>
      <CardContent className='h-auto'>
        {clash.image && (
          <Image
            src={getImageUrl(clash.image!)}
            alt={clash.title}
            width={500}
            height={500}
            className='rounded-md w-full h-[220px] object-contain'
          />
        )}
        <p className='my-2'>{clash.description}</p>
        <p>
          <strong>Expire At:</strong> {new Date(clash.expire_at).toDateString()}
        </p>
      </CardContent>
      <CardFooter>
        <Link href={`/clash/items/${clash.id}`}>
          <Button>Item</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ClashCard;
