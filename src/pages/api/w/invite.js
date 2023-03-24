import dbConnect from '@/lib/dbconnect'
import Workspace from '@/models/Workspaces'
import sessionUser from '@/middleware/getSessionUser'
import { nanoid } from 'nanoid'
export default async function handler(req, res) {
  const { user, error, dberror } = await sessionUser({ req })
  if (error || dberror)
    return res.status(401).json({ error: error, dberror: dberror })

  try {
    await dbConnect()
  } catch (error) {
    return res
      .status(500)
      .json({ error: 'Database connection error', dberror: error })
  }
  const reqType = req.method
  switch (reqType) {
    
    case 'GET': {
      const { inviteCode } = req.query
      console.log('asdasd '+inviteCode);
      const workspace = await Workspace.findOne({ 'invite.link': inviteCode })
      if(!workspace) return res.status(404).json({ error: 'Workspace not found' })
      res.status(200).json({ workspace: workspace })
      
    }
    
    case 'POST': {
      const { inviteCode, uId } = req.body
      const workspace = await Workspace.findOne({ 'invite.link': inviteCode })
      if(!workspace) return res.status(404).json({ error: 'Workspace not found' })
      if(workspace.invite.disabled) return res.status(400).json({ error: 'Invite disabled' })
      if(workspace.invite.expiresAt < new Date()) return res.status(400).json({ error: 'Invite expired' })
      if(workspace.collaborators.find(c => c.user === uId)) return res.status(400).json({ error: 'User already a collaborator' })
      let w = await Workspace.updateOne({ 'invite.link': inviteCode }, { $push: { collaborators: { user: uId, role: 'Member' } } })
      res.status(200).json({ workspace: w })
    }
    case 'PATCH': {
      const { wID } = req.body
      const inviteCode = nanoid(18)
      const expires = new Date()
      expires.setDate(expires.getDate() + 30)
      const w = await Workspace.updateOne({ id: wID }, {  'invite.link': inviteCode, 'invite.disabled': false, 'invite.expiresAt': expires  })
      res.status(200).json({workspace: w})
    }
    case 'DELETE': {
      const { wID } = req.body
      const w = await Workspace.updateOne({ id: wID }, {  'invite.disabled': true  })
      res.status(200).json({ workspace: w })
    }
    default: {
      return res.status(405).json({ error: 'Method not allowed' })
    }
  }
}
