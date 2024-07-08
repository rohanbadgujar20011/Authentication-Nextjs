import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { error } from "console";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";
connect();

export async function POST(request: NextRequest) {
  try {
    const userID = await getDataFromToken(request);
    console.log(userID);

    const user = await User.findOne({ _id: userID }).select("-password");
    if (!user) {
      return NextResponse.json(
        {
          message: "User not Found",
        },
        { status: 400 }
      );
    }
    return NextResponse.json({
      message: "User Found",
      data: user,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
