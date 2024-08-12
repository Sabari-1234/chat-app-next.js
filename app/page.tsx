// import Register from "@/pages/Register";


// export default function Home() {
//   return (
//     //  <div>
//     //  <div>
//     //   <input type="text" placeholder="Enter User Name"/>
//     //  </div>
//     //  <div>
//     //   <input type="password" placeholder="Enter Password" />
//     //  </div>
//     //  <button>Login</button>
//     //  </div>
//     <Register />
//   );
// }


"use client";

import { useEffect, useState } from "react";
import { socket } from "../socket";
import Register from "@/pages/Register";
import { useSession } from "next-auth/react";
import { headers } from "next/headers";

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
        headers: { 'Content-Type': 'application/json' },
        method: 'PATCH',
        body: JSON.stringify(data),
      });
    } catch (error) {
      console.error("Failed to update online status:", error);
    }
  };

  useEffect(() => {

    if (session?.user?.email) {
      localStorage.setItem("email", session?.user?.email);
      socket.emit('online1', { sender: session?.user?.email, text: "Online" });
      updateOnlineStatus({ status: 'Online' });
    }


  }, [session && socket])

  useEffect(() => {
    const handleBeforeUnload = async () => {
      const email = localStorage.getItem("userEmail");
      if (email) {
        try {
          await fetch(`/api/user/${email}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: "Offline" })
          });
        } catch (error) {
          console.error("Error setting status to offline:", error);
        }
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);



  return (
    <div >
      <p>Status: {isConnected ? "connected" : "disconnected"}</p>
      <p>Transport: {transport}</p>
      <Register />
    </div>
  );
}