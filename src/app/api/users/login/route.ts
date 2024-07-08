import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { error } from "console";
import bcryptjs from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    let { email, password } = reqBody;
    email = email.trim();
    password = password.trim();

    const user = await User.findOne({ email });
    console.log(user);

    if (!user) {
      return NextResponse.json({ error: "User Not found" }, { status: 400 });
    }
    console.log("User exist");

    const validpassword = await bcryptjs.compare(password, user.password);
    if (!validpassword) {
      return NextResponse.json(
        { error: "Check Your credentials" },
        { status: 400 }
      );
    }

    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };
    const token = jwt.sign(tokenData, process.env.TOKEN_SECRATE!, {
      expiresIn: "1h",
    });
    const response = NextResponse.json({
      message: "Logged In Sucess",
      success: true,
    });
    response.cookies.set("token", token, {
      httpOnly: true,
    });
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
