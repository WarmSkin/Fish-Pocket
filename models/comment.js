import mongoose from 'mongoose'

const Schema = mongoose.Schema

const CommentSchema = new Schema({
  content: String,
  owner: {type: Schema.Types.ObjectIdct, ref: "Profile"}
}, {
  timestamps: true
})

const Comment = mongoose.model('Comment', CommentSchema)

export {
  Comment
}