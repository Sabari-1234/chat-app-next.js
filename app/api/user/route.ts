import { connect } from "@/utils/config/dbConfig";
import User from "@/utils/models/Users";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const session = await req.json();
  try {
    await connect();

    const res = await User.findOne({ email: session.user.email });
    if (!res) {
      await User.create({
        email: session.user.email,
        name: session.user.name,
        image: session.user.image,
      });
    }
    return NextResponse.json("success", { status: 200 });
  } catch (error) {
    return NextResponse.json("error", { status: 500 });
  }
};

export const GET = async () => {
  try {
    const res = await User.find({});
    return NextResponse.json(res, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }
};
