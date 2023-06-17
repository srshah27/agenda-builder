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
      const updatedBoard = await Board.findOneAndUpdate({ id: bID }, { $push: { activityAttributes: { $each: attributes } } }, { new: true })
      const updatedLists = await List.updateMany({ boardId: bID }, { $push: { activityAttributes: { $each: attributes } } }, { new: true })
      const updatedCards = await Card.updateMany({ boardId: bID }, { $push: { attributes: { $each: attributes } } }, { new: true })
      return res.status(202).json({ updatedBoard, updatedLists, updatedCards })
    }
    case 'PATCH': {
      const { attributes, modify } = req.body
      if (modify) {
        const updatedBoards = []
        for (let i = 0; i < attributes.length; i++) {
          const { id, ...props } = attributes[i];
          console.log(Object.keys(props)[0]);
          console.log(props);
          const updatedBoard = await Board.updateOne(
            { id: bID, 'activityAttributes.id': id },
            {
              $set: {
                'activityAttributes.$.name': props.name,
                // 'activityAttributes.$.value': props.value,
                'activityAttributes.$.show': props.show,
                'activityAttributes.$.attributeType': props.attributeType,
                'activityAttributes.$.options': props.options
              }
            },
            { new: true })
          const b =  await Board.findOne({ id: bID })
          console.log("updatedBoard");
          console.log(b); 
          console.log(updatedBoard);
          const updatedLists = await List.updateMany(
            { boardId: bID, 'activityAttributes.id': id },
            {
              $set: {
                'activityAttributes.$.name': props.name,
                // 'activityAttributes.$.value': props.value,
                'activityAttributes.$.show': props.show,
                'activityAttributes.$.attributeType': props.attributeType,
                'activityAttributes.$.options': props.options
              }
            },
            { new: true })
          const updatedCards = await Card.updateMany(
            { boardId: bID, 'attributes.id': id },
            {
              $set: {
                'attributes.$.name': props.name,
                // 'attributes.$.value': props.value,
                'attributes.$.show': props.show,
                'attributes.$.attributeType': props.attributeType,
                'attributes.$.options': props.options
              }
            },
            { new: true })
          // console.log(updatedCards);
          updatedBoards.push({ updatedBoard, updatedLists, updatedCards })
        }
        return res.status(202).json({ updatedBoards })
      } else {
        const ids = []
        attributes.forEach(attribute => {
          ids.push(attribute.id)
        });
        console.log(ids);
        const updatedBoard = await Board.findOneAndUpdate(
          { id: bID },
          { $pull: { activityAttributes: { id: { $in: ids } } } },
          { new: true, multi: true })
        const updatedLists = await List.findOneAndUpdate(
          { boardId: bID },
          { $pull: { activityAttributes: { id: { $in: ids } } } },
          { new: true, multi: true })
        const updatedCards = await Card.findOneAndUpdate(
          { boardId: bID },
          { $pull: { attributes: { id: { $in: ids } } } },
          { new: true, multi: true })
        return res.status(202).json({ updatedBoard, updatedLists, updatedCards })
      }
    }

    default: {
      return res.status(405).json({ error: 'Method not allowed' })
    }
  }
}
