import connect from "@/dbConfig/dbConfig";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
  const reqBody = await request.json();
  const { name, email, password } = reqBody;
  try {
    const user = await User.findOne({ email: email });
    if (user)
      return NextResponse.json({
        success: false,
        message: "User Already Exists",
      });
    const salt = bcrypt.genSaltSync(10);
    const hashsedPassword = await bcrypt.hashSync(password, salt);
    const newUser = new User({
      name: name,
      email: email,
      password: hashsedPassword,
    });
    await newUser.save();
    const userDetails = NextResponse.json({
      success: true,
      message: "User Created Successfully",
      user: newUser,
    });

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET_KEY!, {
      expiresIn: "7d",
    });
    userDetails.cookies.set("token", token);
    return userDetails;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
