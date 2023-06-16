import dbConnect from '@/lib/dbconnect'
import Board from '@/models/Boards'
import List from '@/models/Lists'
import Card from '@/models/Cards'
import sessionUser from '@/middleware/getSessionUser'
import { ObjectId } from 'mongodb'

export default async function handler(req, res) {
  const { user, error, dberror } = await sessionUser({ req })
  if (dberror) return res.status(401).json({ error: error, dberror: dberror })

  try {
    await dbConnect()
  } catch (error) {
    return res
      .status(500)
      .json({ error: 'Database connection error', dberror: error })
  }
  const { wID, bID } = req.query
  const reqType = req.method
  switch (reqType) {
    case 'POST': {
      const { attributes } = req.body
      console.log(bID);
      const updatedBoard = await Board.findOneAndUpdate(
        {
          id: bID
        },
        { $push: { activityAttributes: { $each: attributes } } },
        { new: true }
      )
      return res.status(202).json({ updatedBoard })
    }
    case 'PATCH': {
      const { attributes, modify } = req.body
      if (modify) {
        const updatedBoards = []
        for (let i = 0; i < attributes.length; i++) {
          const { _id, ...props } = attributes[i];

          const updatedBoard = await Board.findOneAndUpdate(
            {
              id: bID,
              'activityAttributes._id': ObjectId(_id)
            },
            {
              $set: { [`activityAttributes.$.${Object.keys(props)[0]}`]: Object.values(props)[0] }
            },{
              new: true
            })
          updatedBoards.push(updatedBoard)
        }
        return res.status(202).json({ updatedBoards })
      } else {
        const ids = []
        attributes.forEach(attribute => {
          ids.push(ObjectId(attribute._id))
        });
        console.log(ids);
        const updatedBoard = await Board.findOneAndUpdate(
          {
            id: bID
          },
          { $pull: { activityAttributes: { _id: { $in: ids } } } },
          { new: true, multi: true }
        )
        return res.status(202).json({ updatedBoard })
      }
    }

    default: {
      return res.status(405).json({ error: 'Method not allowed' })
    }
  }
}
