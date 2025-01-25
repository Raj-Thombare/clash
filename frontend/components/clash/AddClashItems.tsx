"use client";

import { Upload } from "lucide-react";
import React, { useState, useRef, ChangeEvent } from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import axios, { AxiosError } from "axios";
import { CLASH_ITEMS_URL } from "@/lib/apiEndPoints";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type Props = {
  token: string;
  clashId: number;
};

const AddClashItems = ({ token, clashId }: Props) => {
  const router = useRouter();
  const [items, setItems] = useState<Array<ClashItemForm>>([
    { image: null },
    { image: null },
  ]);
  const [urls, setUrls] = useState(["", ""]);
  const [loading, setLoading] = useState(false);

  const img1Ref = useRef<HTMLInputElement | null>(null);
  const img2Ref = useRef<HTMLInputElement | null>(null);

  const handleImageChange = (
    event: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const file = event.target.files?.[0];

    if (file) {
      const updatedItems = [...items];
      updatedItems[index].image = file;
      setItems(updatedItems);
      const imageUrl = URL.createObjectURL(file);
      const updatedUrls = [...urls];
      updatedUrls[index] = imageUrl;
      setUrls(updatedUrls);
    }
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("id", clashId.toString());
      items.map((item) => {
        if (item.image) formData.append(`images[]`, item.image);
      });

      if (formData.get("images[]")) {
        setLoading(true);
        const { data } = await axios.post(CLASH_ITEMS_URL, formData, {
          headers: {
            Authorization: token,
          },
        });

        if (data?.message) {
          toast.success(data?.message);
          setTimeout(() => {
            router.push("/dashboard");
          }, 1000);
        }
        setLoading(false);
      } else {
        toast.warning("Please upload both images");
      }
    } catch (error) {
      setLoading(false);
      if (error instanceof AxiosError) {
        if (error.response?.status === 422) {
          if (error?.response?.data?.errors) {
            error?.response?.data?.errors?.map((err: string) =>
              toast.error(err)
            );
          }
        }
      } else {
        toast.error("Something went wrong. Please try again!");
      }
    }
  };
  return (
    <div className='mt-10'>
      <div className='flex flex-wrap lg:flex-nowrap justify-between items-center'>
        {/* first block */}
        <div className='w-full lg:w-[500px] flex justify-center items-center flex-col hover:bg-slate-100 hover:cursor-pointer transition-all'>
          <input
            type='file'
            className='hidden'
            ref={img1Ref}
            onChange={(event) => handleImageChange(event, 0)}
          />
          <div
            className='w-full flex justify-center items-center rounded-md border-2 border-dashed p-2 h-[300px]'
            onClick={() => img1Ref?.current?.click()}>
            {urls.length > 0 && urls?.[0] !== "" ? (
              <Image
                src={urls?.[0]}
                alt='image 1 preview'
                width={500}
                height={500}
                className='w-full h-[300px] object-contain'
              />
            ) : (
              <h1 className='flex items-center space-x-2 text-lg text-gray-600'>
                <Upload /> <span>Upload File</span>
              </h1>
            )}
          </div>
        </div>

        {/* VS block */}
        <div className='w-full flex lg:w-auto justify-center items-center'>
          <h1 className='text-5xl font-extrabold bg-gradient-to-l from-blue-900 to-blue-500 text-transparent bg-clip-text'>
            VS
          </h1>
        </div>

        {/* second block */}
        <div className='w-full lg:w-[500px] flex justify-center items-center flex-col hover:bg-slate-100 hover:cursor-pointer transition-all'>
          <input
            type='file'
            className='hidden'
            ref={img2Ref}
            onChange={(event) => handleImageChange(event, 1)}
          />
          <div
            className='w-full flex justify-center items-center rounded-md border-2 border-dashed p-2 h-[300px]'
            onClick={() => img2Ref?.current?.click()}>
            {urls.length > 0 && urls?.[1] !== "" ? (
              <Image
                src={urls?.[1]}
                alt='image 2 preview'
                width={500}
                height={500}
                className='w-full h-[300px] object-contain'
              />
            ) : (
              <h1 className='flex items-center space-x-2 text-lg text-gray-600'>
                <Upload /> <span>Upload File</span>
              </h1>
            )}
          </div>
        </div>
      </div>

      <div className='text-center my-4'>
        <Button className='w-52' onClick={handleSubmit} disabled={loading}>
          {loading ? "Processing" : "Submit"}
        </Button>
      </div>
    </div>
  );
};

export default AddClashItems;
