import dbConnect from '@/lib/dbconnect'
import User from '@/models/Users'
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
  const { uID } = req.query
  const userdb = await User.findOne({ userId: uID }, '-password')
  if(!userdb){
    return res.status(404).json({ error: 'User not found' })
  }

  const reqType = req.method
  switch (reqType) {
    case 'GET': {
      if (uID !== user.userId)
        return res.status(401).json({ error: 'Unauthorized', uID, userId: user.userId })
      if (userdb) {
        return res.status(200).json({ user: userdb })
      }
    }

    case 'PATCH': {
      const { userId, email, image, name } = req.body;
      const modify = await User.findOneAndUpdate({ userId: uID }, { userId, email, image, name })
      if(modify)
        return res.status(200).json({ user: modify })
      else
        return res.status(404).json({ error: 'User not found' })
    }
    default: {
      return res.status(405).json({ error: 'Method not allowed' })
    }
  }
}
