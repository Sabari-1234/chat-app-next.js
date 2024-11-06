import Chat from "@/utils/models/Chats";
import { NextRequest, NextResponse } from "next/server";

export const DELETE=async(req:NextRequest,{params}:{params:{msgId:String}})=>{
    try {
        const deletedMsg=await Chat.findByIdAndDelete(params.msgId)
        console.log(deletedMsg)
        return NextResponse.json(deletedMsg, { status: 200 })
    } catch (error) {
        return NextResponse.json(error, { status: 500 })
    }
}