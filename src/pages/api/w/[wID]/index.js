import dbConnect from '@/lib/dbconnect'
import Workspace from '@/models/Workspaces'
import sessionUser from '@/middleware/getSessionUser'

export default async function handler(req, res) {
  const { user } = await sessionUser({ req })
  if (user.error)
    return res.status(401).json({ error: user.error, dberror: user.dberror })

  try {
    await dbConnect()
  } catch (error) {
    return res
      .status(500)
      .json({ error: 'Database connection error', dberror: error })
  }
  const { wID } = req.query
  const reqType = req.method
  switch (reqType) {
    case 'GET': {
      const workspace = await Workspace.findOne({
        id: wID,
        'collaborators.user': user._id
      })
      return res.status(200).json({ workspace })
    }

    case 'PATCH': {
      const { id, name, createdAt, collaborators, roles, invite } = req.body
      const updatedWorkspace = await Workspace.findOneAndUpdate(
        {
          id: wID,
          'collaborators.user': user._id,
          'collaborators.creator': true
        },
        { id, name, createdAt, collaborators, roles, invite },
        { new: true }
      )
    }

    case 'DELETE': {
      await Workspace.findOneAndDelete({
        id: wID,
        'collaborators.user': user._id,
        'collaborators.creator': true
      })
    }

    default: {
      return res.status(405).json({ error: 'Method not allowed' })
    }
  }
}
