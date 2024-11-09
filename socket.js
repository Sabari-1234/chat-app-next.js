"use client";

import { io } from "socket.io-client";

// export const socket = io(process.env.NEXT_PUBLIC_SERVER_URL);
export const socket = io(process.env.NEXT_PUBLIC_SERVER_URL, {
    transports: ["websocket"], // Force WebSocket as the transport method
    reconnection: true,         // Enable reconnection in case of connection drops
    reconnectionAttempts: 5,    // Number of reconnection attempts
    reconnectionDelay: 1000     // Delay between reconnection attempts
  });