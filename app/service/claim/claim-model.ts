import * as mongoose from 'mongoose'

const schema = new mongoose.Schema({
  name: { type: String, default: '' },
  imageLabel: { type: String, default: '' },
  createdAt: { type: Date, 'default': Date.now },
  updatedAt: { type: Date, 'default': Date.now }
})

export default mongoose.model('Claim', schema, 'claim')
