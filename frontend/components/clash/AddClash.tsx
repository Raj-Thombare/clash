"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { CLASH_URL } from "@/lib/apiEndPoints";
import { CustomUser } from "@/app/api/auth/[...nextauth]/options";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";

type Props = {
  user: CustomUser;
};

const AddClash = ({ user }: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [clashData, setClashData] = useState<ClashFormType>({});
  const [date, setDate] = useState<Date | null>();
  const [image, setImage] = useState<File | null>(null);
  const [errors, setErrors] = useState<ClashFormTypeError>({});

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) setImage(file);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("title", clashData?.title ?? "");
      formData.append("description", clashData?.description ?? "");
      formData.append("expire_at", date?.toISOString() ?? "");
      if (image) formData.append("image", image);

      const { data } = await axios.post(CLASH_URL, formData, {
        headers: {
          Authorization: user.token,
        },
      });

      setLoading(false);
      if (data?.message) {
        setClashData({});
        setDate(null);
        setImage(null);
        setErrors({});
        toast.success("Clash added successfully!");
        setOpen(false);
      }
    } catch (error) {
      setLoading(false);
      if (error instanceof AxiosError) {
        if (error.response?.status == 422) {
          setErrors(error.response.data?.errors);
        } else {
          toast.error("Something went wrong! please try again.");
        }
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Clash</Button>
      </DialogTrigger>
      <DialogContent onInteractOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Create Clash</DialogTitle>
        </DialogHeader>
        <form>
          <div className='mt-4'>
            <Label htmlFor='title'>Title</Label>
            <Input
              id='title'
              value={clashData?.title ?? ""}
              onChange={(e) => {
                setClashData({ ...clashData, title: e.target.value });
              }}
              placeholder='Enter your title here...'
            />
            <span className='text-red-500'>{errors.title}</span>
          </div>
          <div className='mt-4'>
            <Label htmlFor='description'>Description</Label>
            <Textarea
              value={clashData?.description ?? ""}
              id='description'
              onChange={(e) => {
                setClashData({ ...clashData, description: e.target.value });
              }}
              placeholder='Enter your description here...'
            />
            <span className='text-red-500'>{errors.description}</span>
          </div>
          <div className='mt-4'>
            <Label htmlFor='image'>Image</Label>
            <Input
              id='image'
              type='file'
              onChange={handleImageChange}
              placeholder='Upload your here...'
            />
            <span className='text-red-500'>{errors.image}</span>
          </div>
          <div className='mt-4'>
            <Label htmlFor='expireAt' className='block'>
              Expire At
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "justify-start text-left font-normal w-full mt-2",
                    !date && "text-muted-foreground"
                  )}>
                  <CalendarIcon className='mr-2 h-4 w-4' />
                  {date ? date.toDateString() : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className='w-auto p-0'>
                <Calendar
                  mode='single'
                  selected={date ?? new Date()}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <span className='text-red-500'>{errors.expire_at}</span>
          </div>
          <div className='mt-4'>
            <Button
              className='w-full'
              disabled={loading}
              onClick={handleSubmit}>
              {loading ? "Processing..." : "Submit"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddClash;
