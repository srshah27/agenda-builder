import { getToken } from "next-auth/jwt"
import dbConnect from "@/lib/dbconnect";
import User from "@/models/Users";
import Workspace from "@/models/Workspaces";
import sessionUser from "@/middleware/getSessionUser";

export default async function handler(req, res) {
  const {user} = await sessionUser({req});
  if(user.error) return res.status(401).json({error: user.error});
  await dbConnect();
  if (req.method === "GET") {
    const workspaces = await Workspace.find({
      collaborators: {
        $elemMatch: { user: user._id }
      }
    });
    res.status(200).json(workspaces);
  }
  if (req.method === "POST") {
    const { id } = req.body;
    const workspaces = await Workspace.find({id: id});
    res.status(200).json(workspaces);
  }
  res.status(200).json({user})
  
}