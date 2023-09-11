import connect from "@/dbConfig/dbConfig";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
  const reqBody = await request.json();
  const { email, password } = reqBody;
  try {
    const user = await User.findOne({ email });
    if (!user)
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    const passwordMatch = bcrypt.compare(password, user.password);
    if (!passwordMatch)
      return NextResponse.json({
        success: false,
        message: "Password not mathced",
      });
    user.password = undefined;
    const userDetails = NextResponse.json({
      success: true,
      message: "User details",
      user: user,
    });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY!, {
      expiresIn: "7d",
    });
    userDetails.cookies.set("token", token);
    return userDetails;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
