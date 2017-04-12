import * as mongoose from 'mongoose'

const schema = new mongoose.Schema({
  _id: { type: String, required: true },
  text: { type: String, required: false },
  colour: { type: String, required: false },
  left: { type: String, required: false },
  top: { type: String, required: false },
  createdAt: { type: Date, 'default': Date.now },
  updatedAt: { type: Date, 'default': Date.now }
})

export default mongoose.model('Note', schema, 'note')
