import dbConnect from '@/lib/dbconnect'
import Board from '@/models/Boards'

export default async function handler(req, res) {
  const { wID } = req.query
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
      const boards = await Board.find({ workspaceId: wID })
      return res.status(200).json({ boards })
    }

    case 'POST': {
      const { id, name, createdBy, createdAt, backgroundImage } = req.body
      const start = new Date()
      start.setHours(10, 0, 0)
      const end = new Date()
      end.setHours(17, 0, 0)
      const data = {
        id,
        workspaceId: wID,
        name,
        createdAt,
        createdBy,
        backgroundImage: backgroundImage || 'default',
        start,
        end,
        activityAttributes: []
      }
      const board = await Board.create(data)
      return res.status(201).json({ board })
    }
    default: {
      return res.status(405).json({ error: 'Method not allowed' })
    }
  }
}
