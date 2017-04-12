import * as mongoose from 'mongoose'
let ObjectId = mongoose.Schema.Types.ObjectId // https://github.com/marshallswain/feathers-mongoose-starter/blob/master/server/services/tickets.js

const schema = new mongoose.Schema({
  _id: { type: String, required: true },
  claimId: {
    type: ObjectId,
    required: true
  },
  rebuttalId: {
    type: ObjectId,
    required: true
  },
  sortOrder: {
    type: String,
    required: true
  }
}, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  })

export default mongoose.model('ClaimRebuttal', schema, 'claimRebuttal')
