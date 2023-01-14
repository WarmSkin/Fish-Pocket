import mongoose from 'mongoose'

const Schema = mongoose.Schema

const SpecisSchema = new Schema({
  name: String,
  avatar: String,
  seasonStartDate: Date,
  seasonEndDate: Date,
  lengthToKeep: Number,
  habits: {type: Schema.Types.ObjectIdct, ref: "Habit"}
}, {
  timestamps: true
})

const Specis = mongoose.model('Specis', SpecisSchema)

export {
  Specis
}