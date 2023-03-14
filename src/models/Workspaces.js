import { ObjectId } from 'mongodb';
import { Schema, model, models } from 'mongoose';

const WorkspaceSchema = new Schema({
  name: String,
  creator: ObjectId,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  collaborators: [{ user: { type: ObjectId, ref: 'User' }, role: String }],
  roles: [{ name: String, permissions: [String] }],
  boards: [{ type: ObjectId, ref: 'Board' }],
  invite: { link: String, disabled: { type: Boolean, default: false }, expiresAt: Date },

});

module.exports = models.Workspace || model('Workspace', WorkspaceSchema);