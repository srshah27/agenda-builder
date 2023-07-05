import dbConnect from '@/lib/dbconnect'
import Card from '@/models/Cards'
import Board from '@/models/Boards'

export default async function handler(req, res) {
  const { wID, bID } = req.query
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
      const cards = await Card.find({ boardId: bID, workspaceId: wID })
      return res.status(200).json({ cards })
    }

    case 'POST': {
      const {
        id,
        name,
        createdBy,
        createdAt,
        sequence,
        listId,
        start,
        end,
        attributes
      } = req.body

      let { activityAttributes } = await Board.findOne(
        { id: bID, workspaceId: wID },
        { activityAttributes: 1 }
      )
      let attrs = JSON.parse(JSON.stringify(activityAttributes))
      for (let i = 0; i < attrs.length; i++) {
        delete attrs[i]._id
      }
      const count = await Card.find({ boardId: bID, workspaceId: wID }).count()
      const data = {
        id,
        workspaceId: wID,
        boardId: bID,
        listId,
        name,
        createdAt,
        createdBy,
        sequence: sequence || count + 1,
        start,
        end,
        attributes: attrs
      }
      const card = await Card.create(data)

      return res.status(201).json({ card })
    }
    default: {
      return res.status(405).json({ error: 'Method not allowed' })
    }
  }
}
