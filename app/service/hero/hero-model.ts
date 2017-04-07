import * as mongoose from 'mongoose'

const schema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  createdAt: { type: Date, 'default': Date.now },
  updatedAt: { type: Date, 'default': Date.now }
})

export default mongoose.model('Hero', schema, 'hero')
