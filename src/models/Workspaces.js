import { ObjectId } from 'mongodb';
import { Schema, model, models } from 'mongoose';

const WorkspaceSchema = new Schema({
  id: String,
  name: String,
  createdAt: {
    type: Date,
    default: new Date().toISOString(),
  },
  collaborators: [{ user: { type: ObjectId, ref: 'User' }, creator: Boolean, role: String }],
  roles: [{ name: String }],
  boards: [{ type: ObjectId, ref: 'Board' }],
  lists: [{ type: ObjectId, ref: 'List' }],
  cards: [{ type: ObjectId, ref: 'Card' }],
  invite: { link: String, disabled: { type: Boolean, default: false }, expiresAt: Date },

});

module.exports = models.Workspace || model('Workspace', WorkspaceSchema);