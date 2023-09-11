import connect from "@/dbConfig/dbConfig";
import User from "@/models/user";
import { NextRequest } from "next/server";

connect();
export async function GET(request: NextRequest) {
  const user = await User.find({});
  return user;
}
