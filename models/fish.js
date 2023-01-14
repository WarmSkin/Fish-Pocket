import mongoose from 'mongoose'

const Schema = mongoose.Schema

const FishSchema = new Schema({
  name: String,
  length: Number,
  caughtDate: Date,
  specis:  {type: Schema.Types.ObjectId, ref: "Specis"},
  owner: {type: Schema.Types.ObjectId, ref: "Profile"},
  comments: {type: Schema.Types.ObjectId, ref: "Comment"},
}, {
  timestamps: true
})

const Fish = mongoose.model('Fish', FishSchema)

export {
  Fish
}