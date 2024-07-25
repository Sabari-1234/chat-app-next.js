import { connect } from "@/utils/config/dbConfig"
import Chat from "@/utils/models/Chats";
import { NextRequest, NextResponse } from "next/server";

//get data
export const GET = async () => {
    try {
        await connect();
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
        await connect();

        const data = await req.json();
        const chat = await Chat.create(data);
        console.log(chat)
        return NextResponse.json("chat posted successfuly", { status: 200 })
    } catch (error: any) {
        console.log(error)
        return NextResponse.json(error, { status: 500 })
    }

}