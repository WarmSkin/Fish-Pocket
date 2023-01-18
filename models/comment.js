import mongoose from 'mongoose'

const Schema = mongoose.Schema

const CommentSchema = new Schema({
  content: String,
  from: String,
  to: String,
  sender: {type: Schema.Types.ObjectId, ref: "Profile"},
  receiver: {type: Schema.Types.ObjectId, ref: "Profile"},
}, {
  timestamps: true
})

const Comment = mongoose.model('Comment', CommentSchema)

export {
  Comment
}