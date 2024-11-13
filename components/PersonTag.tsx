import React from "react";
import { IoInformationCircleOutline } from "react-icons/io5";

const PersonTag = ({ member }: any) => {
  return (
    <div className="flex items-center justify-between w-[565px] border rounded-full p-2 bg-zinc-200">
      <img src={member?.image} alt="" className="size-10 rounded-full" />
      <p className="text-zinc-500">{member?.name}</p>
      <IoInformationCircleOutline className="size-10 text-zinc-500" />
    </div>
  );
};

export default PersonTag;
