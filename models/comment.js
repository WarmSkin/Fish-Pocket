import mongoose from 'mongoose'

const Schema = mongoose.Schema

const CommentSchema = new Schema({
  content: String,
  from: String,
  to: String,

}, {
  timestamps: true
})

const Comment = mongoose.model('Comment', CommentSchema)

export {
  Comment
}