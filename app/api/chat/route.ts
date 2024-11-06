
import { connect } from "@/utils/config/dbConfig"
import Chat from "@/utils/models/Chats";
import { NextRequest, NextResponse } from "next/server";

//get data
export const GET = async () => {
    try {
        
        const chats = await Chat.find({})
        return NextResponse.json(chats, { status: 200 })
    } catch (error) {
        console.log(error)
        return NextResponse.json(error, { status: 500 })
    }

}


//post data

export const POST = async (req: NextRequest) => {
    try {

        const data = await req.json();
        const chat = await Chat.create(data);
        console.log(chat)
        return NextResponse.json("chat posted successfuly", { status: 200 })
    } catch (error: any) {
        console.log(error)
        return NextResponse.json(error, { status: 500 })
    }

}
export const PATCH= async (req: NextRequest) => {
    try {
        console.log("object")
        const data = await req.json();
        console.log(data)
        const chat = await Chat.findByIdAndUpdate(data.id, data,{new:true});
        console.log(chat)
        return NextResponse.json("chat updated successfuly", { status: 200 })
    } catch (error: any) {
        console.log(error)
        return NextResponse.json(error, { status: 500 })
    }
}