import dbConnect from "@/lib/dbconnect";
import User from "@/models/Users";
import { hash } from "bcryptjs";

export default async function signup(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  let { name, email, password } = req.body;
  // Check if user exists
  await dbConnect()

  let duplicate = await User.findOne({ email });
  if (duplicate) return res.status(409).end();
  const hashed = await hash(password, 11);
  try {
    let user = await User.create({ name, email, password: hashed });
    res.status(201).json({ user });
  } catch (error) {
    res.status(500).json({ error });
  }

}



