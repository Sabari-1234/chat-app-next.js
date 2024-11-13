// "use client";
// import { useEffect, useRef } from "react";
// import { gsap } from "gsap";
// import "@fontsource/poppins";

// const allEmojis: string[] = [
//   "💬",
//   "😊",
//   "👍",
//   "❤️",
//   "😂",
//   "🎉",
//   "🔥",
//   "🙌",
//   "🌟",
//   "🤔",
//   "🎈",
//   "💌",
//   "✨",
//   "🤩",
//   "💥",
//   "😎",
//   "🌈",
//   "🌻",
//   "🎶",
//   "🐱",
//   "🐶",
//   "🦄",
//   "🍕",
//   "🍔",
//   "🍩",
//   "🌮",
//   "🚀",
//   "⚡",
//   "💎",
//   "🔮",
//   "🍓",
//   "🍍",
//   "🍇",
//   "🥑",
//   "🥨",
//   "🍪",
//   "🧸",
//   "🧡",
//   "👑",
//   "🎁",
//   "🎯",
//   "🏆",
//   "🏅",
//   "🎤",
//   "🎬",
//   "🎮",
//   "⚽",
//   "🏀",
//   "🏐",
//   "🎲",
//   "🎨",
//   "🖌️",
//   "🖍️",
//   "🎸",
//   "🎻",
//   "🎷",
//   "🥁",
//   "🎺",
//   "🪕",
//   "🎮",
//   "🖥️",
//   "🎥",
//   "📸",
//   "📷",
//   "📹",
//   "📞",
//   "📱",
//   "📚",
//   "📖",
//   "📰",
//   "📄",
//   "📑",
//   "📊",
//   "📈",
//   "🔒",
//   "🔑",
//   "🔓",
//   "🚪",
//   "🛋️",
//   "🛏️",
//   "💡",
//   "🪴",
//   "🧑‍💻",
//   "👩‍💻",
//   "👨‍💻",
//   "🧑‍🔬",
//   "👨‍🔬",
//   "🧑‍🚀",
//   "👩‍🚀",
//   "🎨",
//   "🖥️",
//   "🖲️",
//   "🧑‍🎤",
//   "🦸",
//   "🦹",
//   "👩‍🦰",
//   "👨‍🦰",
//   "👩‍🦳",
//   "👨‍🦳",
//   "👩‍🦳",
//   "👨‍🦳",
//   "👩‍🦳",
//   "👩‍🦳",
//   "🍾",
//   "🍷",
//   "🍸",
//   "🍹",
//   "🍺",
//   "🥂",
//   "🍻",
//   "🥃",
//   "🍽️",
//   "🍴",
//   "🥄",
//   "🍳",
//   "🍔",
//   "🍟",
// ];

// const Login: React.FC = () => {
//   const buttonRef = useRef<HTMLButtonElement | null>(null);
//   const emojiRefs = useRef<(HTMLDivElement | null)[]>([]);
//   const cardRef = useRef<HTMLDivElement | null>(null);

//   useEffect(() => {
//     // Emoji animations
//     emojiRefs.current.forEach((emoji, index) => {
//       if (emoji) {
//         gsap.to(emoji, {
//           y: -10 + Math.random() * 20, // Small up/down movement for a floating effect
//           x: -10 + Math.random() * 20, // Small left/right movement for subtle motion
//           repeat: -1,
//           yoyo: true,
//           duration: 3 + Math.random() * 2, // Randomize animation duration
//           ease: "power1.inOut",
//         });
//       }
//     });

//     // Button bounce animation
//     gsap.fromTo(
//       buttonRef.current,
//       { scale: 0.8, opacity: 0 },
//       { scale: 1, opacity: 1, duration: 1.5, ease: "elastic.out(1, 0.5)" }
//     );

//     // Card animation: bounce and fade in
//     gsap.fromTo(
//       cardRef.current,
//       { opacity: 0, y: 50 },
//       { opacity: 1, y: 0, duration: 1, ease: "bounce.out" }
//     );
//   }, []);

//   return (
//     <div className="relative flex items-center justify-center min-h-screen p-4 sm:p-6 lg:p-8 bg-gradient-to-r from-blue-500 to-teal-500 overflow-hidden">
//       {/* Reduced Emoji Density Background */}
//       {Array.from({ length: 60 }).map((_, i) => (
//         <div
//           key={i}
//           ref={(el: any) => (emojiRefs.current[i] = el)} // Set reference for each emoji
//           className="absolute text-3xl opacity-80 animate-float"
//           style={{
//             top: `${Math.random() * 100}%`, // Random position on screen
//             left: `${Math.random() * 100}%`,
//             transform: "translate(-50%, -50%)",
//             fontSize: `${1.5 + Math.random() * 2}rem`, // Random size for variety
//             color: `hsl(${Math.random() * 360}, 70%, 80%)`, // Random pastel color
//           }}
//         >
//           {allEmojis[Math.floor(Math.random() * allEmojis.length)]}{" "}
//           {/* Random emoji */}
//         </div>
//       ))}

//       {/* Login Box (Card) */}
//       <div
//         ref={cardRef}
//         className="relative flex flex-col items-center max-w-sm p-8 space-y-6 bg-white/80 backdrop-blur-lg rounded-lg shadow-xl animate__animated animate__fadeIn animate__delay-1s"
//         style={{ fontFamily: "Poppins, sans-serif" }}
//       >
//         {/* Emoji Animated Card */}
//         <div className="relative w-full h-full bg-gradient-to-r from-yellow-400 via-pink-500 to-red-500 rounded-lg p-8 flex items-center justify-center space-x-4 animate__animated animate__fadeIn animate__delay-1s">
//           {/* Animated emojis as part of the card */}
//           <div className="absolute top-0 left-0 text-4xl opacity-80 animate__animated animate__zoomIn animate__delay-0.5s">
//             {allEmojis[10]}
//           </div>
//           <div className="absolute bottom-0 right-0 text-4xl opacity-80 animate__animated animate__zoomIn animate__delay-1s">
//             {allEmojis[5]}
//           </div>
//           <div className="absolute top-1/2 left-1/2 text-5xl opacity-70 animate__animated animate__zoomIn animate__delay-2s">
//             {allEmojis[12]}
//           </div>

//           {/* Card Content */}
//           <div className="text-center space-y-4">
//             <h1 className="text-4xl font-extrabold text-gray-800 animate__animated animate__fadeIn animate__delay-1s">
//               Welcome to ChatApp!
//             </h1>
//             <p className="text-gray-600 text-lg animate__animated animate__fadeIn animate__delay-1s">
//               Sign in with Google to join the chat!
//             </p>
//           </div>

//           {/* Google Sign-In Button */}
//           <button
//             ref={buttonRef}
//             className="flex items-center justify-center w-full px-6 py-3 font-semibold text-white bg-gradient-to-r from-blue-400 to-teal-400 rounded-md transition-transform duration-500 ease-in-out hover:scale-105 shadow-lg animate__animated animate__bounceIn"
//             onClick={() => alert("Google Sign-In Clicked")}
//           >
//             <img
//               src="https://www.svgrepo.com/show/355037/google.svg"
//               alt="Google Logo"
//               className="w-6 h-6 mr-3"
//             />
//             Sign in with Google
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;

"use client";
import React from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { HoverBorderGradient } from "../components/ui/hover-border-gradient";
import { FaGoogle } from "react-icons/fa";
import { socket } from "@/socket";
import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect } from "react";
const World = dynamic(
  () => import("../components/ui/globe").then((m) => m.World),
  {
    ssr: false,
  }
);

export function Login() {
  if (!useSession()) {
    return <p>Please sign in to access the chat.</p>;
  }
  const { data: session } = useSession();

  useEffect(() => {
    if (session) createUser(session);
  }, [session]);

  const createUser = async (session: any) => {
    try {
      const user = await fetch("/api/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(session),
      });
      socket.emit("registerEmail", session?.user?.email); // Send email when connecting
    } catch (error) {
      console.error("error creating user", error);
    }
  };
  const globeConfig = {
    pointSize: 4,
    globeColor: "#062056",
    showAtmosphere: true,
    atmosphereColor: "#FFFFFF",
    atmosphereAltitude: 0.1,
    emissive: "#062056",
    emissiveIntensity: 0.1,
    shininess: 0.9,
    polygonColor: "rgba(255,255,255,0.7)",
    ambientLight: "#38bdf8",
    directionalLeftLight: "#ffffff",
    directionalTopLight: "#ffffff",
    pointLight: "#ffffff",
    arcTime: 1000,
    arcLength: 0.9,
    rings: 1,
    maxRings: 3,
    initialPosition: { lat: 22.3193, lng: 114.1694 },
    autoRotate: true,
    autoRotateSpeed: 0.5,
  };
  const colors = ["#06b6d4", "#3b82f6", "#6366f1"];
  const sampleArcs = [
    {
      order: 1,
      startLat: -19.885592,
      startLng: -43.951191,
      endLat: -22.9068,
      endLng: -43.1729,
      arcAlt: 0.1,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 1,
      startLat: 28.6139,
      startLng: 77.209,
      endLat: 3.139,
      endLng: 101.6869,
      arcAlt: 0.2,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 1,
      startLat: -19.885592,
      startLng: -43.951191,
      endLat: -1.303396,
      endLng: 36.852443,
      arcAlt: 0.5,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 2,
      startLat: 1.3521,
      startLng: 103.8198,
      endLat: 35.6762,
      endLng: 139.6503,
      arcAlt: 0.2,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 2,
      startLat: 51.5072,
      startLng: -0.1276,
      endLat: 3.139,
      endLng: 101.6869,
      arcAlt: 0.3,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 2,
      startLat: -15.785493,
      startLng: -47.909029,
      endLat: 36.162809,
      endLng: -115.119411,
      arcAlt: 0.3,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 3,
      startLat: -33.8688,
      startLng: 151.2093,
      endLat: 22.3193,
      endLng: 114.1694,
      arcAlt: 0.3,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 3,
      startLat: 21.3099,
      startLng: -157.8581,
      endLat: 40.7128,
      endLng: -74.006,
      arcAlt: 0.3,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 3,
      startLat: -6.2088,
      startLng: 106.8456,
      endLat: 51.5072,
      endLng: -0.1276,
      arcAlt: 0.3,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 4,
      startLat: 11.986597,
      startLng: 8.571831,
      endLat: -15.595412,
      endLng: -56.05918,
      arcAlt: 0.5,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 4,
      startLat: -34.6037,
      startLng: -58.3816,
      endLat: 22.3193,
      endLng: 114.1694,
      arcAlt: 0.7,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 4,
      startLat: 51.5072,
      startLng: -0.1276,
      endLat: 48.8566,
      endLng: -2.3522,
      arcAlt: 0.1,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 5,
      startLat: 14.5995,
      startLng: 120.9842,
      endLat: 51.5072,
      endLng: -0.1276,
      arcAlt: 0.3,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 5,
      startLat: 1.3521,
      startLng: 103.8198,
      endLat: -33.8688,
      endLng: 151.2093,
      arcAlt: 0.2,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 5,
      startLat: 34.0522,
      startLng: -118.2437,
      endLat: 48.8566,
      endLng: -2.3522,
      arcAlt: 0.2,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 6,
      startLat: -15.432563,
      startLng: 28.315853,
      endLat: 1.094136,
      endLng: -63.34546,
      arcAlt: 0.7,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 6,
      startLat: 37.5665,
      startLng: 126.978,
      endLat: 35.6762,
      endLng: 139.6503,
      arcAlt: 0.1,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 6,
      startLat: 22.3193,
      startLng: 114.1694,
      endLat: 51.5072,
      endLng: -0.1276,
      arcAlt: 0.3,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 7,
      startLat: -19.885592,
      startLng: -43.951191,
      endLat: -15.595412,
      endLng: -56.05918,
      arcAlt: 0.1,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 7,
      startLat: 48.8566,
      startLng: -2.3522,
      endLat: 52.52,
      endLng: 13.405,
      arcAlt: 0.1,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 7,
      startLat: 52.52,
      startLng: 13.405,
      endLat: 34.0522,
      endLng: -118.2437,
      arcAlt: 0.2,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 8,
      startLat: -8.833221,
      startLng: 13.264837,
      endLat: -33.936138,
      endLng: 18.436529,
      arcAlt: 0.2,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 8,
      startLat: 49.2827,
      startLng: -123.1207,
      endLat: 52.3676,
      endLng: 4.9041,
      arcAlt: 0.2,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 8,
      startLat: 1.3521,
      startLng: 103.8198,
      endLat: 40.7128,
      endLng: -74.006,
      arcAlt: 0.5,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 9,
      startLat: 51.5072,
      startLng: -0.1276,
      endLat: 34.0522,
      endLng: -118.2437,
      arcAlt: 0.2,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 9,
      startLat: 22.3193,
      startLng: 114.1694,
      endLat: -22.9068,
      endLng: -43.1729,
      arcAlt: 0.7,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 9,
      startLat: 1.3521,
      startLng: 103.8198,
      endLat: -34.6037,
      endLng: -58.3816,
      arcAlt: 0.5,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 10,
      startLat: -22.9068,
      startLng: -43.1729,
      endLat: 28.6139,
      endLng: 77.209,
      arcAlt: 0.7,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 10,
      startLat: 34.0522,
      startLng: -118.2437,
      endLat: 31.2304,
      endLng: 121.4737,
      arcAlt: 0.3,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 10,
      startLat: -6.2088,
      startLng: 106.8456,
      endLat: 52.3676,
      endLng: 4.9041,
      arcAlt: 0.3,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 11,
      startLat: 41.9028,
      startLng: 12.4964,
      endLat: 34.0522,
      endLng: -118.2437,
      arcAlt: 0.2,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 11,
      startLat: -6.2088,
      startLng: 106.8456,
      endLat: 31.2304,
      endLng: 121.4737,
      arcAlt: 0.2,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 11,
      startLat: 22.3193,
      startLng: 114.1694,
      endLat: 1.3521,
      endLng: 103.8198,
      arcAlt: 0.2,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 12,
      startLat: 34.0522,
      startLng: -118.2437,
      endLat: 37.7749,
      endLng: -122.4194,
      arcAlt: 0.1,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 12,
      startLat: 35.6762,
      startLng: 139.6503,
      endLat: 22.3193,
      endLng: 114.1694,
      arcAlt: 0.2,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 12,
      startLat: 22.3193,
      startLng: 114.1694,
      endLat: 34.0522,
      endLng: -118.2437,
      arcAlt: 0.3,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 13,
      startLat: 52.52,
      startLng: 13.405,
      endLat: 22.3193,
      endLng: 114.1694,
      arcAlt: 0.3,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 13,
      startLat: 11.986597,
      startLng: 8.571831,
      endLat: 35.6762,
      endLng: 139.6503,
      arcAlt: 0.3,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 13,
      startLat: -22.9068,
      startLng: -43.1729,
      endLat: -34.6037,
      endLng: -58.3816,
      arcAlt: 0.1,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 14,
      startLat: -33.936138,
      startLng: 18.436529,
      endLat: 21.395643,
      endLng: 39.883798,
      arcAlt: 0.3,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center py-40 sm:py-20 h-screen  dark:bg-black bg-white relative w-full">
      <div className="max-w-7xl mx-auto w-full relative overflow-hidden h-full md:h-[40rem] px-4">
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 1,
          }}
          className="div"
        >
          <h2 className="text-center text-xl md:text-4xl font-bold text-black dark:text-white">
            Chat Around the Globe!
          </h2>
          <p className="text-center text-base md:text-lg font-normal text-neutral-700 dark:text-neutral-200 max-w-md mt-2 mx-auto">
            Explore the interactive globe and start connecting. Enjoy chatting!
          </p>
        </motion.div>
        <div className="absolute w-full bottom-0 inset-x-0 h-40 bg-gradient-to-b pointer-events-none select-none from-transparent dark:to-black to-white z-40" />
        <div className="absolute w-full  md:-bottom-16 h-[85%] sm:h-full z-10 left-0">
          <World data={sampleArcs} globeConfig={globeConfig} />
        </div>
      </div>
      <div className=" md:mt-5">
        <HoverBorderGradient
          containerClassName="rounded-full"
          as="button"
          className="dark:bg-black flex bg-white text-black dark:text-white  items-center space-x-2"
          onClick={() => signIn("google", { redirectTo: "/home" })}
        >
          <FaGoogle />

          <span>Join Now</span>
        </HoverBorderGradient>
      </div>
    </div>
  );
}
