import mongoose from 'mongoose'

const Schema = mongoose.Schema

const profileSchema = new Schema({
  name: String,
  avatar: String,
  mood: {type: String, default: "Don't feel like talking."},
  friends: [{type: Schema.Types.ObjectId, ref: "Profile"}],
  fishing: [{type: Schema.Types.ObjectId, ref: "Fish"}],
  comments: [{type: Schema.Types.ObjectId, ref: "Comment"}],
}, {
  timestamps: true
})

const Profile = mongoose.model('Profile', profileSchema)

export {
  Profile
}
