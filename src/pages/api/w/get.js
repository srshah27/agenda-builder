import dbConnect from "@/lib/dbconnect";
import Workspace from "@/models/Workspaces";
import sessionUser from "@/middleware/getSessionUser";

export default async function handler(req, res) {
  const {user} = await sessionUser({req});
  if(user.error) return res.status(401).json({error: user.error, dberror: user.dberror});
  await dbConnect();
  if (req.method === "GET") {
    const workspacesCreator= await Workspace.find({
      collaborators: {
        $elemMatch: { user: user._id, creator: true }
      }
    });
    const workspacesCollab= await Workspace.find({
      collaborators: {
        $elemMatch: { user: user._id, creator: false }
      }
    });
    res.status(200).json({asCreator: workspacesCreator, asCollaborator: workspacesCollab});
  }
  if (req.method === "POST") {
    const { id } = req.body;
    const workspaces = await Workspace.find({id: id});
    res.status(200).json(workspaces);
  }else{
    
  res.status(405).json({error: "Method not allowed"})
  }
  
}