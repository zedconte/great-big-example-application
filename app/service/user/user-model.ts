import * as mongoose from 'mongoose'

const schema = new mongoose.Schema({
  _id: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  roles: {
    type: [String],
    default: []
  }
}, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  })

export default mongoose.model('User', schema, 'user')
