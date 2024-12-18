"use client";

import { useEffect, useState } from "react";
import { socket } from "../socket";
import { useSession } from "next-auth/react";
import Login from "@/pages/Login";

export default function Home() {
  const { data: session } = useSession();
  const [isConnected, setIsConnected] = useState(false);
  const [transport, setTransport] = useState("N/A");

  useEffect(() => {
    if (socket.connected) {
      onConnect();
    }

    function onConnect() {
      setIsConnected(true);
      setTransport(socket.io.engine.transport.name);

      socket.io.engine.on("upgrade", (transport: any) => {
        setTransport(transport.name);
      });
    }

    function onDisconnect() {
      setIsConnected(false);
      setTransport("N/A");
    }

    socket.on("connect", onConnect);

    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);

      socket.off("disconnect", onDisconnect);
    };
  }, []);

  const updateOnlineStatus = async (data: any) => {
    try {
      await fetch(`/api/user/${localStorage.getItem("email")}`, {
        headers: { "Content-Type": "application/json" },
        method: "PATCH",
        body: JSON.stringify(data),
      });
    } catch (error) {
      console.error("Failed to update online status:", error);
    }
  };

  useEffect(() => {
    if (session?.user?.email) {
      localStorage.setItem("email", session?.user?.email);
      socket.emit("online1", { sender: session?.user?.email, text: "Online" });
      updateOnlineStatus({ status: "Online" });
    }
  }, [session && socket]);

  return (
    <div>
      {/* <p>Status: {isConnected ? "connected" : "disconnected"}</p>
      <p>Transport: {transport}</p> */}
      <Login />

      {/* <Link href={"/chatHome"}>chatHome</Link> */}
    </div>
  );
}
