import * as mongoose from 'mongoose'

const schema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  message: {
    type: String,
    default: ''
  }
},
  { timestamps: {} })

export default mongoose.model('Message', schema, 'message')
