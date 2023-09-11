import connect from "@/dbConfig/dbConfig";
import User from "@/models/user";

connect();
export async function GET() {
  const user = await User.find({});
  return user;
}
