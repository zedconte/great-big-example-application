import * as mongoose from 'mongoose'

const schema = new mongoose.Schema({
  _id: { type: String, required: true },
  shortName: { type: String, required: true },
  longName: { type: String, required: true },
  link: { type: String, required: true },
  comments: { type: String, required: true },
  createdAt: { type: Date, 'default': Date.now },
  updatedAt: { type: Date, 'default': Date.now }
})

export default mongoose.model('Rebuttal', schema, 'rebuttal')
