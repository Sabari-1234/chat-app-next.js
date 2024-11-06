"use client";
import { socket } from "@/socket";
import PersonTag from "@/utils/components/PersonTag";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IoInformationCircleOutline } from "react-icons/io5";

const ChatHome = () => {
  console.log(useSession().status);
  if (useSession && useSession().status === "unauthenticated") {
    return <p>Please sign in to access the chat.</p>;
  }
  const [Members, setMembers] = useState<any>();
  const { data: session } = useSession();
  const getUsers = async () => {
    if (session) {
      const res = await fetch("/api/user");
      const members = await res.json();
      console.log("mm");
      console.log(members);
      setMembers(members);
    }
  };

  useEffect(() => {
    getUsers();
  }, [session]);

  return (
    <div className=" py-6">
      {Members && Members.length > 1 ? (
        Members.map((member: any, id: any) => (
          <div key={id} className=" flex flex-col items-center">
            {member.email !== session?.user?.email && (
              // <div>
              //   <Link href={`/chatHome/${member.email}`}>{member.email}</Link>
              //   <br />
              // </div>
              <Link href={`/chatHome/${member.email}`}>
                {/* <div className="flex items-center justify-between w-[565px] border rounded-full p-2 bg-zinc-200">
                  <img
                    src={member?.image}
                    alt=""
                    className="size-10 rounded-full"
                  />
                  <p className="text-zinc-500">{member?.name}</p>
                  <IoInformationCircleOutline className="size-10 text-zinc-500" />
                </div> */}
                <PersonTag member={member} />
              </Link>
            )}
          </div>
        ))
      ) : (
        <p>no chats found</p>
      )}
    </div>
  );
};

export default ChatHome;
