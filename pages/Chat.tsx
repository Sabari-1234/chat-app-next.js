
"use client"

import { cn } from '@/lib/utils';
import { useSession } from 'next-auth/react';


import React, { useEffect, useState } from 'react'

import { BsSend } from "react-icons/bs";

const Chat = ({ reciever }: any) => {

  const { data: session, status } = useSession()


  const [chatForm, setchatForm] = useState<any>({ text: "" });
  const [chatData, setchatData] = useState<any>([]);
  //get data

  const getMsg = async () => {
    try {
      const res = await fetch("../api/chat")
      console.log(res)
      const data = await res.json();
      console.log(data)
      const filteredData = data.filter((msg: any) => (msg.sender === session?.user?.email && msg.reciever === reciever) || (msg.sender === reciever && msg.reciever === session?.user?.email))
      console.log(filteredData)
      setchatData(filteredData);
    } catch (error) {
      console.log(error)
    }
  }

  //post data
  const sentMsg = async () => {
    const chat = { ...chatForm, time: new Date(), sender: session?.user?.email, reciever: reciever }
    try {
      const res = await fetch("../api/chat", { method: "POST", body: JSON.stringify(chat) })
      console.log(res)
      getMsg()
    } catch (error) {
      console.log(error)
    }

  }

  useEffect(() => {
    getMsg()

    console.log(chatData)
  }, [session])




  return (

    <div className=' flex flex-col justify-center h-screen  items-center  pb-10  bg-[whitesmoke]'>
      {/* <p>{session?.user?.email}</p>
      {session?.user?.image ? (
        <img className='h-20 w-20 rounded-full border-2 shadow-2xl' src={session.user.image} alt="no data" />
      ) : (
        <p>No data</p>

      )} */}
      <div className=' h-[80%]'>

        <div className='overflow-y-auto h-full mb-6 scrollbar-hide overflow-x-clip'>
          {chatData.length !== 0 ? chatData?.map((chat: any, id: any) => (
            <div className={cn('flex w-full flex-col',
              chat.sender === session?.user?.email ? ' items-end' : ' items-start'
            )} key={id} >
              <p className={cn('border  min-w-28  p-2 rounded-b-xl mt-3 text-zinc-500 max-w-96 h-fit break-words', chat.sender === session?.user?.email ? 'rounded-s-xl' : ' rounded-e-xl')}>
                <span className='block w-full'>{chat.text}</span>
                <span className='text-[12px] block text-end'>{new Date(chat.time).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
              </p>
            </div>
          )) : <p>no chat</p>}
        </div>
        <div className=' sticky  flex items-center'>
          <input type="text" placeholder="Enter message..." value={chatForm.text} onChange={e => setchatForm({ ...chatForm, text: e.target.value })} className=' border border-zinc-200 rounded-lg h-10 w-[30rem]  mr-3 pl-2 outline-none' />
          <button onClick={() => sentMsg()}><BsSend className=' size-6 text-zinc-500' /></button>

        </div>
      </div>
    </div>
  )
}

export default Chat
