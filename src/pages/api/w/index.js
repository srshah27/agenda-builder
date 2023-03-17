import dbConnect from "@/lib/dbconnect";
import Workspace from "@/models/Workspaces";
import sessionUser from "@/middleware/getSessionUser";

export default async function handler(req, res) {
  const { user } = await sessionUser({ req });
  if (user.error) return res.status(401).json({ error: user.error, dberror: user.dberror });
  await dbConnect();
  if (req.method === "GET") {
    const workspacesCreator = await Workspace.find({
      collaborators: {
        $elemMatch: { user: user._id, creator: true }
      }
    });
    const workspacesCollab = await Workspace.find({
      collaborators: {
        $elemMatch: { user: user._id, creator: false }
      }
    });
    res.status(200).json({ asCreator: workspacesCreator, asCollaborator: workspacesCollab });
  }
  if (req.method === "POST") {
    const { workspaceName } = req.body;

    let workspaceId = workspaceName.replace(/\s/g, '').toLowerCase();
    let duplicate = await Workspace.findOne({ id: workspaceId });
    let newWorkspaceId;
    let c = 0
    while (duplicate) {
      c++
      newWorkspaceId = workspaceId + `${c}`;
      duplicate = await Workspace.findOne({ id: newWorkspaceId });
    }

    let workspaceObj = {
      id: newWorkspaceId || workspaceId,
      name: workspaceName,
      createdAt: new Date().toISOString(),
      roles: [
        { name: "Admin" },
        { name: "Member" }
      ],
      boards: [],
      lists: [],
      cards: [],
      invite: { link: "", disabled: false, expiresAt: null },
      collaborators: [{ user: user._id, creator: true, role: "Admin" }]
    }

    const workspace = await Workspace.create(workspaceObj);
    res.status(200).json(workspace);
  } else {

    res.status(405).json({ error: "Method not allowed" })
  }

}