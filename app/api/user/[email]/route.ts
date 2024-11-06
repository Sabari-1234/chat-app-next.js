import User from "@/utils/models/Users";
import { NextRequest, NextResponse } from "next/server";

export const PATCH=async(req:NextRequest,{params}:{params:{email:string}})=>{
    try {
        console.log(params)
        const data= await req.json()
        console.log(data)
       const res=await User.updateOne(params, data)
        console.log(res)
        return NextResponse.json("success", { status: 200 })
    } catch (error) {
        return NextResponse.json("error",{status:500})
    }
    }

export const GET=async(req:NextRequest,{params}:{params:{email:string}})=>{
        try {
            console.log(params)
            const res=await User.findOne(params)
            return NextResponse.json(res, { status: 200 })
            
        } catch (error) {
            return NextResponse.json("error", { status:400})
        }
}