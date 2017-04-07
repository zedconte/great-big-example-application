import * as mongoose from 'mongoose'

const schema = new mongoose.Schema({
  id: { type: String, required: true },
  text: { type: String, required: true },
  colour: { type: String, required: true },
  left: { type: String, required: true },
  top: { type: String, required: true },
  createdAt: { type: Date, 'default': Date.now },
  updatedAt: { type: Date, 'default': Date.now }
})

export default mongoose.model('Note', schema, 'note')
