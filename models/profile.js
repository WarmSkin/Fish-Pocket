import mongoose from 'mongoose'

const Schema = mongoose.Schema

const profileSchema = new Schema({
  name: String,
  avatar: String,
  friends: [{type: Schema.Types.ObjectId, ref: "Profile"}],
  fish: [{type: Schema.Types.ObjectId, ref: "Fish"}],
  comments: [{type: Schema.Types.ObjectId, ref: "Comment"}],
}, {
  timestamps: true
})

const Profile = mongoose.model('Profile', profileSchema)

export {
  Profile
}
