import dbConnect from "@/lib/dbconnect";
import User from "@/models/Users";
import { hash } from "bcryptjs";

export default async function signup(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  let { username, email, password } = req.body;
  console.log(username, email, password);
  // Check if user exists
  await dbConnect()
  console.log("db connected");
  let duplicate = await User.findOne({ email });
  if (duplicate) return res.status(409).json({ error: "User already exists" });
  const hashed = await hash(password, 11);
  console.log(hashed);
  try {
    let user = await User.create({ username, email, password: hashed });
    console.log(user);
    res.status(201).json({ user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error. Please try again sometime later." });
  }

}



