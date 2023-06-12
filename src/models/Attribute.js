import { Schema } from 'mongoose'

export const AttributeSchema = new Schema({
  name: String,
  attributeType: String,
  value: String,
  options: [String],
  show: Boolean
})

