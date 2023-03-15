import { getToken } from "next-auth/jwt"
import dbConnect from "@/lib/dbconnect";
import User from "@/models/Users";
import Workspace from "@/models/Workspaces";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  const token = await getToken({ req, secret: process.env.JWT_SECRET })

  if (!token) return res.status(401).json({ error: "You are not logged in." }).end();
  try {
    await dbConnect();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Something went wrong with the Database." }).end();
  }
  const user = await User.findOne({ email: token.email });
  if (!user) return res.status(404).json({ error: "User not found." }).end();

  const { workspaceName } = req.body;

  const roles = [
    { name: "Admin" },
    { name: "Member" }
  ]
  
  const createdAt = new Date().toISOString();
  const boards = []
  const lists = []
  const cards = []
  const invite = { link: "", disabled: false, expiresAt: null }
  const collaborators = [{ user: user._id, creator: true, role: "Admin" }]
  
  let workspaceId = workspaceName.replace(/\s/g, '').toLowerCase(); 
  let duplicate = await Workspace.findOne({ id: workspaceId });
  let newWorkspaceId;
  let c = 0
  while(duplicate) {
    c++
    newWorkspaceId = workspaceId + `${c}`;
    duplicate = await Workspace.findOne({ id: newWorkspaceId });
  }
  const workspace = await Workspace.create({id: newWorkspaceId || workspaceId, name: workspaceName, createdAt, roles, boards, lists, cards, invite, collaborators});
  res.status(200).json(workspace);
}