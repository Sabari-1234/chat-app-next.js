"use client";

import { cn } from "@/lib/utils";
import { socket } from "@/socket";
import { useSession } from "next-auth/react";

import React, { useEffect, useRef, useState } from "react";
import { GrSend } from "react-icons/gr";
import { IoSaveOutline } from "react-icons/io5";
import { RiAttachment2 } from "react-icons/ri";
import { IoClose } from "react-icons/io5";
import { IoInformationCircleOutline } from "react-icons/io5";
import PersonTag from "@/utils/components/PersonTag";
import EmojiPicker from 'emoji-picker-react';
const Chat = ({ reciever }: any) => {
  if (!useSession()) {
    return <p>Please sign in to access the chat.</p>;
  }
  const { data: session } = useSession();

  const [chatForm, setchatForm] = useState<any>({ text: "" });
  const [chatData, setchatData] = useState<any>([]);
  const [typingStatus, settypingStatus] = useState<any>(null);
  const [onlineStatus, setonlineStatus] = useState<any>("Offline");
  const [receiverInfo, setReceiverInfo] = useState({ name: "", image: "" });
  const [sender] = useState(session?.user?.email);
  const [isEdit, setIsEdit] = useState<any>({
    value: false,
    id: null,
    text: "",
  });
  const [showAttachmentOptions, setShowAttachmentOptions] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatInputRef = useRef<HTMLTextAreaElement>(null);
  const editInputRef = useRef<HTMLTextAreaElement>(null);
  const [imageFullView, setImageFullView] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  // Scroll to bottom function
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const setHeightOfInputBox = (send: boolean) => {
    const textarea = chatInputRef.current;
    if (textarea) {
      textarea.style.height = "auto"; // Reset the height
      !send && (textarea.style.height = `${textarea.scrollHeight}px`);
    }
  };

  const typingHandler = (e: any) => {
    setHeightOfInputBox(false);
    setchatForm({ ...chatForm, text: e.target.value });
    socket.emit("typing1", { reciever: reciever, text: "Typing..." });
    setTimeout(() => {
      socket.emit("typing1", { reciever: reciever, text: null });
    }, 2000);
  };

  // Get data
  const getMsg = async (scroll = true) => {
    try {
      const res = await fetch("../api/chat");
      const data = await res.json();

      const filteredData = data.filter(
        (msg: any) =>
          (msg.sender === sender && msg.reciever === reciever) ||
          (msg.sender === reciever && msg.reciever === sender)
      );

      setchatData(filteredData);
      // setchatForm({ ...chatForm, text: '' })
      if (scroll) scrollToBottom();
    } catch (error) {
      console.log(error);
    }
  };

  // Post data
  const sentMsg = async (chatForm: any) => {
    setShowAttachmentOptions(false);
    const chat = {
      ...chatForm,
      time: new Date(),
      sender: sender,
      reciever: reciever,
    };
    socket.emit("message1", chat);

    try {
      await fetch("../api/chat", {
        method: "POST",
        body: JSON.stringify(chat),
      });
    } catch (error) {
      console.log(error);
    }
    setchatForm({ text: "" });
    // scrollToBottom();
    setHeightOfInputBox(true);

    getMsg();
  };
  const editMsg = async () => {
    const chat = { id: isEdit.id, text: isEdit.text };
    // socket.emit('message1', chat);
    try {
      await fetch("../api/chat", {
        method: "PATCH",
        body: JSON.stringify(chat),
      });
    } catch (error) {
      console.log(error);
    }
    getMsg(false);
    setIsEdit({ value: false, id: null, text: "" });
  };
  const deleteForEveryOne = async (id: any) => {
    try {
      await fetch(`../api/chat/${id}`, { method: "DELETE" });
    } catch (error) {
      console.log(error);
    }
    getMsg(false);
  };
  const handleKeyDown = (e: any) => {
    if (e.key === "Enter") {
      e.preventDefault();
      !isEdit.value ? sentMsg(chatForm) : editMsg();
    }
  };

  const inputFocus = (e: any) => {
    isEdit.value
      ? editInputRef.current?.focus()
      : chatInputRef.current?.focus();
  };

  const getRecieverInfo = async () => {
    const res = await fetch(`../api/user/${reciever}`);
    const data = await res.json();
    console.log(data);
    setReceiverInfo(data);
    data&&setonlineStatus(data?.status);
  };

  // const isAtBottom = () => {
  //   if (chatContainerRef.current) {
  //     const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
  //     return scrollHeight - scrollTop <= clientHeight + 20; // 20px tolerance
  //   }
  //   return false;
  // };
  // useEffect(() => {
  //   isAtBottom()&&scrollToBottom();
  // }, [chatData.length]);
  const handleFileChange = (event: any) => {
    const file = event.target.files[0]; // Get the first selected file

    if (file) {
      const reader = new FileReader(); // Create a FileReader instance
      reader.onloadend = () => {
        const base64String = reader.result; // The result is in Base64 format
        if (showAttachmentOptions)
          setchatForm({ ...chatForm, text: base64String });
        if (isEdit.value) setIsEdit({ ...isEdit, text: base64String });
        console.log("received");
      };
      reader.readAsDataURL(file); // Read the file as a data URL (Base64)
    }
  };

  function isBase64Image(base64String: string) {
    // Check if input is a string
    if (typeof base64String !== "string") return false;
    // Remove any whitespace
    const trimmedString = base64String.trim();
    // Check if the trimmed string starts with any doc prefix
    if (trimmedString.startsWith("data:image/")) {
      return "image";
    } else if (trimmedString.startsWith("data:video/")) {
      return "video";
    } else if (trimmedString.startsWith("data:audio/")) {
      return "audio";
    } else return "text";
  }
  const fullScreen = (imgUrl: string) => {
    setImageFullView(imgUrl);
  };
  const openAttachment = () => {
    setchatForm({ ...chatForm, text: "" });
    setShowAttachmentOptions((c) => !c);
  };

  const onEmojiClick=(event:any, emojiObject:any)=>{
    console.log("clicked")
    console.log(event)
    console.log(event.emoji)
    setchatForm((c:any)=>({ ...chatForm, text:c.text+event.emoji}));
  }

  useEffect(() => {
    getMsg();
  }, [session]);

  useEffect(() => {
    socket.on("message2", (msg) => {
      setchatData((prevMessages: any) => [...prevMessages, msg]);
    });
    socket.on("typing2", (data) => {
      if (data.reciever === sender) {
        settypingStatus(data.text);
      }
    });
    socket.on("online2", (data) => {
      if (data.sender === reciever) {
        setonlineStatus(data.text);
      }
    });

    return () => {
      socket.off("message2");
      socket.off("typing2");
      socket.off("online2");
    };
  }, []);
  useEffect(() => {
    getRecieverInfo();
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", inputFocus);

    return () => {
      document.removeEventListener("keydown", inputFocus);
    };
  }, [isEdit.value]);

  return (
    <>
      {imageFullView !== "" ? (
        <div className="relative">
          <button
            onClick={() => {
              setImageFullView("");
              scrollToBottom();
            }}
            className=" absolute top-2 right-4"
          >
            <IoClose className=" size-12 text-zinc-500" />
          </button>
          <img src={imageFullView} alt="" className=" h-screen w-screen" />
        </div>
      ) : (
        <div className="flex flex-col justify-center h-screen  items-center pb-16 bg-[whitesmoke]">
          {/* <div className="flex items-center justify-between w-[565px] border rounded-full p-2 bg-zinc-200">
            <img
              src={receiverInfo?.image}
              alt=""
              className="size-10 rounded-full"
            />
            <p className='text-zinc-500'>{receiverInfo?.name}</p>
            <IoInformationCircleOutline className="size-10 text-zinc-500"/>
          </div> */}
          <PersonTag member={receiverInfo} />
          <p className="my-2 p-2 text-zinc-500">
            {typingStatus ? typingStatus : onlineStatus}
          </p>
          <div className="h-[80%]">
            {/* message body */}
            <div className="overflow-y-auto h-full mb-6 scrollbar-hide overflow-x-clip">
              {chatData.length !== 0 ? (
                chatData?.map((chat: any, id: any) => (
                  <div
                    className={cn(
                      "flex w-full flex-col",
                      chat.sender === sender ? "items-end" : "items-start"
                    )}
                    key={id}
                  >
                    <div
                      className={cn(
                        "border min-w-28 p-2 rounded-b-xl mt-3 text-zinc-500 max-w-96 h-fit break-words hover:bg-zinc-300 relative group",
                        chat.sender === sender ? "rounded-s-xl" : "rounded-e-xl"
                      )}
                    >
                      {isEdit.value && isEdit.id == chat._id ? (
                        <div className=" flex w-[366px] ">
                          {isBase64Image(chat.text) === "text" ? (
                            <>
                              <textarea
                                ref={editInputRef}
                                className=" bg-white rounded-md me-2  px-1  w-[85%] h-20 outline-none resize-none"
                                value={isEdit.text}
                                onChange={(e) =>
                                  setIsEdit((c: any) => ({
                                    ...c,
                                    text: e.target.value,
                                  }))
                                }
                                onKeyDown={handleKeyDown}
                              />
                              <SaveButton editMsg={editMsg} />
                            </>
                          ) : (
                            <div className=" w-[366px] flex flex-col">
                              <Image
                                text={isEdit.text}
                                fullScreen={fullScreen}
                              />
                              <div className="flex item-center mt-2">
                                <FileInput
                                  handleFileChange={handleFileChange}
                                  handleKeyDown={handleKeyDown}
                                />
                                <SaveButton editMsg={editMsg} />
                              </div>
                            </div>
                          )}
                        </div>
                      ) : isBase64Image(chat.text) == "text" ? (
                        <span className="block w-full">{chat.text}</span>
                      ) : isBase64Image(chat.text) == "image" ? (
                        <Image text={chat.text} fullScreen={fullScreen} />
                      ) : isBase64Image(chat.text) == "video" ? (
                        <video src={chat.text} />
                      ) : (
                        <audio src={chat.text} />
                      )}
                      <span className="text-[12px] block text-end">
                        {new Date(chat.time).toLocaleTimeString("en-US", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                      {!isEdit.value && (
                        <div
                          className={cn(
                            " border rounded-xl absolute hidden w-40 group-hover:block  p-2  bg-zinc-300 z-10",
                            chat.sender === sender && " right-2"
                          )}
                        >
                          <p
                            className=" text-sm hover:cursor-pointer"
                            onClick={() =>
                              setIsEdit({
                                value: true,
                                id: chat._id,
                                text: chat.text,
                              })
                            }
                          >
                            Edit
                          </p>
                          <hr />
                          <p
                            className=" text-sm hover:cursor-pointer"
                            onClick={() => deleteForEveryOne(chat._id)}
                          >
                            Delete for everyone
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <p>No chat</p>
              )}
              <div ref={messagesEndRef} />
            </div>
            {/* input box */}
            <div className="sticky flex items-center ">
              {showAttachmentOptions && (
                <div
                  className={cn(
                    "absolute text-zinc-500 border rounded-lg p-2 bg-[whitesmoke]",
                    chatForm.text === "" ? "-top-16" : " -top-[19.5rem]"
                  )}
                >
                  {chatForm.text !== "" && (
                    <img
                      src={chatForm.text}
                      alt=""
                      className=" w-96 mb-2"
                      onClick={() => fullScreen(chatForm.text)}
                    />
                  )}

                  <FileInput
                    handleFileChange={handleFileChange}
                    handleKeyDown={handleKeyDown}
                  />
                </div>
              )}
              <button onClick={openAttachment}>
                <RiAttachment2 className="size-6 text-zinc-500" />
              </button>
              <div>
              <textarea
                placeholder="Enter message..."
                value={!showAttachmentOptions ? chatForm.text : ""}
                disabled={showAttachmentOptions && true}
                ref={chatInputRef}
                onChange={typingHandler}
                onKeyDown={handleKeyDown}
                className="border border-zinc-200 rounded-lg max-h-28  w-[30rem] mx-3 pl-2 outline-none resize-none  text-zinc-500 pr-12"
                autoFocus
              />
              <span className='text-3xl absolute right-12 top-2 select-none' onClick={()=>{setShowEmojiPicker(!showEmojiPicker)}}>&#128540;</span>
              </div>
              <button onClick={() => sentMsg(chatForm)}>
                <GrSend className="size-6 text-zinc-500" />
              </button>
              <div className={cn("absolute bottom-full",showEmojiPicker?"block":"hidden")}>
              <EmojiPicker onEmojiClick={onEmojiClick}/>
              </div>
              
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export const SaveButton = ({ editMsg }: any) => {
  return (
    <button onClick={() => editMsg()}>
      <IoSaveOutline className="size-6 text-zinc-500" />
    </button>
  );
};

export const Image = ({ text, fullScreen }: any) => {
  return (
    <img
      src={text}
      alt="Chat content"
      onClick={() => fullScreen(text)}
      className="w-[366px]"
    />
  );
};

const FileInput = ({ handleFileChange, handleKeyDown }: any) => {
  return (
    <input
      className=" hover:cursor-pointer"
      type="file"
      onChange={(e) => {
        handleFileChange(e);
      }}
      onKeyDown={handleKeyDown}
    />
  );
};

export default Chat;
