import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Props = {
  name: string;
};

function UserAvatar({ name }: Props) {
  return (
    <Avatar>
      <AvatarImage src='https://github.com/shadcn.png' />
      <AvatarFallback>{name[0]}</AvatarFallback>
    </Avatar>
  );
}

export default UserAvatar;
