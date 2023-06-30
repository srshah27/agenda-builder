import { Schema, model, models } from 'mongoose'
import { AttributeSchema } from './Attribute'
const ListsSchema = new Schema({
  id: String,
  name: String,
  createdAt: {
    type: Date,
    default: new Date().toISOString()
  },
  createdBy: { type: String, ref: 'User' },
  sequence: Number,
  boardId: { type: String, ref: 'Board' },
  workspaceId: { type: String, ref: 'Workspace' },
  start: Date,
  end: Date,
  activityAttributes: [AttributeSchema]
})

module.exports = models.List || model('List', ListsSchema)
