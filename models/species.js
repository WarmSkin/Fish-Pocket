import mongoose from 'mongoose'

const Schema = mongoose.Schema

const SpeciesSchema = new Schema({
  name: String,
  content: String,
  avatar: String,
  keeperLength: String,
  seasonStartDate: {type: Date,
    default: new Date()},
  seasonEndDate: {type: Date,
    default: new Date()},
  habits: [{type: Schema.Types.ObjectId, ref: "Habit"}],
  ownerFish: [{type: Schema.Types.ObjectId, ref: "Fish"}],
}, {
  timestamps: true
})
const Species = mongoose.model('Species', SpeciesSchema)

export {
  Species
}