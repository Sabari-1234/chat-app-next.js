"use client"
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const ChatHome = () => {
    if (!useSession()) {
        return <p>Please sign in to access the chat.</p>;
    }
    const [Members, setMembers] = useState<any>()
    const { data: session } = useSession()
    const getUsers = async () => {
        const res = await fetch('/api/user')
        const members = await res.json();

        setMembers(members)
    }

    useEffect(() => {
        getUsers();
    }, [])


    return (

        <div>
            {Members && Members.map((member: any, id: any) => (<div key={id}>{member.email !== session?.user?.email && <div><Link href={`/chatHome/${member.email}`}>{member.email}</Link><br /></div>}</div>))}

        </div>
    )
}

export default ChatHome
