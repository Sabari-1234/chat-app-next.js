
import Chat from '@/pages/Chat'
import React from 'react'

const page = ({ params }: { params: { reciever: string } }) => {
  return (
    <Chat reciever={decodeURIComponent(params.reciever)} />
  )
}

export default page
