
// "use client"

// import { cn } from '@/lib/utils';
// import { useSession } from 'next-auth/react';


// import React, { useEffect, useRef, useState } from 'react'

// import { BsSend } from "react-icons/bs";
// import { io } from 'socket.io-client';
// const socket = io('http://localhost:3000');

// const Chat = ({ reciever }: any) => {
//   if (!useSession()) {
//     return <p>Please sign in to access the chat.</p>;
//   }
//   const { data: session } = useSession()


//   const [chatForm, setchatForm] = useState<any>({ text: "" });
//   const [chatData, setchatData] = useState<any>([]);
//   const messagesEndRef = useRef<HTMLDivElement>(null);
//   const chatInputRef = useRef<HTMLInputElement>(null);
//   // Scroll to bottom function
//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };
//   //get data

//   const getMsg = async () => {
//     try {
//       const res = await fetch("../api/chat")
//       console.log(res)
//       const data = await res.json();

//       const filteredData = data.filter((msg: any) => (msg.sender === sender && msg.reciever === reciever) || (msg.sender === reciever && msg.reciever === sender))

//       setchatData(filteredData);
//       scrollToBottom();
//     } catch (error) {
//       console.log(error)
//     }
//   }

//   //post data
//   const sentMsg = async (chatForm: any) => {
//     console.log("chatForm")
//     const chat = { ...chatForm, time: new Date(), sender: sender, reciever: reciever }
//     // Emit the message to the server

//     socket.emit('message1', chat);

//     try {
//       await fetch("../api/chat", { method: "POST", body: JSON.stringify(chat) })

//     } catch (error) {
//       console.log(error)
//     }
//     setchatForm({ ...chatForm, text: '' })
//     scrollToBottom();

//   }

//   const onKeyDown = (e: any) => {
//     console.log("object")
//     if (e.key === 'Enter') {
//       e.preventDefault();
//       sentMsg(chatForm)
//     }
//     chatInputRef.current?.focus()
//   }

//   useEffect(() => {
//     document.addEventListener('keydown', onKeyDown);

//     return () => {
//       document.removeEventListener('keydown', onKeyDown);
//     };
//   }, []);

//   useEffect(() => {
//     getMsg()
//   }, [session])

//   useEffect(() => {
//     // Listen for incoming messages

//     socket.on('message2', (msg) => {
//       setchatData((prevMessages: any) => [...prevMessages, msg]);
//     });

//     // Cleanup on component unmount
//     return () => {
//       socket.off('message2');
//     };
//   }, []);

//   useEffect(() => {

//     console.log('lll')
//     scrollToBottom()
//   }, [chatData.length])


//   return (

//     <div className=' flex flex-col justify-center h-screen  items-center  pb-10  bg-[whitesmoke]' >
//       {/* <p>{sender}</p>
//       {session?.user?.image ? (
//         <img className='h-20 w-20 rounded-full border-2 shadow-2xl' src={session.user.image} alt="no data" />
//       ) : (
//         <p>No data</p>

//       )} */}
//       <div className=' h-[80%]'>

//         <div className='overflow-y-auto h-full mb-6  scrollbar-hide overflow-x-clip'>
//           {chatData.length !== 0 ? chatData?.map((chat: any, id: any) => (
//             <div className={cn('flex w-full flex-col',
//               chat.sender === sender ? ' items-end' : ' items-start'
//             )} key={id} >
//               <p className={cn('border  min-w-28  p-2 rounded-b-xl mt-3 text-zinc-500 max-w-96 h-fit break-words', chat.sender === sender ? 'rounded-s-xl' : ' rounded-e-xl')}>
//                 <span className='block w-full'>{chat.text}</span>
//                 <span className='text-[12px] block text-end'>{new Date(chat.time).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
//               </p>
//             </div>
//           )) : <p>no chat</p>}
//           <div ref={messagesEndRef} />
//         </div>
//         <div className=' sticky  flex items-center'>
//           <input type="text" placeholder="Enter message..." value={chatForm.text} ref={chatInputRef} onChange={(e: any) => { console.log(chatForm); setchatForm({ ...chatForm, text: e.target.value }) }} className=' border border-zinc-200 rounded-lg h-10 w-[30rem]  mr-3 pl-2 outline-none' autoFocus />
//           <button onClick={() => sentMsg(chatForm)}><BsSend className=' size-6 text-zinc-500' /></button>

//         </div>
//       </div>
//     </div>
//   )
// }

// export default Chat
"use client";

import { cn } from '@/lib/utils';
import { socket } from '@/socket';
import { useSession } from 'next-auth/react';

import React, { useEffect, useRef, useState } from 'react';
import { BsSend } from "react-icons/bs";


const Chat = ({ reciever }: any) => {
  if (!useSession()) {
    return <p>Please sign in to access the chat.</p>;
  }
  const { data: session } = useSession();

  const [chatForm, setchatForm] = useState<any>({ text: "" });
  const [chatData, setchatData] = useState<any>([]);
  const [typingStatus, settypingStatus] = useState<any>(null)
  const [onlineStatus, setonlineStatus] = useState<any>("Offline")
  const [sender] = useState(session?.user?.email)
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatInputRef = useRef<HTMLInputElement>(null);

  // Scroll to bottom function
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const typingHandler = (e: any) => {
    setchatForm({ ...chatForm, text: e.target.value })
    socket.emit('typing1', { reciever: reciever, text: "Typing..." });
    setTimeout(() => { socket.emit('typing1', { reciever: reciever, text: null }); }, 2000)

  }

  // Get data
  const getMsg = async () => {
    try {
      const res = await fetch("../api/chat");
      console.log(res);
      const data = await res.json();

      const filteredData = data.filter((msg: any) =>
        (msg.sender === sender && msg.reciever === reciever) ||
        (msg.sender === reciever && msg.reciever === sender)
      );

      setchatData(filteredData);
      setchatForm({ ...chatForm, text: '' })
      scrollToBottom();
    } catch (error) {
      console.log(error);
    }
  };

  // Post data
  const sentMsg = async (chatForm: any) => {
    const chat = { ...chatForm, time: new Date(), sender: sender, reciever: reciever };
    socket.emit('message1', chat);

    try {
      await fetch("../api/chat", { method: "POST", body: JSON.stringify(chat) });
    } catch (error) {
      console.log(error);
    }
    setchatForm({ text: '' });
    scrollToBottom();
  };

  const handleKeyDown = (e: any) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      sentMsg(chatForm);
    }
  };

  const inputFocus = (e: any) => {
    chatInputRef.current?.focus()
  }

  const getRecieverStatus = async () => {
    const res = await fetch(`../api/user/${reciever}`)
    const data = await res.json()
    console.log(data)
    setonlineStatus(data.status)
  }

  useEffect(() => {
    getMsg();
  }, [session]);

  useEffect(() => {
    socket.on('message2', (msg) => {
      setchatData((prevMessages: any) => [...prevMessages, msg]);
    });
    socket.on('typing2', (data) => {
      if (data.reciever === sender) {
        settypingStatus(data.text)
      }
    });
    socket.on('online2', (data) => {
      console.log(data)
      if (data.sender === reciever) {
        setonlineStatus(data.text)
      }
    });
    return () => {
      socket.off('message2');
      socket.off('typing2')
      socket.off('online2')
    };
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [chatData.length]);



  useEffect(() => {
    getRecieverStatus()
    document.addEventListener('keydown', inputFocus);


    return () => {
      document.removeEventListener('keydown', inputFocus);
    };
  }, []);

  return (
    <div className='flex flex-col justify-center h-screen items-center pb-10 bg-[whitesmoke]'>
      <p>{typingStatus ? typingStatus : onlineStatus}</p>
      <div className='h-[80%]'>
        <div className='overflow-y-auto h-full mb-6 scrollbar-hide overflow-x-clip'>
          {chatData.length !== 0 ? chatData?.map((chat: any, id: any) => (
            <div className={cn('flex w-full flex-col', chat.sender === sender ? 'items-end' : 'items-start')} key={id}>
              <p className={cn('border min-w-28 p-2 rounded-b-xl mt-3 text-zinc-500 max-w-96 h-fit break-words', chat.sender === sender ? 'rounded-s-xl' : 'rounded-e-xl')}>
                <span className='block w-full'>{chat.text}</span>
                <span className='text-[12px] block text-end'>{new Date(chat.time).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
              </p>
            </div>
          )) : <p>No chat</p>}
          <div ref={messagesEndRef} />
        </div>
        <div className='sticky flex items-center'>
          <input
            type="text"
            placeholder="Enter message..."
            value={chatForm.text}
            ref={chatInputRef}
            onChange={typingHandler}
            onKeyDown={handleKeyDown}
            className='border border-zinc-200 rounded-lg h-10 w-[30rem] mr-3 pl-2 outline-none'
            autoFocus
          />
          <button onClick={() => sentMsg(chatForm)}><BsSend className='size-6 text-zinc-500' /></button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
