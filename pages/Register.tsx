
"use client"

import { signIn, signOut, useSession } from "next-auth/react"
import { useEffect } from "react"


const Register = () => {
  if (!useSession()) {
    return <p>Please sign in to access the chat.</p>;
  }
  const { data: session } = useSession();


  useEffect(() => {
    if (session)
      createUser(session)
  },
    [session]);

  const createUser = async (session: any) => {

    console.log(session);
    try {
      const user = await fetch("/api/user", { method: "POST", headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(session) })
      console.log("user created", user)
    } catch (error) {
      console.error("error creating user", error)
    }
  }

  return (

    <div>

      {!session ? <button type="submit" onClick={() => signIn("google", { redirectTo: "/chat" })}>Signin with Google</button> : <button onClick={() => signOut()}>singout</button>}


    </div>
  )
}
export default Register