import { Schema, model, models } from 'mongoose'
import { AttributeSchema } from './Attribute'
const CardsSchema = new Schema({
  id: String,
  name: String,
  createdAt: {
    type: Date,
    default: new Date().toISOString()
  },
  createdBy: { type: String, ref: 'User' },
  listId: { type: String, ref: 'List' },
  boardId: { type: String, ref: 'Board' },
  workspaceId: { type: String, ref: 'Workspace' },
  sequence: Number,
  assignedTo: { type: String, ref: 'User' },
  description: String,
  start: Date,
  end: Date,
  attributes: [AttributeSchema]
})

module.exports = models.Card || model('Card', CardsSchema)
