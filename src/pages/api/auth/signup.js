import dbConnect from '@/lib/dbconnect'
import User from '@/models/Users'
import { hash } from 'bcryptjs'
import { nanoid } from 'nanoid'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()
  let { name, email, password } = req.body
  console.log(name, email, password)
  // Check if user exists
  await dbConnect()
  console.log('db connected')
  let duplicate = await User.findOne({ email })
  if (duplicate) return res.status(409).json({ error: 'User already exists' })
  const hashed = await hash(password, 11)
  console.log(hashed)
  const query = { uid: new RegExp(`^${name.replace(/[^a-zA-Z]/g, '').toLowerCase()}`, 'i') };
  const docs = await User.find(query);
  let uid = name.replace(/[^a-zA-Z]/g, '').toLowerCase();
  if (docs.length > 0) {
    uid += docs.length;
  }
  
  try {
    let user = await User.create({ name, email, password: hashed, uid: uid || nanoid(10) })
    console.log(user)
    res.status(201).json({ user })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      error: 'Internal Server Error. Please try again sometime later.'
    })
  }
}
