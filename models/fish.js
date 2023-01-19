import mongoose from 'mongoose'

const Schema = mongoose.Schema

const FishSchema = new Schema({
  name: String,
  length: Number,
  ownerName: String,
  caughtDate: {type: Date,
    default: new Date()},
  species:  {type: Schema.Types.ObjectId, ref: "Species"},
  owner: {type: Schema.Types.ObjectId, ref: "Profile"},
  comments: [{type: Schema.Types.ObjectId, ref: "Comment"}],
}, {
  timestamps: true
})

const Fish = mongoose.model('Fish', FishSchema)

export {
  Fish
}