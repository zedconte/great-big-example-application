import * as mongoose from 'mongoose'

const schema = new mongoose.Schema({
  claimId: {
    type: String,
    required: true
  },
  rebuttalId: {
    type: String,
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
