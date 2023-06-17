import { Schema } from 'mongoose'

export const AttributeSchema = new Schema({
  id: String,
  name: String,
  attributeType: String,
  value: String,
  options: [String],
  show: Boolean
})
